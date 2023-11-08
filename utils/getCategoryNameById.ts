'use client';

export const getCategoryNameById = (categoriesData: BudgetCategories, id: string) => (
  categoriesData?.find(category => Number(category.id) === Number(id))?.name
);
