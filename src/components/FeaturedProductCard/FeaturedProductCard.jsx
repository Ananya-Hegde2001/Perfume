import { memo } from 'react'
import { formatPrice } from '../../utils/format'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import ProductMedia from '../ProductMedia/ProductMedia'
import styles from './FeaturedProductCard.module.css'

function FeaturedProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ProductMedia
          src={product.image}
          alt={product.name}
          className={styles.image}
          behavior="viewport"
          priority
          posterSrc={product.gallery?.[0]}
        />
      </div>
      <div className={styles.meta}>
        <div className="eyebrow">Featured</div>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.row}>
          <Badge>{product.category}</Badge>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>
        <p className={styles.desc}>{product.shortDescription}</p>
        <div className={styles.row}>
          <Button to={`/products/${product.id}`} variant="primary">
            View details
          </Button>
          <Button to="/products" variant="ghost">
            Browse collection
          </Button>
        </div>
      </div>
    </article>
  )
}

export default memo(FeaturedProductCard)
