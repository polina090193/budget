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
  const [recordsData, setRecordsData] = useState<BudgetRecords>([]);
  const [areRecordsLoading, setAreRecordsLoading] = useState(false);

  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);
  const isSessionLoading = useMemo(() => sessionStatus === "loading", [sessionStatus]);

  const fetchRecords = useCallback(async () => {
    if (!session?.user) {
      console.log('Error by records loading on client: user is not defined');
      return;
    }

    try {
      setAreRecordsLoading(true);
      const newRecordsData = await getRecords(session?.user?.id);
      setRecordsData(newRecordsData);
      setAreRecordsLoading(false);
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
    {isSessionLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        <MainMenu isLoggedIn={isLoggedIn} session={session} />
        {isLoggedIn && (
          <>
            <CategorySelect defaultCategoryValue={'0'} isWithAll={true} />
            <RecordsList user={session?.user} recordsData={recordsData} areRecordsLoading={areRecordsLoading} />
            <RecordForm user={session?.user} fetchRecords={fetchRecords} />
          </>
        )}
      </>
    )}
  </main>
  )
}
