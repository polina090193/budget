"use client";

import { useRef, useCallback, useState, useEffect } from "react";

import { validateEmail } from "@/utils/validation/validateEmail";
import { validatePassword } from "@/utils/validation/validatePassword";

import CustomSnackbar from "../../../components/info/CustomSnackbar";
import EmailField from "./inputs/EmailField";
import NameField from "./inputs/NameField";
import PasswordField from "./inputs/PasswordField";

import styles from './assets/AuthForm.module.css';
import { signIn } from "next-auth/react";
import { hashPassword } from "@/utils/auth/hashPassword";

export default function AuthForm({toggleUserDrawer}: {toggleUserDrawer: () => void}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (formRef?.current) {
      formRef.current.reset();
    }
  }, [hasAccount]);

  const submitAuth = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const emailError = validateEmail(email);

    if (emailError) {
      setToast('error', emailError);
      return;
    }

    if (!hasAccount) {
      const passwordError = validatePassword(password);

      if (passwordError) {
        setToast('error', passwordError);
        return;
      }

      const hashedPassword = await hashPassword(password!);

      const signUpResponse = await fetch(
        'http://localhost:3000/api/auth/signup',
        {
          method: 'POST',
          body: JSON.stringify({ email, password_hash: hashedPassword, name })
        }
      );

      if (signUpResponse.status === 201) {
        setToast('success', 'Account is created successfully');
      } else if (signUpResponse.status === 409) {
        setToast('error', 'User with this email already exists');
      } else {
        setToast('error', 'Something went wrong');
      }

      setHasAccount(true);

    } else {
      const signInResponse = await signIn('credentials', { email, password, redirect: false });
      if (signInResponse?.status === 200) {
        setToast('success', 'Successfully logged in');
        toggleUserDrawer();
      } else {
        setToast('error', 'Login or password is incorrect');
      }
    }
  }, [hasAccount])

  return (
    <div className={styles.loginContainer}>
      <form ref={formRef} onSubmit={submitAuth} className={styles.loginForm}>
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
