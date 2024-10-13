"use client";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { defaultInput } from '@/components/inputs/style';

export default function DateField({
  field, sx
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<unknown>,
  sx?: { [key: string]: unknown },
}): JSX.Element | null {
  const { setFieldValue } = useFormikContext<unknown>();

  if (!setFieldValue) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        format="DD.MM.YYYY"
        value={dayjs(field.value)}
        onChange={(value) => setFieldValue(field.name, value)}
        sx={{ ...defaultInput, ...sx }}
        slotProps={{
          textField: {
            // Disable default error handling because we have badges
            error: false,
          }
        }}
      />
    </LocalizationProvider>
  )
}
