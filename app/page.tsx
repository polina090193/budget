import MainPage from "@/pages/MainPage";
import getAllRecords from "@/app/fetch/getAllRecords";

export default async function Dashboard() {
  const recordsData = await getAllRecords();

  return (
    <MainPage recordsData={recordsData} />
  )
}
