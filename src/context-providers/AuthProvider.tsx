'use client';

import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
