"use client";

import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { useContext } from 'react';
import CustomSelect from './CustomSelectWithLinks';

export default function CategorySelect({ defaultCategoryValue }: { defaultCategoryValue: string }) {
  const categoriesData = useContext(CategoriesContext);

  return (
    <CustomSelect 
      data={categoriesData}
      defaultValue={defaultCategoryValue}
      namePlural="categories"
      nameSingular="category"
    />
  )
}
