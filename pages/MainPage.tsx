"use client"

import styles from './MainPage.module.css'
import RecordsList from '@/components/records/RecordsList';
import CategorySelect from '../components/inputs/select/CategorySelect';

export default function Dashboard(props: { recordsData: BudgetRecord[], categoriesData: BudgetCategory[] }) {
  const { recordsData, categoriesData } = props;

  return (
    <main className={styles.main}>
      <CategorySelect categoriesData={categoriesData} defaultCategoryValue={'all'} />
      <RecordsList recordsData={recordsData} />
    </main>
  )
}
