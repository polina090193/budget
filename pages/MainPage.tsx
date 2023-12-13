"use client"

import styles from './MainPage.module.css'
import MainMenu from '@/components/navigation/MainMenu';
import CategorySelect from '@/components/inputs/select/CategorySelect';
import RecordsList from '@/components/records/RecordsList';

export default function Dashboard(props: { recordsData: BudgetRecord[] }) {
  const { recordsData } = props;

  return (
    <main className={styles.main}>
      <MainMenu />
      <CategorySelect defaultCategoryValue={'all'} />
      <RecordsList recordsData={recordsData} />
    </main>
  )
}
