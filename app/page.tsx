import { revalidateTag } from 'next/cache'
import MainPage from "@/pages/MainPage";
import getRecords from "@/app/fetch/records/getRecords";

export default async function Dashboard() {
  const recordsData = await getRecords();
  const updateRecordsData = async () => {
    'use server';
    revalidateTag('collection');
  }

  return (
    <MainPage recordsData={recordsData} updateRecordsData={updateRecordsData} />
  )
}
