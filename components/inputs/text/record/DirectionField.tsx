"use client";
import { InputLabel, MenuItem, Select } from '@mui/material';
import { RefObject } from 'react';

export default function DirectionField({ inputRef }: { inputRef: RefObject<HTMLSelectElement>} ) {
  return (
    <>
      <InputLabel id="expense-income-label">Expense/Income</InputLabel>
      <Select
        labelId="expense-income-label"
        inputRef={inputRef}
        id="expense-income-select"
        label="Expense or Income"
        defaultValue={'MINUS'}
      >
        <MenuItem value={'MINUS'}>Expense</MenuItem>
        <MenuItem value={'PLUS'}>Income</MenuItem>
      </Select>
    </>
  )
}
