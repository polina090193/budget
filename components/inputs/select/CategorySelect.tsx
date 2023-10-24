import { useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

export default function CategorySelect({ defaultCategoryValue }: { defaultCategoryValue: string }) {
  const categories = [ // Temporary dummy data
    {
      id: '1',
      name: 'Food',
      slug: 'food',
      link: '/category/food'
    },
    {
      id: '2',
      name: 'Transport',
      slug: 'transport',
      link: '/category/transport'
    },
    {
      id: '3',
      name: 'Entertainment',
      slug: 'entertainment',
      link: '/category/entertainment'
    },
  ];

  const [selectedCategoryValue, setSelectedCategory] = useState('');

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  }

  return (
    <FormControl>
      <Select
        labelId="categories-select"
        id="categories-select"
        defaultValue={defaultCategoryValue}
        value={selectedCategoryValue || defaultCategoryValue}
        onChange={handleCategoryChange}
        inputProps={{ 'aria-label': 'Select category' }}
        sx={{
          width: "20rem",
          marginTop: '2rem',
          backgroundColor: 'white',
        }}
      >
        {
          categories.map((category: Category) => {
            if (category.slug === defaultCategoryValue) {
              return (
                <MenuItem key={category.id} value={category.slug} selected>
                  {category.name}
                </MenuItem>
              )
            } else {
              return (
                // <NextLink key={category.id} href={category.link ?? `/category/${category.slug}`}>
                  <MenuItem key={category.id} disabled={category.slug === defaultCategoryValue} value={category.slug}>
                    {category.name}
                  </MenuItem>
                // </NextLink>
              )
            }
          })
        }
      </Select>
      <FormHelperText>Choose category</FormHelperText>
    </FormControl>
  )
}
