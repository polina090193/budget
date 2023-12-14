"use client";

import { checkLoginFormForErrors } from "@/utils/validation/checkLoginForm";
import { useRef, useCallback, useState } from "react";
import CustomSnackbar from "../info/CustomSnackbar";
import EmailField from "../inputs/text/EmailField";
import NameField from "../inputs/text/NameField";
import PasswordField from "../inputs/text/PasswordField";

import styles from './AuthForm.module.css';

export default function AuthForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [hasAccount, setHasAccount] = useState(true);

  const [errorToastState, setErrorToastState] = useState<ToastProps>({
    open: false,
    toastMessage: '',
    toastSeverity: 'error'
  })

  const setToastError = useCallback((message: string) => {
    setErrorToastState({
      ...errorToastState,
      open: true,
      toastMessage: message,
    });
  }, []);

  const closeErrorToast = useCallback(() => {
    setErrorToastState({
      ...errorToastState,
      open: false
    });
  }, []);

  const isValidEmail = useCallback((email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }, []);

  const submitLogin = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const formError = checkLoginFormForErrors(email, password);

    if (formError) {
      setToastError(formError);
      return;
    }

    console.log({
      email: email,
      password: password
    });
  }, [])

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={submitLogin} className={styles.loginForm}>
        <h1>{hasAccount ? 'Login' : 'Register'}</h1>

        <NameField inputRef={nameRef} />

        <EmailField inputRef={emailRef} />

        <PasswordField inputRef={passwordRef} />

        <button type="submit">Login</button>

        {hasAccount ? (
          <div>Don't have an account?
            <button
              type="button"
              onClick={() => setHasAccount(!hasAccount)}>
              Register
            </button>
          </div>) : (<div>Already have an account?
            <button
              type="button"
              onClick={() => setHasAccount(!hasAccount)}>
              Login with existing account
            </button>
          </div>)}

      </form>
      <CustomSnackbar
        toastState={errorToastState} closeToast={closeErrorToast}
      />
    </div>
  )
}
