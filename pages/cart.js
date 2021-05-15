import { useSelector } from 'react-redux'
import styles from "../styles/cart.module.css"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ShopTeddies } from '../components/shop-all-teddies'

export default function Cart() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const router = useRouter()

  const buyProductHandler = async () => {
    try {
      dispatch({ type: 'request-made' })
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "post",
      })
      dispatch({
        type: 'payment-success',
        payload: await response.json()
      })
      dispatch({ type: 'request-resolved' })
      router.push("/payment/success")
      dispatch({ type: 'clear-cart', })
    } catch (e) {
      router.push("/payment/failure")
    }
  }

  if (cart.length === 0) {
    return (
      <div className={styles.noItemsContainer}>
        <h1>No Items in the Cart</h1>
        <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" />
        <ShopTeddies />
      </div>
    )
  }
  return (
    <div className={styles.container}>
      {
        cart.map((product, index) => {
          return (
            <div className={styles.cartItem}>
              <img src={product.productImage.url} />
              <div className={styles.info}>
                <h1 className={styles.title}>{product.name}</h1>
                <h2 className={styles.price}>Price: {product.currency} {product.price}</h2>
              </div>
              <div className={styles.controllers}>
                <button onClick={() => {
                  dispatch({
                    type: "remove-from-cart",
                    payload: index
                  })
                }} className={styles.removeButton}>X</button>
              </div>
            </div>
          )
        })
      }
      <button className={styles.buyAll} onClick={buyProductHandler}>Buy All</button>
      <ShopTeddies />
    </div>
  )
}