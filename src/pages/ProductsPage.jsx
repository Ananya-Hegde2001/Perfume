import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import Select from '../components/Select/Select'
import { getCategories, products } from '../data/products'
import styles from './ProductsPage.module.css'

export default function ProductsPage() {
  const categories = useMemo(() => getCategories(), [])

  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    const byCategory =
      category === 'all' ? products : products.filter((p) => p.category === category)

    if (sort === 'featured') return byCategory

    return [...byCategory].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      return b.price - a.price
    })
  }, [category, sort])

  return (
    <div className="container">
      <header className={styles.head}>
        <div className={styles.topRow}>
          <div>
            <div className="eyebrow">Collection</div>
            <h1 className={`h2 ${styles.title}`}>Perfumes</h1>
            <p className={styles.subtitle}>
              A focused collection designed for clarity and longevity. Every bottle is built around
              a defined structure: top, heart, base—no filler.
            </p>
          </div>
          <div className={styles.controls}>
            <Select
              label="Category"
              value={category}
              onChange={setCategory}
              options={[
                { value: 'all', label: 'All' },
                ...categories.map((c) => ({ value: c, label: c })),
              ]}
            />
            <Select
              label="Sort"
              value={sort}
              onChange={setSort}
              options={[
                { value: 'featured', label: 'Featured' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
              ]}
            />
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className="eyebrow">No results</div>
          <div className="prose">
            Try a different category, or switch sorting back to <strong>Featured</strong>.
          </div>
        </div>
      ) : (
        <section className={styles.grid} aria-label="Product grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  )
}
