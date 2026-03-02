import styles from './Select.module.css'

export default function Select({ label, value, onChange, options, className }) {
  return (
    <label className={`${styles.wrap} ${className ?? ''}`}>
      <span className={styles.label}>{label}</span>
      <select
        className={`${styles.select} focusRing`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
