"use client";
import { RefObject } from 'react';
import { TextField } from '@mui/material';

export default function NameField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {
  return (
    <TextField
      inputRef={inputRef}
      id="name-field"
      label="Name (optional)"
      autoComplete="fullname"
    />
  )
}
