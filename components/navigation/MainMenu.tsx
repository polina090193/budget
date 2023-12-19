"use client"

import { useMemo, useState, useCallback } from 'react';
import { Button } from '@mui/material';
import styles from './MainMenu.module.css'
import UserDrawer from './UserDrawer';
import { useSession } from 'next-auth/react';

export default function MainMenu() {
  const { data: session, status: sessionStatus } = useSession();
  const isLoggedIn = useMemo(() => sessionStatus === "authenticated", [sessionStatus]);

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false)

  const toggleUserDrawer = useCallback(
    () => setIsUserDrawerOpen(!isUserDrawerOpen),
    [isUserDrawerOpen]
  );

  const pressUserButton = useCallback(() => {
    toggleUserDrawer();
  }, [])

  return (
    <header className={styles.header}>
      <Button onClick={pressUserButton}>{
        isLoggedIn
          ? `Your Profile, ${session?.user?.name || session?.user?.email || 'User'}`
          : 'Login/Sign Up'
      }</Button>
      <UserDrawer
        isLoggedIn={isLoggedIn}
        isUserDrawerOpen={isUserDrawerOpen}
        toggleUserDrawer={toggleUserDrawer}
      />
    </header>
  )
}
