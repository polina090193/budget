"use client"

import styles from './MainPage.module.css'
import MainMenu from '@/components/navigation/MainMenu';
import CategorySelect from '@/components/inputs/select/CategorySelect';
import RecordsList from '@/components/records/RecordsList';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import RecordForm from '@/components/forms/RecordForm';
import getRecords from '@/app/fetch/records/getRecords';

export default function Dashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);
  const [recordsData, setRecordsData] = useState<BudgetRecords>([]);

  const fetchRecords = useCallback(async () => {
    try {
      const newRecordsData = await getRecords();
      setRecordsData(newRecordsData);
    } catch (error) {
      console.log('Error by records loading on client:' + error);
    }
  }, [setRecordsData]);

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <main className={styles.main}>
      <MainMenu isLoggedIn={isLoggedIn} session={session} />
      <CategorySelect defaultCategoryValue={'0'} isWithAll={true} />
      {isLoggedIn &&
        <>
          <RecordsList user={session?.user} recordsData={recordsData} />
          <RecordForm user={session?.user} fetchRecords={fetchRecords}  />
        </>
      }
    </main>
  )
}
