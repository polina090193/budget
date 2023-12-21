"use client"

import styles from './MainPage.module.css'
import MainMenu from '@/components/navigation/MainMenu';
import CategorySelect from '@/components/inputs/select/CategorySelect';
import RecordsList from '@/components/records/RecordsList';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { TextField } from '@mui/material';
import RecordForm from '@/components/forms/RecordForm';

export default function Dashboard(props: { recordsData: BudgetRecord[] }) {
  const { data: session, status: sessionStatus } = useSession();
  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);

  const { recordsData } = props;

  return (
    <main className={styles.main}>
      <MainMenu isLoggedIn={isLoggedIn} session={session} user={session?.user} />
      <CategorySelect defaultCategoryValue={'all'} />
      {isLoggedIn &&
        <>
          <RecordsList user={session?.user} recordsData={recordsData} />
          <RecordForm />
        </>
      }
    </main>
  )
}
