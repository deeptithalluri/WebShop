import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from "../styles/header.module.css"

export const Header = () => {
  const cart = useSelector((state) => state.cart)
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1 className={styles.title}>Teddy Shop</h1>
      </Link>
      <Link href="/cart">
        <div className={styles.cart}>
          <span className='counter'>{cart.length}</span>
        </div>
      </Link>
    </div>
  )
}