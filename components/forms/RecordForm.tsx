"use client";

import { useRef, useCallback, useState, useEffect } from "react";

import { validateEmail } from "@/utils/validation/validateEmail";
import { validatePassword } from "@/utils/validation/validatePassword";

import CustomSnackbar from "../info/CustomSnackbar";
import EmailField from "../inputs/text/auth/EmailField";
import NameField from "../inputs/text/auth/NameField";
import PasswordField from "../inputs/text/auth/PasswordField";

import styles from './AuthForm.module.css';
import { signIn } from "next-auth/react";
import { hashPassword } from "@/utils/auth/hashPassword";
import TitleField from "../inputs/text/record/TitleField";
import SumField from "../inputs/text/record/SumField";

export default function RecordForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const sumRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLSelectElement>(null);
  // const formRef = useRef<HTMLFormElement>(null);

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

  const submit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const createRecordResponse = await fetch(
        'http://localhost:3000/api/records/create',
        {
          method: 'POST',
          body: JSON.stringify({ date: '2023-10-22 17:02:58', title: 'record', direction: 'PLUS', sum: 100, category: 8, user_id: 39 })
        }
      );
      const data = createRecordResponse.json();
      console.log(data);

      return data
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <form onSubmit={submit} className={styles.loginForm}>
        <h1>Record form</h1>

        <TitleField inputRef={titleRef} />

        Date Field

        Direction field

        <SumField inputRef={sumRef} />

        Category field

        <button type="submit">Add record</button>

      </form>
      <CustomSnackbar
        toastState={toastState} closeToast={closeToast}
      />
    </>
  )
}
