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
  const categories = useContext(CategoriesContext);

  const categoriesList = categories?.categoriesData ?? [];

  const categoriesListWithAll = [
    {
      id: '0',
      name: 'All',
      slug: 'all',
      link: '/',
    },
    ...categoriesList,
  ]

  return (
    <>
      {categories?.areCategoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <CustomSelect
          inputRef={inputRef}
          data={isWithAll ? categoriesListWithAll : categoriesList}
          defaultValue={defaultCategoryValue}
          namePlural="categories"
          nameSingular="category"
        />
      )
      }
    </>
  )
}
