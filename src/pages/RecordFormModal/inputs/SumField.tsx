"use client";
import { RefObject } from 'react';
import { TextField } from '@mui/material';

export default function SumField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {

  const checkForOnlyNumerics = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const numericInput = input.replace(/[^0-9]/g, '');

    if (inputRef.current) {
      inputRef.current.value = numericInput;
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      inputProps={{ inputMode: 'numeric' }}
      id="sum-field"
      label="Sum"
      onChange={checkForOnlyNumerics}
      autoComplete="off"
    />
  )
}
