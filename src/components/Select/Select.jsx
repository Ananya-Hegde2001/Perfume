import { useEffect, useId, useMemo, useRef, useState } from 'react'
import styles from './Select.module.css'

export default function Select({ label, value, onChange, options, className }) {
  const reactId = useId()
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  const labelId = `select-${reactId}-label`
  const valueId = `select-${reactId}-value`
  const listboxId = `select-${reactId}-listbox`

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? options[0],
    [options, value],
  )

  const selectedIndex = useMemo(() => {
    const idx = options.findIndex((o) => o.value === value)
    return idx >= 0 ? idx : 0
  }, [options, value])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e) => {
      if (!rootRef.current) return
      if (rootRef.current.contains(e.target)) return
      setOpen(false)
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('touchstart', handlePointerDown, { passive: true })
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('touchstart', handlePointerDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    menuRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    if (activeIndex < 0) return
    const el = rootRef.current?.querySelector(`[data-option-index="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  const commit = (nextValue) => {
    onChange(nextValue)
    setOpen(false)
    queueMicrotask(() => buttonRef.current?.focus())
  }

  const moveActive = (delta) => {
    if (options.length === 0) return
    setActiveIndex((idx) => {
      const start = idx >= 0 ? idx : 0
      return (start + delta + options.length) % options.length
    })
  }

  const openMenu = (nextActiveIndex = selectedIndex) => {
    setActiveIndex(nextActiveIndex)
    setOpen(true)
  }

  const onButtonKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) {
        openMenu((selectedIndex + 1) % Math.max(options.length, 1))
        return
      }
      moveActive(1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        const len = Math.max(options.length, 1)
        openMenu((selectedIndex - 1 + len) % len)
        return
      }
      moveActive(-1)
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((v) => {
        const next = !v
        if (next) setActiveIndex(selectedIndex)
        return next
      })
    }
    if (e.key === 'Escape') {
      if (!open) return
      e.preventDefault()
      setOpen(false)
    }
  }

  const onMenuKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveActive(1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveActive(-1)
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setActiveIndex(0)
    }
    if (e.key === 'End') {
      e.preventDefault()
      setActiveIndex(options.length - 1)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[activeIndex]
      if (opt) commit(opt.value)
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      queueMicrotask(() => buttonRef.current?.focus())
    }
    if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={`${styles.wrap} ${className ?? ''}`}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        className={`${styles.trigger} focusRing`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={() =>
          setOpen((v) => {
            const next = !v
            if (next) setActiveIndex(selectedIndex)
            return next
          })
        }
        onKeyDown={onButtonKeyDown}
      >
        <span id={valueId} className={styles.value}>
          {selected?.label ?? ''}
        </span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={listboxId}
          className={styles.menu}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value
            const isActive = idx === activeIndex

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isActive ? styles.optionActive : ''} ${
                  isSelected ? styles.optionSelected : ''
                }`}
                data-option-index={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(opt.value)}
              >
                {opt.label}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
