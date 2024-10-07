"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import DynamicSelect from '../../../components/inputs/select/DynamicSelect';
import { FieldAttributes, FormikProps, FormikSharedConfig/* , useFormikContext */ } from 'formik';
import { SelectChangeEvent } from '@mui/material';

export default function CategorySelect({
  field,
  defaultValue,
  isWithAll,
  isWithPlaceholder,
  onCategoryChange,
  sx,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field?: FieldAttributes<any>,
  defaultValue?: number,
  isWithAll?: boolean,
  isWithPlaceholder?: boolean,
  onCategoryChange?: (value: number) => void,
  sx?: { [key: string]: any }
}) {
  const categories = useContext(CategoriesContext);

  const categoriesList = useMemo(() => (
    categories?.categoriesData.map((item) => ({...item, id: item.category_id})) ?? []
  ), [categories?.categoriesData]);


  const categoriesListWithAll = useMemo(() => ([
    {
      id: 0,
      name: 'All',
    },
    ...categoriesList,
  ]), [categoriesList]);

  const categoriesListWithPlaceholder = useMemo(() => ([
    {
      id: 0,
      name: 'Please choose category',
      isPlaceholder: true
    },
    ...categoriesList,
  ]), [categoriesList]);

  const handleCategoryChange = useCallback((event: SelectChangeEvent<number>) => {
    const numVal = Number(event.target.value);
    
    onCategoryChange && onCategoryChange(numVal);
  }, [onCategoryChange]);

  return (
    <>
      {categories?.areCategoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <DynamicSelect
          value={field?.value}
          onChange={handleCategoryChange}
          data={isWithAll 
            ? categoriesListWithAll 
            : isWithPlaceholder 
            ? categoriesListWithPlaceholder 
            : categoriesList}
          defaultValue={field?.value || 0}
          namePlural="categories"
          nameSingular="category"
          sx={sx}
          {...props}
        />
      )
      }
    </>
  )
}
