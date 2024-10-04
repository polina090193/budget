export async function getCategoryById(id: number) {
  try {
    const categoryRes = await fetch(`http://localhost:3000/api/categories/${id}`);
    const categoryData = await categoryRes.json();

    const categoryDataProcessed = {
      ...categoryData[0],
      id: categoryData[0].category_id.toString(),
    };
    
    return categoryDataProcessed;
  } catch (error) {
    console.log('Error by category loading: ' + error);
  }
}

export default getCategoryById;
