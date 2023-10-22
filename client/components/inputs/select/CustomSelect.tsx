'use client'

import { useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

export default function CustomSelect<T extends SelectValue>(
  { data, defaultValue }: { data: T[], defaultValue: string }
) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  }

  return (
    <FormControl>
      <Select
        labelId="categories-select"
        id="categories-select"
        defaultValue={defaultValue}
        value={selectedValue || defaultValue}
        onChange={handleValueChange}
        inputProps={{ 'aria-label': 'Select category' }}
        sx={{
          width: "20rem",
          marginTop: '2rem',
          backgroundColor: 'white',
        }}
      >
        {
          data.map((item: T) => {
            if (item.slug === defaultValue) {
              return (
                <MenuItem key={item.id} value={item.slug} selected>
                  {item.name}
                </MenuItem>
              )
            } else {
              return (
                <NextLink key={item.id} href={`/category/${item.slug}`}>
                  <MenuItem disabled={item.slug === defaultValue} value={item.slug}>
                    {item.name}
                  </MenuItem>
                </NextLink>
              )
            }
          })
        }
      </Select>
      <FormHelperText>Choose category</FormHelperText>
    </FormControl>
  )
}
