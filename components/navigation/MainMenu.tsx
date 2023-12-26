"use client"

import { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import styles from './MainMenu.module.css'
import UserDrawer from './UserDrawer';
import { Session } from 'next-auth';

export default function MainMenu(
  { isLoggedIn, session }:
    { isLoggedIn: boolean, session: Session | null }
) {
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
