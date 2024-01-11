export const getCategoryNameById = (categoriesList: BudgetCategories, id: string) => (
  categoriesList?.find(category => Number(category.id) === Number(id))?.name
);
