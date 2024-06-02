"use client";
import { TextField } from '@mui/material';
import { FieldAttributes, FormikProps, FormikSharedConfig } from 'formik';
import { useEffect } from 'react';

export default function TitleField({
  field,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
}) {
  return (
    <TextField
      id="title-field"
      label="Title"
      {...field}
      {...props}
    />
  )
}
