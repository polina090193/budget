"use client";
import { RefObject } from 'react';
import { TextField } from '@mui/material';

export default function PasswordField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {
  return (
    <TextField
      inputRef={inputRef}
      id="password-field"
      label="Password"
      autoComplete="password"
    />
  )
}
