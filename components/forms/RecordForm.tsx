"use client";

import { useRef, useCallback, useState, useMemo, useContext } from "react";

import CustomSnackbar from "../info/CustomSnackbar";

import styles from './AuthForm.module.css';
import TitleField from "../inputs/text/record/TitleField";
import SumField from "../inputs/text/record/SumField";
import { dateSQLadapter } from "@/utils/adapters/dateSQLadapter";
import DateField from "../inputs/text/record/DateField";
import DirectionField from "../inputs/text/record/DirectionField";
import CategorySelect from "../inputs/select/CategorySelect";
import { CategoriesContext } from "@/context-providers/CategoriesProvider";

export default function RecordForm({
  user,
  fetchRecords,
}: {
  user: NextAuthUser | undefined,
  fetchRecords: () => void,
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const sumRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const categoriesData = useContext(CategoriesContext);

  const firstCategoryValue = useMemo(() => categoriesData[0]?.id ?? '', [categoriesData]);

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

    const formValues = {
      title: titleRef.current?.value,
      sum: sumRef.current?.value,
      date: dateSQLadapter(dateRef.current?.value
        ? new Date(dateRef.current?.value)
        : new Date()),
      direction: directionRef.current?.value,
      category: categoryRef.current?.value,
      user_id: user?.id,
    }

    try {
      const createRecordResponse = await fetch(
        'http://localhost:3000/api/records/create',
        {
          method: 'POST',
          body: JSON.stringify(formValues)
        }
      );

      await fetchRecords();
      formRef?.current?.reset();

      const newRecord = await createRecordResponse.json();
      return newRecord;
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <form ref={formRef} onSubmit={submit} className={styles.loginForm}>
        <h1>Record form</h1>

        <TitleField inputRef={titleRef} />

        <DateField inputRef={dateRef} />

        <DirectionField inputRef={directionRef} />

        <SumField inputRef={sumRef} />

        <CategorySelect inputRef={categoryRef} defaultCategoryValue={firstCategoryValue}></CategorySelect>

        <button type="submit">Add record</button>

      </form>
      <CustomSnackbar
        toastState={toastState} closeToast={closeToast}
      />
    </>
  )
}
