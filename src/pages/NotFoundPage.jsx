import Button from '../components/Button/Button'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className="eyebrow">404</div>
        <h1 className="h2">Page not found</h1>
        <p className="prose">
          The page you’re looking for doesn’t exist. Use the collection to get back on track.
        </p>
        <div>
          <Button to="/products" variant="primary">
            Browse perfumes
          </Button>
        </div>
      </div>
    </div>
  )
}
