import Link from 'next/link'
import styles from "../styles/error.module.css"

export default function Error() {
  return (
    <div className={styles.error}>
      <h1>404</h1>
      <p>Oops! Something is wrong.</p>
      <Link href="/" >
        <p className={styles.link}>Go back in initial page, is better.</p>
      </Link>
    </div>
  )
}