"use client";

import { useCallback, useState, useMemo, useContext, useEffect } from "react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { GridRowIdGetter } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

// import CustomSnackbar from "../../components/info/CustomSnackbar";

import { CategoriesContext } from "@/context-providers/CategoriesProvider";
import { RecordsContext } from "@/context-providers/RecordsProvider";

import TitleField from "../inputs/TitleField";
import SumField from "../inputs/SumField";
import DateField from "../inputs/DateField";
import DirectionField from "../inputs/DirectionField";
import CategorySelect from "../inputs/CategorySelect";

import { dateSQLadapter } from "@/utils/adapters/dateSQLadapter";
import { preventNotNum } from "@/utils/validation/inputFunctions/preventNotNum";
import { validateStringLength } from "@/utils/validation/inputFunctions/validateStringLength";
import { getStringForBadgeFromFormikErrors } from "@/utils/stringHelpers";
import FieldWithErrorBadge from "@/components/info/FieldWithErrorBadge";
import { DEFAULT_TRANSACTION_TYPE } from "@/enums/generalEnums";


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
    type: DEFAULT_TRANSACTION_TYPE,
    category_id: 0,
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
    // console.log('values category_id: ' + values.category_id);
    
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
      }

      resetForm();
      closeForm();
      await fetchRecords();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <h1>New transaction</h1>
      <Formik
        initialValues={currentRecord}
        enableReinitialize={selectedRecordId ? true : false}
        onSubmit={(values: any, { resetForm }: FormikHelpers<any>) => submitForm(values, resetForm)}
      >
        {({ values, errors, touched }: FormikProps<any>) => (
          <Form>
            <FieldWithErrorBadge
              name="title"
              placeholder="Title"
              validate={(val: string) => validateStringLength(val, 2)}
              ariaLabel={getStringForBadgeFromFormikErrors(errors.title, touched.title) || 'Title has no errors'}
              overlap="circular"
              badgeContent={getStringForBadgeFromFormikErrors(errors.title, touched.title)}
              color="primary"
              component={TitleField}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            />
            <FieldWithErrorBadge
              name="date"
              placeholder="Date"
              validate={(val: string) => val ? null : 'Date is required'}
              ariaLabel={getStringForBadgeFromFormikErrors(errors.date, touched.date) || 'Date has no errors'}
              overlap="circular"
              badgeContent={getStringForBadgeFromFormikErrors(errors.date, touched.date)}
              color="primary"
              component={DateField}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <Field name="type" placeholder="TransactionType" component={DirectionField} sx={{ width: '50%' }} />
              <Field name="sum" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => preventNotNum(e)}
                placeholder="Sum" component={SumField} />
            </Box>
            <FieldWithErrorBadge
              name="category_id"
              placeholder="Category"
              validate={(val: string) => val ? null : 'Category is required'}
              ariaLabel={getStringForBadgeFromFormikErrors(errors.category_id, touched.category_id) || 'Category has no errors'}
              overlap="circular"
              badgeContent={getStringForBadgeFromFormikErrors(errors.category_id, touched.category_id)}
              color="primary"
              component={
                () => (<Field
                  name="category_id"
                  placeholder="Category"
                  component={CategorySelect}
                  defaultValue={values.category_id || 0}
                  isWithPlaceholder
                />)
              }
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
              <Button
                type="submit"
                variant="contained"
                aria-label={selectedRecordId ? 'Update record' : 'Create record'}
              // aria-disabled={isDisabled}
              // disabled={isDisabled}
              >
                {selectedRecordId ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {/* <CustomSnackbar
        toastState={toastState} closeToast={closeToast}
      /> */}
    </>
  )
}
