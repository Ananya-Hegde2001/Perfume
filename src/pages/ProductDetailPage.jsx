import { Link, useParams } from 'react-router-dom'
import Badge from '../components/Badge/Badge'
import Button from '../components/Button/Button'
import ProductMedia from '../components/ProductMedia/ProductMedia'
import { getProductById } from '../data/products'
import { formatPrice } from '../utils/format'
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.backRow}>
            <Link to="/products" className={`${styles.backLink} focusRing`}>
              Back to collection
            </Link>
          </div>

          <div className={styles.error}>
            <div className="eyebrow">Not found</div>
            <h1 className="h2">That product doesn’t exist.</h1>
            <p className="prose">
              The link may be incorrect or the item may have been removed from the showcase.
            </p>
            <div className={styles.errorCta}>
              <Button to="/products" variant="primary">
                Browse perfumes
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.backRow}>
          <Link to="/products" className={`${styles.backLink} focusRing`}>
            Back to collection
          </Link>
          <Badge>{product.category}</Badge>
        </div>

        <section className={styles.grid} aria-label="Product detail">
          <div className={styles.media}>
            <ProductMedia src={product.image} alt={product.name} className={styles.image} behavior="autoplay" />
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.short}>{product.shortDescription}</p>

            <div className={styles.priceRow}>
              <div className={styles.price}>{formatPrice(product.price)}</div>
              <Button to="/products" variant="secondary" size="sm">
                Continue browsing
              </Button>
            </div>

            <div className="divider" />

            <div className="prose">{product.fullDescription}</div>

            <div className={styles.specs} aria-label="Specifications">
              <div className={styles.specsHead}>
                <div>
                  <div className="eyebrow">Complete Specs</div>
                  <div className={styles.specsTitle}>Notes & wear</div>
                </div>
                <Badge>{product.specs.sizeMl}ml</Badge>
              </div>
              <div className={styles.specsBody}>
                <div className={styles.kvGrid}>
                  <div className={styles.kv}>
                    <div className={styles.k}>Longevity</div>
                    <div className={styles.v}>{product.specs.longevity}</div>
                  </div>
                  <div className={styles.kv}>
                    <div className={styles.k}>Occasion</div>
                    <div className={styles.v}>{product.specs.occasion}</div>
                  </div>
                  <div className={styles.kv}>
                    <div className={styles.k}>Size</div>
                    <div className={styles.v}>{product.specs.sizeMl}ml spray</div>
                  </div>
                </div>

                <div className={styles.notes}>
                  <div>
                    <div className={styles.noteTitle}>Top notes</div>
                    <ul className={styles.noteList}>
                      {product.specs.fragranceNotes.top.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className={styles.noteTitle}>Heart notes</div>
                    <ul className={styles.noteList}>
                      {product.specs.fragranceNotes.heart.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className={styles.noteTitle}>Base notes</div>
                    <ul className={styles.noteList}>
                      {product.specs.fragranceNotes.base.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
