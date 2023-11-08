"use client"

import styles from './MainPage.module.css'
import RecordsList from '@/components/records/RecordsList';
import CategorySelect from '../components/inputs/select/CategorySelect';

export default function Dashboard(props: { recordsData: BudgetRecord[] }) {
  const { recordsData } = props;

  return (
    <main className={styles.main}>
      <CategorySelect defaultCategoryValue={'all'} />
      <RecordsList recordsData={recordsData} />
    </main>
  )
}
