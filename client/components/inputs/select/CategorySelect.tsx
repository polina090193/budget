'use client'

import { useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

import styles from './page.module.css'
import { getAllCategories } from '../../../dataTemp/categories'

export default function CategorySelect({defaultCategoryValue}: {defaultCategoryValue: string}) {
  const categories = getAllCategories();

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
        className={styles.categorySelect}
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
              <NextLink key={category.id} href={category.link ?? `/category/${category.slug}`}>
                <MenuItem disabled={category.slug === defaultCategoryValue} value={category.slug}>
                  {category.name}
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
