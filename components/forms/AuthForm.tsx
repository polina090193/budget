"use client";

import { useRef, useCallback, useState } from "react";

import { checkLoginFormForErrors } from "@/utils/validation/checkLoginForm";

import CustomSnackbar from "../info/CustomSnackbar";
import EmailField from "../inputs/text/EmailField";
import NameField from "../inputs/text/NameField";
import PasswordField from "../inputs/text/PasswordField";

import styles from './AuthForm.module.css';
import { signIn } from "next-auth/react";
import { hashPassword } from "@/utils/auth/hashPassword";

export default function AuthForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [hasAccount, setHasAccount] = useState(true);

  const [toastState, setToastState] = useState<ToastProps>({
    open: false,
    toastMessage: '',
    toastSeverity: 'error'
  })

  const setToast = useCallback((severity: ToastSeverity, message: string) => {
    setToastState({
      ...toastState,
      open: true,
      toastMessage: message,
      toastSeverity: severity,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToastState({
      ...toastState,
      open: false
    });
  }, []);

  const submitAuth = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const formError = checkLoginFormForErrors(email, password);

    if (formError) {
      setToast('error', formError);
      return;
    }

    if (!hasAccount) {
      const hashedPassword = await hashPassword(password!);
      const signUpResponse = await fetch(
        'http://localhost:3000/api/auth/signup',
        {
          method: 'POST',
          body: JSON.stringify({ email, password_hash: hashedPassword, name })
        }
      );

      if (signUpResponse.status === 201) {
        setToast('success', 'Account created successfully');
      } else {
        setToast('error', 'Something went wrong');
      }

    } else {
      const signInResponse = await signIn('credentials', { email, password, redirect: false });
      if (signInResponse?.status === 200) {
        setToast('success', 'Successfully logged in');
      } else {
        setToast('error', 'Login or password is incorrect');
      }
    }
  }, [hasAccount])

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={submitAuth} className={styles.loginForm}>
        <h1>{hasAccount ? 'Login' : 'Register'}</h1>

        <NameField inputRef={nameRef} />

        <EmailField inputRef={emailRef} />

        <PasswordField inputRef={passwordRef} />

        <button type="submit">{hasAccount ? 'Login' : 'Register'}</button>


      </form>
      {hasAccount ? (
        <div>Don't have an account?
          <button
            type="button"
            onClick={() => setHasAccount(prevHasAccount => !prevHasAccount)}>
            Register
          </button>
        </div>) : (<div>Already have an account?
          <button
            type="button"
            onClick={() => setHasAccount(prevHasAccount => !prevHasAccount)}>
            Login with existing account
          </button>
        </div>)}
      <CustomSnackbar
        toastState={toastState} closeToast={closeToast}
      />
    </div>
  )
}
