import MainPage from "@/pages/MainPage";
import getAllRecords from "@/app/fetch/records/getAllRecords";
import getAllCategories from "./fetch/categories/getAllCategories";

export default async function Dashboard() {
  const recordsData = await getAllRecords();
  const categoriesData = await getAllCategories();

  return (
    <MainPage recordsData={recordsData} categoriesData={categoriesData} />
  )
}
