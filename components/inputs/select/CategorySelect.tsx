import CustomSelect from './CustomSelectWithLinks';

export default function CategorySelect({
  categoriesData,
  defaultCategoryValue
}: {
  categoriesData: BudgetCategory[],
  defaultCategoryValue: string
}) {
  return (
    <CustomSelect 
      data={categoriesData}
      defaultValue={defaultCategoryValue}
      namePlural="categories"
      nameSingular="category"
    />
  )
}
