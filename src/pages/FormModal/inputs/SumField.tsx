"use client";
import { defaultInput, halfWidth } from '@/components/inputs/style';
import { TextField } from '@mui/material';
import { FormikProps, FormikSharedConfig, FieldAttributes } from 'formik';

export default function SumField({
  field,
  sx = {},
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  sx?: {[key: string]: any}
}) {
  return (
    <TextField
      // inputProps={{ inputMode: 'numeric' }}
      id="sum-field"
      label="Sum"
      autoComplete="off"
      sx={{...defaultInput, ...halfWidth, ...sx}}
      {...field}
      {...props}
    />
  )
}
