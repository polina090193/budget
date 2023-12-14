"use client"

import { useMemo, useState, useCallback } from 'react';
import { Button } from '@mui/material';
import styles from './MainMenu.module.css'
import UserDrawer from './UserDrawer';

export default function MainMenu() {
  const isLoggedIn = useMemo(() => false, []);

  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false)

  const toggleUserDrawer = useCallback(() => setIsUserDrawerOpen(!isUserDrawerOpen), [isUserDrawerOpen]);
  
  const pressUserButton = useCallback(() => {
    // if (isLoggedIn) {
      toggleUserDrawer();
    // } else {
    //   openLoginModal();
    // }
  }, [isLoggedIn])

  return (
    <header className={styles.header}>
      <Button onClick={pressUserButton}>{ isLoggedIn ? 'You' : 'Login' }</Button>
      <UserDrawer
        isLoggedIn={isLoggedIn}
        isUserDrawerOpen={isUserDrawerOpen}
        toggleUserDrawer={toggleUserDrawer}
      />
    </header>
  )
}
