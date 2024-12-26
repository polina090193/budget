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
        data-testid={`${namePlural}-select`}
        defaultValue={defaultValue}
        value={value}
        inputProps={{ 'aria-label': `Select ${nameSingular}` }}
        onChange={(event) => onChange(event)}
      >
        {
          data.map((item: T) => {
            return (
              <MenuItem key={item.id} data-testid={item.name} disabled={item.id === defaultValue || item.isPlaceholder} value={item.id}>
                {item.name}
              </MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}
