import { useEffect } from 'react'
import styles from "../../styles/payment.module.css"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ShopTeddies } from '../../components/shop-all-teddies'

export default function PaymentSuccess(props) {
  const payment = useSelector((state) => state.payment)
  const router = useRouter()
  useEffect(() => {
    if (!payment) {
      router.push("/error")
    }
  }, [])

  if (!payment) {
    return null
  }
  return (
    <div className={styles.container}>
      <img className={styles.successImg} src="https://toppng.com/uploads/preview/download-transparent-check-mark-gif-11562855141yrviuuu1dd.png" />
      <hr />
      <label className={styles.message}>Thank you, your payment has been successful</label>
      <hr />
      <div className={styles.paymentDetails}>
        <h1>Order details</h1>
        <div className={styles.row}>
          <td>Track Id</td>
          <td>{payment.trackID}</td>
        </div>
        <div className={styles.row}>
          <td>Order ID</td>
          <td>{payment.orderID}</td>
        </div>
        <div className={styles.row}>
          <td>Order Date</td>
          <td>{new Date(payment.orderDate).toLocaleString()}</td>
        </div>
      </div>
      <ShopTeddies />
    </div>
  )
}
