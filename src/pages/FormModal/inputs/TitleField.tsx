"use client";
import { defaultInput } from '@/components/inputs/style';
import { TextField } from '@mui/material';
import { FieldAttributes, FormikProps, FormikSharedConfig } from 'formik';

export default function TitleField({
  field,
  sx,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  sx?: { [key: string]: any },
}) {
  return (
    <TextField
      id="title-field"
      label="Title"
      sx={{...defaultInput, ...sx}}
      {...field}
      {...props}
    />
  )
}
