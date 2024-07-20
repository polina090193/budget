"use client";

import { useContext, useMemo, useState } from 'react';
import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import DynamicSelect from '../../../components/inputs/select/DynamicSelect';
import { FieldAttributes, FormikProps, FormikSharedConfig } from 'formik';
import { SelectChangeEvent } from '@mui/material';

export default function CategorySelect({
  field,
  defaultValue,
  isWithAll,
  isWithPlaceholder,
  onCategoryChange,
  sx,
  ...props
}: (FormikProps<FormikSharedConfig> | {}) & {
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

  const [categoryValue, setCategoryValue] = useState<number | undefined>(0);

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

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const numVal = Number(event.target.value);
    
    setCategoryValue(numVal);
    onCategoryChange && onCategoryChange(numVal);
  };

  return (
    <>
      {categories?.areCategoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <DynamicSelect
          value={categoryValue || defaultValue}
          onChange={handleCategoryChange}
          data={isWithAll 
            ? categoriesListWithAll 
            : isWithPlaceholder 
            ? categoriesListWithPlaceholder 
            : categoriesList}
          defaultValue={defaultValue || 0}
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
