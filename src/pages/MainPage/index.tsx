"use client"

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import RecordModal from '../RecordFormModal/index';
import styles from './assets/MainPage.module.css';
import CategorySelect from './CategorySelect';
import MainMenu from './MainMenu';
import RecordsList from './RecordsList';

export default function Dashboard() {
  const { data: session, status: sessionStatus } = useSession();

  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);
  const isSessionLoading = useMemo(() => sessionStatus === "loading", [sessionStatus]);

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
            <RecordsList session={session} />
            <RecordModal user={session?.user}  />
          </>
        )}
      </>
    )}
  </main>
  )
}
