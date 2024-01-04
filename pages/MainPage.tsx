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
    if (!session?.user) {
      console.log('Error by records loading on client: user is not defined');
      return;
    }

    try {
      const newRecordsData = await getRecords(session?.user?.id);
      setRecordsData(newRecordsData);
    } catch (error) {
      console.log('Error by records loading on client:' + error);
    }
  }, [session?.user?.id, setRecordsData]);

  useEffect(() => {
    if (session) {
      fetchRecords();
    }
  }, [session]);

  return (
    <main className={styles.main}>
      <MainMenu isLoggedIn={isLoggedIn} session={session} />
      {isLoggedIn &&
        <>
          <CategorySelect defaultCategoryValue={'0'} isWithAll={true} />
          <RecordsList user={session?.user} recordsData={recordsData} />
          <RecordForm user={session?.user} fetchRecords={fetchRecords}  />
        </>
      }
    </main>
  )
}
