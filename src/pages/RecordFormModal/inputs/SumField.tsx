"use client";
import { TextField } from '@mui/material';
import { FormikProps, FormikSharedConfig, FieldAttributes } from 'formik';

export default function SumField({
  field,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
}) {
  // TODO Validation/Mask here

  // const checkForOnlyNumerics = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;

  //   const numericInput = input.replace(/[^0-9]/g, '');

  //   if (inputRef.current) {
  //     inputRef.current.value = numericInput;
  //   }
  // };

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
