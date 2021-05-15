import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProductById } from '../../../service/dato-cms'
import styles from "../../../styles/product.module.css"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { CustomLoader } from "../../../components/loader"
import { ShopTeddies } from '../../../components/shop-all-teddies'

export default function Product(props) {
  const router = useRouter()
  const [product, setProduct] = useState()
  const id = router.query.id
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading)

  useEffect(async () => {
    if (id) {
      dispatch({ type: 'request-made' })
      const data = await getProductById(id)
      setProduct(data)
      dispatch({ type: 'request-resolved' })
    }
  }, [id])

  const buyProductHandler = async () => {
    try {
      dispatch({ type: 'request-made' })
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "post",
        body: JSON.stringify({
          productID: product.productID,
        })
      })
      dispatch({
        type: 'payment-success',
        payload: await response.json()
      })
      dispatch({ type: 'request-resolved' })
      router.push("/payment/success")
    } catch (e) {
      router.push("/payment/failure")
    }
  }

  const addToCartHandler = () => {
    dispatch({
      type: 'add-to-cart',
      payload: product
    })
  }

  return (
    isLoading ?
      <CustomLoader loading={isLoading} /> :
      (product ?
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <img className={styles.img} src={product.productImage.url} />
            <div className={styles.controllers}>
              <button className={styles.buyButton} onClick={buyProductHandler}>BUY NOW</button>
              <button className={styles.addToCartButton} onClick={addToCartHandler}>ADD TO CART</button>
            </div>
          </div>
          <div className={styles.rightSection}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className={styles.price}>
              <label> Price: </label>
              <h1>{product.currency} {product.price}</h1>
            </div>
          </div>
          <ShopTeddies />
        </div> : null
      )

  )
}
