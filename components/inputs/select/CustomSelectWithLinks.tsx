import { RefObject, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

export default function CustomSelect<T extends SelectValue>(
  { data,
    defaultValue,
    namePlural,
    nameSingular,
    inputRef,
  }: {
    data: T[],
    defaultValue: string,
    namePlural: string,
    nameSingular: string,
    inputRef?: RefObject<HTMLSelectElement>,
  }
) {
  const [selectedValue, setSelected] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  }

  return (
    <FormControl>
      <Select
        inputRef={inputRef}
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
            if (item.id === defaultValue || !item.link) {
              return (
                <MenuItem key={item.id} value={item.id} selected>
                  {item.name}
                </MenuItem>
              )
            } else {
              return (
                <NextLink key={item.id} href={item.link ?? `/${nameSingular}/${item.id}`}>
                  <MenuItem key={item.id} disabled={item.id === defaultValue} value={item.id}>
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
