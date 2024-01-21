"use client";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';

export default function DirectionField({
  field,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
}) {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <InputLabel id="expense-income-label">Expense/Income</InputLabel>
      <Select
        labelId="expense-income-label"
        id="expense-income-select"
        label="Expense or Income"
        value={field.value}
        onChange={(event: SelectChangeEvent<number>) => setFieldValue(field.name, event.target.value)}
      >
        <MenuItem value={'MINUS'}>Expense</MenuItem>
        <MenuItem value={'PLUS'}>Income</MenuItem>
      </Select>
    </>
  )
}
