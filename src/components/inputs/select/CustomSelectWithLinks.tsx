import { RefObject } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

export default function CustomSelect<T extends SelectValue>(
  { data,
    defaultValue,
    value,
    onChangeFormik,
    namePlural,
    nameSingular,
    inputRef,
  }: {
    data: T[],
    defaultValue: string,
    value?: string,
    onChangeFormik: (event: SelectChangeEvent) => void,
    namePlural: string,
    nameSingular: string,
    inputRef?: RefObject<HTMLSelectElement>,
  }
) {
  return (
    <Select
      inputRef={inputRef}
      labelId={`${namePlural}-select`}
      id={`${namePlural}-select`}
      defaultValue={defaultValue}
      value={value}
      onChange={(event) => onChangeFormik(event)}
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
  )
}
