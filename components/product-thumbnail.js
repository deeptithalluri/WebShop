import styles from "../styles/productListing.module.css"
import Link from 'next/link'

export const ProductThumbnail = (props) => {
  const product = props.product
  return (
    <Link href="/product/[id]" as={`/product/${product.id}`} >
      <div className={styles.productThumbnail}>
        <img className={styles.productThumbnailImg} src={product.productImage.url} />
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <h1>{product.currency} {product.price}</h1>
        </div>
      </div>
    </Link >
  )
}