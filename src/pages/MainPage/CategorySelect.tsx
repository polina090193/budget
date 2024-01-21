"use client";

import { useContext, useMemo } from 'react';
import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import CustomSelect from '../../components/inputs/select/CustomSelectWithLinks';
import { FieldAttributes, FormikProps, FormikSharedConfig, useFormikContext } from 'formik';
import { SelectChangeEvent } from '@mui/material';

export default function CategorySelect({
  field,
  defaultValue,
  isWithAll,
  ...props
}: FormikProps<FormikSharedConfig> & {
  field: FieldAttributes<any>,
  defaultValue: number,
  isWithAll?: boolean,
}) {
  const categories = useContext(CategoriesContext);

  const categoriesList = categories?.categoriesData ?? [];

  const categoriesListWithAll = useMemo(() => ([
    {
      id: '0',
      name: 'All',
      slug: 'all',
      link: '/',
    },
    ...categoriesList,
  ]), [categoriesList]);

  const { setFieldValue } = useFormikContext();

  return (
    <>
      {categories?.areCategoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <CustomSelect
          value={field.value}
          onChangeFormik={(event: SelectChangeEvent<number>) => setFieldValue(field.name, event.target.value)}
          data={isWithAll ? categoriesListWithAll : categoriesList}
          defaultValue={defaultValue}
          namePlural="categories"
          nameSingular="category"
          {...field}
          {...props}
        />
      )
      }
    </>
  )
}
