"use client"

import { Drawer } from '@mui/material';
import styles from './UserDrawer.module.scss'
import AuthForm from '../forms/AuthForm';

interface UserDrawerProps {
  isLoggedIn: boolean;
  toggleUserDrawer: () => void;
  isUserDrawerOpen: boolean;
}

export default function UserDrawer({
  isLoggedIn,
  toggleUserDrawer,
  isUserDrawerOpen
}: UserDrawerProps) {
  return (
    <Drawer
      anchor={'right'}
      open={isUserDrawerOpen}
      onClose={toggleUserDrawer}
      className={styles.userDrawer}
    >
      {isLoggedIn ?
        <p>You are logged in</p> : 
        <AuthForm />}
    </Drawer>
  )
}
