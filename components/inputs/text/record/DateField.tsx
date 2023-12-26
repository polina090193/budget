"use client";
import { RefObject } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DateField({ inputRef }: { inputRef: RefObject<HTMLInputElement>} ) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker inputRef={inputRef} label="Date" />
    </LocalizationProvider>
    
  )
}
