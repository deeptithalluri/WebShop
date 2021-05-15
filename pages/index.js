import styles from '../styles/Home.module.css'
import { ShopTeddies } from '../components/shop-all-teddies'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <h1>We sell awesome teddies</h1>
      <img src="https://5.imimg.com/data5/DO/JS/MY-36541966/teddy-bear-soft-toys-25-cm-500x500.jpg" />
      <ShopTeddies />
    </div>
  )
}
