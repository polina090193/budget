"use client";

import { useRef, useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";

import { validateEmail } from "@/utils/validation/validateEmail";
import { validatePassword } from "@/utils/validation/validatePassword";

import CustomSnackbar from "../info/CustomSnackbar";
import EmailField from "../inputs/text/auth/EmailField";
import NameField from "../inputs/text/auth/NameField";
import PasswordField from "../inputs/text/auth/PasswordField";

import styles from './AuthForm.module.css';
import TitleField from "../inputs/text/record/TitleField";
import SumField from "../inputs/text/record/SumField";
import { dateSQLadapter } from "@/utils/adapters/dateSQLadapter";

export default function RecordForm({updateRecordsData}: {updateRecordsData: () => void}) {
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

    const title = titleRef.current?.value;
    const direction = 'PLUS';/* directionRef.current?.value; */

    const newRecordData: BudgetRecordReq = {
      date: dateSQLadapter(new Date()),
      title: title || (direction === 'PLUS' ? 'Income' : 'Expense'),
      direction,
      sum: 100,
      category: 8,
      user_id: 39
    }

    try {
      const createRecordResponse = await fetch(
        'http://localhost:3000/api/records/create',
        {
          method: 'POST',
          body: JSON.stringify(newRecordData)
        }
      );

      const newRecord = await createRecordResponse.json();
      await updateRecordsData();
      return newRecord;

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
