import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const resolvedClassName = cx(
    styles.button,
    styles[variant],
    styles[size],
    'focusRing',
    className,
  )

  if (typeof to === 'string') {
    // `type` is not a valid attribute for links
    const { type, ...linkRest } = rest
    void type
    return (
      <Link to={to} className={resolvedClassName} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={resolvedClassName} type={rest.type ?? 'button'} {...rest}>
      {children}
    </button>
  )
}
