"use client";
import { TextField } from '@mui/material';
import { FormikProps, FormikSharedConfig, FieldAttributes } from 'formik';

export default function SumField({
  field,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
}) {
  return (
    <TextField
      inputProps={{ inputMode: 'numeric' }}
      id="sum-field"
      label="Sum"
      autoComplete="off"
      {...field}
      {...props}
    />
  )
}
