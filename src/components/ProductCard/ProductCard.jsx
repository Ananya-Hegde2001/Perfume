import { Link } from 'react-router-dom'
import { memo } from 'react'
import { formatPrice } from '../../utils/format'
import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import ProductMedia from '../ProductMedia/ProductMedia'
import styles from './ProductCard.module.css'

function ProductCard({ product, priority = false }) {
  return (
    <article className={styles.card}>
      <Link to={`/products/${product.id}`} className="focusRing" aria-label={`View ${product.name} details`}>
        <div className={styles.media}>
          <ProductMedia
            src={product.image}
            alt={product.name}
            className={styles.image}
            behavior="viewport"
            priority={priority}
            posterSrc={product.gallery?.[0]}
          />
        </div>
      </Link>
      <div className={styles.body}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{product.name}</h3>
          <Badge>{product.category}</Badge>
        </div>
        <p className={styles.desc}>{product.shortDescription}</p>
        <div className={styles.footer}>
          <div className={styles.price}>{formatPrice(product.price)}</div>
          <Button to={`/products/${product.id}`} variant="ghost" size="sm">
            View details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
