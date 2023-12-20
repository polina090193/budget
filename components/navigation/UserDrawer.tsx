"use client"

import { Button, Drawer } from '@mui/material';
import styles from './UserDrawer.module.scss'
import AuthForm from '../forms/AuthForm';
import { signOut } from "next-auth/react"

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
        <>
          <p>You are logged in</p>
          <Button onClick={() => signOut()}>
            Logout
          </Button>
        </>
        : <AuthForm />}
    </Drawer>
  )
}
