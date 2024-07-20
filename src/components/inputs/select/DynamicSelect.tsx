import { RefObject } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { defaultInput } from '../style';
import { capitalizeFirstLetter } from '@/utils/stringHelpers';

export default function DynamicSelect<T extends SelectValue>(
  { data,
    defaultValue,
    value,
    onChange,
    namePlural,
    nameSingular,
    inputRef,
    sx = {},
  }: {
    data: T[],
    defaultValue: number,
    value?: number,
    onChange: (event: SelectChangeEvent<number>) => void,
    namePlural: string,
    nameSingular: string,
    inputRef?: RefObject<HTMLSelectElement>,
    sx?: { [key: string]: any },
  }
) {
  return (
    <FormControl sx={{ ...defaultInput, ...sx }}>
      <InputLabel id={`${namePlural}-select-label`}>{`${capitalizeFirstLetter(nameSingular)}`}</InputLabel>
      <Select
        inputRef={inputRef}
        labelId={`${namePlural}-select-label`}
        label={`Select ${nameSingular}`}
        id={`${namePlural}-select`}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => onChange(event)}
        inputProps={{ 'aria-label': `Select ${nameSingular}` }}
      >
        {
          data.map((item: T) => {
            if (item.id === defaultValue) {
              return (
                <MenuItem key={item.id} value={item.id} selected disabled={item.isPlaceholder}>
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
    </FormControl>
  )
}
