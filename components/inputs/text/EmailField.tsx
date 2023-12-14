"use client";
import { RefObject } from 'react';
import { TextField } from '@mui/material';

export default function EmailField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {
  return (
    <TextField
      inputRef={inputRef}
      id="email-field"
      label="Email"
      autoComplete="email"
    />
  )
}
