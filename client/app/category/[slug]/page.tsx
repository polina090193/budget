import styles from './page.module.css'

export default function Category({params}: {params: {slug: string}}) {
  const { slug } = params;

  return (
    <main className={styles.main}>
      <p>
        Category: {slug}
      </p>
    </main>
  )
}
