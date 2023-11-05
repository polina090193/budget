import { useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

export default function CustomSelect<T extends SelectValue>(
  { data,
    defaultValue,
    namePlural,
    nameSingular,
  }: {
    data: T[],
    defaultValue: string,
    namePlural: string,
    nameSingular: string,
  }
) {
  const [selectedValue, setSelected] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  }

  return (
    <FormControl>
      <Select
        labelId={`${namePlural}-select`}
        id={`${namePlural}-select`}
        defaultValue={defaultValue}
        value={selectedValue || defaultValue}
        onChange={handleChange}
        inputProps={{ 'aria-label': `Select ${nameSingular}` }}
        sx={{
          width: "20rem",
          marginTop: '2rem',
          backgroundColor: 'white',
        }}
      >
        {
          data.map((item: T & { link?: string }) => {
            if (item.slug === defaultValue) {
              return (
                <MenuItem key={item.id} value={item.slug} selected>
                  {item.name}
                </MenuItem>
              )
            } else {
              return (
                <NextLink key={item.id} href={item.link ?? `/${nameSingular}/${item.id}`}>
                  <MenuItem key={item.id} disabled={item.slug === defaultValue} value={item.slug}>
                    {item.name}
                  </MenuItem>
                </NextLink>
              )
            }
          })
        }
      </Select>
      <FormHelperText>Choose {nameSingular}</FormHelperText>
    </FormControl>
  )
}
