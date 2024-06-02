import { RefObject } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function CustomSelect<T extends SelectValue>(
  { data,
    defaultValue,
    value,
    onChange,
    namePlural,
    nameSingular,
    inputRef,
  }: {
    data: T[],
    defaultValue: number,
    value?: number,
    onChange: (event: SelectChangeEvent<number>) => void,
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
      onChange={(event) => onChange(event)}
      inputProps={{ 'aria-label': `Select ${nameSingular}` }}
      sx={{
        width: "20rem",
        marginTop: '2rem',
        backgroundColor: 'white',
      }}
    >
      {
        data.map((item: T) => {
          if (item.id === defaultValue) {
            return (
              <MenuItem key={item.id} value={item.id} selected>
                {item.name}
              </MenuItem>
            )
          } else {
            return (
              <MenuItem key={item.id} disabled={item.id === defaultValue} value={item.id}>
                {item.name}
              </MenuItem>
            )
          }
        })
      }
    </Select>
  )
}
