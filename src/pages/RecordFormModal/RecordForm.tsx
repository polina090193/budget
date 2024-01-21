"use client";

import { useCallback, useState, useMemo, useContext, useEffect } from "react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { GridRowIdGetter } from "@mui/x-data-grid";
import { Button } from "@mui/material";

// import CustomSnackbar from "../../components/info/CustomSnackbar";

import { CategoriesContext } from "@/context-providers/CategoriesProvider";
import { RecordsContext } from "@/context-providers/RecordsProvider";

import TitleField from "./inputs/TitleField";
import SumField from "./inputs/SumField";
import DateField from "./inputs/DateField";
import DirectionField from "./inputs/DirectionField";
import CategorySelect from "../MainPage/CategorySelect";

import { dateSQLadapter } from "@/utils/adapters/dateSQLadapter";

export default function RecordForm({
  user,
  selectedRecordId,
  closeForm,
}: {
  user: NextAuthUser | undefined,
  selectedRecordId?: GridRowIdGetter | null,
  closeForm: () => void,
}) {

  const categories = useContext(CategoriesContext);
  const categoriesList = categories?.categoriesData ?? [];

  const records = useContext(RecordsContext);
  const fetchRecords = records?.fetchRecords ?? (() => { });

  const emptyRecord = useMemo(() => ({
    record_id: 0,
    title: '',
    sum: 0,
    date: '',
    direction: 'MINUS',
    category_id: Number(categoriesList[0]?.id) || 0,
    user_id: Number(user?.id),
  }), [user, categoriesList]) as BudgetRecord;

  const [currentRecord, setCurrentRecord] = useState<BudgetRecord>(emptyRecord)

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

  const getRecord = useCallback(async () => {
    if (!selectedRecordId) {
      return emptyRecord;
    }

    const recordRes = await fetch(`http://localhost:3000/api/records/${selectedRecordId}`);
    if (!recordRes.ok) {
      throw new Error('Failed to load record');
    }

    const record = await recordRes.json();
    if (!record) {
      throw new Error('Failed to load record');
    }
    return record;
  }, [selectedRecordId]);


  useEffect(() => {
    if (selectedRecordId) {
      getRecord().then(record => setCurrentRecord(record));
    }
  }, [selectedRecordId, getRecord]);

  const submitForm = useCallback(async (values: BudgetRecordReq, resetForm: () => void) => {
    try {
      if (!selectedRecordId) {
        await fetch(
          'http://localhost:3000/api/records/create',
          {
            method: 'POST',
            body: JSON.stringify({
              ...values,
              date: dateSQLadapter(new Date(values.date)),
            })
          }
        );
        resetForm();
        closeForm();
      } else {
        await fetch(
          'http://localhost:3000/api/records/update',
          {
            method: 'PUT',
            body: JSON.stringify({
              record_id: selectedRecordId,
              ...values,
              date: dateSQLadapter(new Date(values.date)),
            })
          }
        );
        resetForm();
        closeForm();
      }

      await fetchRecords();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <h1>Record form</h1>
      <Formik
        initialValues={currentRecord || emptyRecord}
        enableReinitialize={selectedRecordId ? true : false}
        onSubmit={(values: any, { resetForm }: FormikHelpers<any>) => submitForm(values, resetForm)}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field name="title" placeholder="Title" component={TitleField} />
            <Field name="direction" placeholder="Direction" component={DirectionField} />
            <Field name="sum" placeholder="Sum" component={SumField} />
            <Field name="date" placeholder="Date" component={DateField} />
            <Field name="category_id" placeholder="Category" component={CategorySelect} defaultValue={props.values.category_id} />
            <Button type="submit">{selectedRecordId ? 'Update' : 'Create'}</Button>
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
