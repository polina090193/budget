"use client";
import { defaultInput } from '@/components/inputs/style';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';

export default function TypeField({
  field,
  sx = {},
  onChange,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  sx?: {[key: string]: any},
  onChange?: (value: TransactionType) => void
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
        {...props}
        onChange={(event: SelectChangeEvent<number>) => {
          onChange && onChange(event.target.value as TransactionType);
          return setFieldValue(field.name, event.target.value);
        }}
      >
        <MenuItem value={'EXPENSE'}>Expense</MenuItem>
        <MenuItem value={'INCOME'}>Income</MenuItem>
      </Select>
    </FormControl>
  )
}
