"use client";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';
import dayjs from 'dayjs';

export default function DateField({
  field,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>
}) {
  const { setFieldValue } = useFormikContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Date" format="DD.MM.YYYY" value={dayjs(field.value)} onChange={(value) => setFieldValue(field.name, value)} />
    </LocalizationProvider>
  )
}
