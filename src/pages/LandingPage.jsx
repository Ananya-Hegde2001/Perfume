import Button from '../components/Button/Button'
import FeaturedProductCard from '../components/FeaturedProductCard/FeaturedProductCard'
import ProductMedia from '../components/ProductMedia/ProductMedia'
import { featuredProducts } from '../data/products'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const heroProduct = featuredProducts[0]

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCard}>
              <div className="eyebrow">Nocturne Atelier</div>
              <h1 className="h1">Perfume, composed like architecture.</h1>
              <p className={styles.tagline}>
                A small-batch perfume house built around modern resins, polished woods, and florals
                cut with precision. Designed for quiet sillage—close, elegant, unforgettable.
              </p>
              <div className={styles.ctaRow}>
                <Button to="/products" variant="primary">
                  Explore the collection
                </Button>
                <Button to={`/products/${heroProduct.id}`} variant="secondary">
                  View featured scent
                </Button>
              </div>
            </div>

            <div className={styles.heroMedia} aria-hidden>
              <ProductMedia
                src={heroProduct.image}
                alt=""
                className={styles.heroImage}
                behavior="autoplay"
                priority
                posterSrc={heroProduct.gallery?.[0]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <div className="eyebrow">House Notes</div>
              <h2 className="h2">Modern materials, deliberate structure.</h2>
            </div>
          </div>
          <div className={`prose ${styles.intro}`}>
            Nocturne Atelier is built around a simple idea: luxury is restraint. Each formula is
            calibrated for clarity—no syrup, no noise—so every note reads like a clean line in a
            sketchbook.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <div className="eyebrow">Featured</div>
              <h2 className="h2">A curated trio, dressed differently.</h2>
            </div>
            <Button to="/products" variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className={styles.grid}>
            {featuredProducts.slice(0, 3).map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
