"use client"

import { useMemo, useState, useCallback } from 'react';
import { Button, Drawer } from '@mui/material';
import styles from './MainMenu.module.css'
import LoginForm from '../forms/LoginForm';

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
      <Drawer
        anchor={'right'}
        open={isUserDrawerOpen}
        onClose={toggleUserDrawer}
        className={styles.loginButton}
      >
        {isLoggedIn ?
          <p>You are logged in</p> : 
          <LoginForm />
        }
      </Drawer>
    </header>
  )
}
