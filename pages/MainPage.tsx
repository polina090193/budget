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
            <RecordForm user={session?.user} />
          </>
        )}
      </>
    )}
  </main>
  )
}
