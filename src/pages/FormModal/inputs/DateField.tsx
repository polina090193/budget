"use client";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { defaultInput } from '@/components/inputs/style';
import { TextField } from '@mui/material';
import { getStringForBadgeFromFormikErrors } from '@/utils/stringHelpers';
import { useEffect } from 'react';

export default function DateField({
  field, sx
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  sx?: { [key: string]: any },
}) {
  const { errors, touched, setFieldValue } = useFormikContext<any>();

  const error = errors[field.name];
  const touch = touched[field.name];

  const helperText = touch && error ? getStringForBadgeFromFormikErrors(error, touch) : undefined;

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
