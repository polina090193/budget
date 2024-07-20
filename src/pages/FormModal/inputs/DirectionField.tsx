"use client";
import { defaultInput, halfWidth } from '@/components/inputs/style';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';

export default function DirectionField({
  field,
  sx = {},
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  sx?: {[key: string]: any}
}) {
  const { setFieldValue } = useFormikContext();

  return (
    <FormControl sx={{...defaultInput, ...sx}}>
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
    </FormControl>
  )
}
