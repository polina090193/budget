"use client";
import { RefObject } from 'react';
import { TextField } from '@mui/material';

export default function TitleField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {
  return (
    <TextField
      inputRef={inputRef}
      id="title-field"
      label="Title"
    />
  )
}
