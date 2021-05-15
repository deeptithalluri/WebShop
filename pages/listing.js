import styles from '../styles/productListing.module.css'
import { getAllProducts } from "../service/dato-cms"
import { ProductThumbnail } from '../components/product-thumbnail'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomLoader } from '../components/loader'

export default function ProductListing(props) {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading)

  useEffect(async () => {
    dispatch({ type: 'request-made' })
    setProducts(await getAllProducts())
    dispatch({ type: 'request-resolved' })
  }, [])

  return (
    isLoading ?
      <CustomLoader loading={isLoading} /> :
      <div className={styles.listingContainer}>
        {products.map(product => <ProductThumbnail key={product.id} product={product} />)}
      </div>
  )
}
