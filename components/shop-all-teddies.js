import Link from 'next/link'
import styles from "../styles/browse-teddies.module.css"
export const ShopTeddies = () => {
  return (
    <Link href="/listing">
      <button className={styles.browseAllTeddiesButton}>
        Shop Teddies
      </button>
    </Link>
  )
}