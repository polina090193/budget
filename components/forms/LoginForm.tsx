"use client";

import { TextField } from "@mui/material";
import { useRef, useCallback, useState } from "react";
import CustomSnackbar from "../info/CustomSnackbar";



export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorToastState, setErrorToastState] = useState<SnackbarProps>({
    open: false,
    setOpen: () => {
      setErrorToastState({
        ...errorToastState,
        open: false
      })
    },
    toastMessage: '',
    toastSeverity: 'error'
  })

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const submitLogin = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) {
      console.error('Email is required');
      return;
    }
    if (!isValidEmail(email)) {
      console.error('Please enter a valid email address');
      return;
    }
    if (!password) {
      console.error('Password is required');
      return;
    }

    console.log({
      email: email,
      password: password
    });
  }, [])

  return (
    <>
      <form onSubmit={submitLogin}>
        <h1>Login</h1>

        <TextField
          inputRef={emailRef}
          id="email-field"
          label="Email"
          autoComplete="email"
        />

        <TextField
          inputRef={passwordRef}
          id="password-field"
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <button type="submit">Login</button>

        Already have an account? <button>Register</button>
      </form>
      <CustomSnackbar
        toastState={errorToastState}
      />
    </>
  )
}
