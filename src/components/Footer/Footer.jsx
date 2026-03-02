import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>Nocturne Atelier</div>
        <div className={styles.meta}>
          Small-batch perfumes focused on modern materials, quiet sillage, and precise structure.
        </div>
      </div>
    </footer>
  )
}
