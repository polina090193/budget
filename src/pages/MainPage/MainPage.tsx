"use client"

import { Button } from '@mui/material';
import { GridRowIdGetter } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import RecordFormModal from '../FormModal/RecordForm/RecordFormModal';
import styles from './assets/MainPage.module.css';
import CategorySelect from '../FormModal/inputs/CategorySelect';
import MainMenu from './MainMenu';
import RecordsList from './RecordsList';

export default function MainPage() {
  const { data: session, status: sessionStatus } = useSession();

  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);
  const isSessionLoading = useMemo(() => sessionStatus === "loading", [sessionStatus]);

  const [showRecordFormModal, setShowRecordFormModal] = useState(false);
  const [ selectedRecordId, setSelectedRecordId ] = useState<GridRowIdGetter | null>(null);
  const [ selectedCategoryId, setSelectedCategoryId ] = useState<number | undefined>(undefined);

  return (
    <main className={styles.main}>
      {isSessionLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <MainMenu isLoggedIn={isLoggedIn} session={session} />
          {isLoggedIn && (
            <>
              <CategorySelect
                defaultValue={0}
                isWithAll={true}
                sx={{ width: 400 }}
                onCategoryChange={
                  (value: number) => {
                    setSelectedCategoryId(value);
                  }
                }
              />
              <Button type='button' onClick={() => setShowRecordFormModal(true)}>
                Create record
              </Button>
              <RecordsList
                setShowRecordFormModal={setShowRecordFormModal}
                setSelectedRecordId={setSelectedRecordId}
                selectedCategoryId={selectedCategoryId}
              />
              <RecordFormModal
                user={session?.user}
                showRecordFormModal={showRecordFormModal}
                setShowRecordFormModal={setShowRecordFormModal}
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
              />
            </>
          )}
        </>
      )}
    </main>
  )
}
