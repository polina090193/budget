import MainPage from "@/pages/MainPage";
import getRecords from "@/app/fetch/records/getRecords";
import getAllCategories from "./fetch/categories/getAllCategories";

export default async function Dashboard() {
  const recordsData = await getRecords();
  const categoriesData = await getAllCategories();

  return (
    <MainPage recordsData={recordsData} categoriesData={categoriesData} />
  )
}
