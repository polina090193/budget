import MainPage from "@/pages/MainPage";
import getRecords from "@/app/fetch/records/getRecords";

export default async function Dashboard() {
  const recordsData = await getRecords();

  return (
    <MainPage recordsData={recordsData} />
  )
}
