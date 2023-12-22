"use client"

import styles from './MainPage.module.css'
import MainMenu from '@/components/navigation/MainMenu';
import CategorySelect from '@/components/inputs/select/CategorySelect';
import RecordsList from '@/components/records/RecordsList';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import RecordForm from '@/components/forms/RecordForm';

export default function Dashboard(props: { recordsData: BudgetRecords, updateRecordsData: () => void }) {
  const { data: session, status: sessionStatus } = useSession();
  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);
  const { recordsData, updateRecordsData } = props;

  // const [recordsData, setRecordsData] = useState<BudgetRecords>(props.recordsData);

  return (
    <main className={styles.main}>
      <MainMenu isLoggedIn={isLoggedIn} session={session} user={session?.user} />
      <CategorySelect defaultCategoryValue={'all'} />
      {isLoggedIn &&
        <>
          <RecordsList user={session?.user} recordsData={recordsData} />
          <RecordForm updateRecordsData={updateRecordsData}  />
        </>
      }
    </main>
  )
}
