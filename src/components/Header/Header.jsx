import { Link, NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={`${styles.brand} focusRing`} aria-label="Nocturne Atelier home">
          <span className={styles.brandName}>Nocturne Atelier</span>
          <span className={styles.brandTag}>Perfume House</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.link} focusRing${isActive ? ' ' + styles.active : ''}`
            }
          >
            Collection
          </NavLink>
          <Button to="/products" variant="secondary" size="sm">
            View perfumes
          </Button>
        </nav>
      </div>
    </header>
  )
}
