import getCategoryById from '@/app/fetch/categories/getCategoryById';
import getRecords from '@/app/fetch/records/getRecords';
import CategorySelect from '@/components/inputs/select/CategorySelect';
import RecordsList from '@/components/records/RecordsList';
import styles from './page.module.css'

export default async function Category({params}: {params: {category_id: number}}) {
  const { category_id } = params;
  const categoryData = await getCategoryById(category_id);
  const recordsData = await getRecords(category_id);

  return (
    <main className={styles.main}>
      <CategorySelect defaultCategoryValue={categoryData.slug} />
      <p>
        Category: {categoryData.name}
      </p>
      <RecordsList user={user} recordsData={recordsData} />
    </main>
  )
}
