export async function getAllCategories() {
  try {
    const categoriesRes = await fetch('http://localhost:3000/api/categories');
    const categoriesData = await categoriesRes.json();

    const categoriesDataProcessed: BudgetCategory[] = [
      ...categoriesData.map((category: BudgetCategoryRes) => ({
        ...category,
        id: category.category_id.toString(),
      }))
    ];

    return categoriesDataProcessed;
  } catch (error) {
    console.log('Error by categories loading:' + error);
    return [];
  }
}

export default getAllCategories;
