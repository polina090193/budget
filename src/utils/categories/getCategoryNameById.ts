export const getCategoryNameById = (categoriesList: BudgetCategories, id: string) => (
  categoriesList?.find(category => Number(category.category_id) === Number(id))?.name
);
