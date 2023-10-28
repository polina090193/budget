import getCategoryById from '@/app/fetch/categories/getCategoryById';
import styles from './page.module.css'

export default async function Category({params}: {params: {id: number}}) {
  const { id } = params;
  const categoryData = await getCategoryById(id);

  return (
    <main className={styles.main}>
      <p>
        Category: {categoryData.name}
      </p>
    </main>
  )
}
