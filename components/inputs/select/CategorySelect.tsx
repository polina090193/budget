"use client";

import { RefObject, useContext } from 'react';
import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import CustomSelect from './CustomSelectWithLinks';

export default function CategorySelect({
  defaultCategoryValue,
  inputRef,
  isWithAll,
}:
  {
    defaultCategoryValue: string,
    inputRef?: RefObject<HTMLSelectElement>,
    isWithAll?: boolean,
  }) {
  const categoriesData = useContext(CategoriesContext);

  const categoriesDataWithAll = [
    {
      id: '0',
      name: 'All',
      slug: 'all',
      link: '/',
    },
    ...categoriesData,
  ]

  return (
    <CustomSelect
      inputRef={inputRef}
      data={isWithAll ? categoriesDataWithAll : categoriesData}
      defaultValue={defaultCategoryValue}
      namePlural="categories"
      nameSingular="category"
    />
  )
}
