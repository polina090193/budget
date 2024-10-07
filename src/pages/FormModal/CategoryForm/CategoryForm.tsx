"use client";

import { useCallback, useState, useMemo, useContext, useEffect } from "react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { GridRowIdGetter } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { CategoriesContext } from "@/context-providers/CategoriesProvider";

// import CustomSnackbar from "../../components/info/CustomSnackbar";
import TitleField from "../inputs/TitleField";
import SumField from "../inputs/SumField";
import DateField from "../inputs/DateField";
import DirectionField from "../inputs/DirectionField";
import CategorySelect from "../inputs/CategorySelect";

import { preventNotNum } from "@/utils/validation/inputFunctions/preventNotNum";
import { DEFAULT_TRANSACTION_TYPE } from "@/enums/generalEnums";

export default function CategoryForm({
  user,
  selectedCategoryId,
  closeForm,
}: {
  user: NextAuthUser | undefined,
  selectedCategoryId?: GridRowIdGetter | null,
  closeForm: () => void,
}) {

  const categories = useContext(CategoriesContext);
  const fetchCategories = useMemo(() => categories?.fetchCategories ?? (() => { }), [categories]);

  const emptyCategory = useMemo(() => ({
    category_id: 0,
    name: '',
    type: DEFAULT_TRANSACTION_TYPE,
    user_id: Number(user?.id),
  }), [user]) as BudgetCategory;

  const [currentCategory, setCurrentCategory] = useState<BudgetCategoryReq>(emptyCategory)

  // TODO: Implement toasts
  // const [toastState, setToastState] = useState<ToastProps>({
  //   open: false,
  //   toastMessage: '',
  //   toastSeverity: 'error'
  // })

  // const setToast = useCallback((severity: ToastSeverity, message: string) => {
  //   setToastState({
  //     ...toastState,
  //     open: true,
  //     toastMessage: message,
  //     toastSeverity: severity,
  //   });
  // }, []);

  // const closeToast = useCallback(() => {
  //   setToastState({
  //     ...toastState,
  //     open: false
  //   });
  // }, []);

  const getCategory = useCallback(async () => {
    if (!selectedCategoryId) {
      return emptyCategory;
    }

    const categoryRes = await fetch(`http://localhost:3000/api/records/${selectedCategoryId}`);
    if (!categoryRes.ok) {
      throw new Error('Failed to load record');
    }

    const category = await categoryRes.json();
    if (!category) {
      throw new Error('Failed to load category');
    }
    return category;
  }, [selectedCategoryId, emptyCategory]);


  useEffect(() => {
    if (selectedCategoryId) {
      getCategory().then(record => setCurrentCategory(record));
    }
  }, [selectedCategoryId, getCategory]);

  const submitForm = useCallback(async (values: BudgetCategoryReq, resetForm: () => void) => {
    try {
      if (!selectedCategoryId) {
        await fetch(
          'http://localhost:3000/api/records/create',
          {
            method: 'POST',
            body: JSON.stringify({
              ...values
            })
          }
        );
      } else {
        await fetch(
          'http://localhost:3000/api/records/update',
          {
            method: 'PUT',
            body: JSON.stringify({
              category_id: selectedCategoryId,
              ...values
            })
          }
        );
      }
      
      resetForm();
      closeForm();
      await fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, [closeForm, selectedCategoryId, fetchCategories]);

  return (
    <>
      <h1>Record form</h1>
      <Formik
        initialValues={currentCategory || emptyCategory}
        enableReinitialize={selectedCategoryId ? true : false}
        onSubmit={(values: any, { resetForm }: FormikHelpers<any>) => submitForm(values, resetForm)}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field name="title" placeholder="Title" component={TitleField} />
            <Field name="type" placeholder="TransactionType" component={DirectionField} />
            <Button type="submit">{selectedCategoryId ? 'Update' : 'Create'}</Button>
          </Form>
        )
        }
      </Formik>
      {/* <CustomSnackbar
        toastState={toastState} closeToast={closeToast}
      /> */}
    </>
  )
}
