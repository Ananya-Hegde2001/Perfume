import { useEffect, useRef } from 'react'

function isVideoSource(src) {
  return typeof src === 'string' && src.toLowerCase().endsWith('.mp4')
}

/**
 * Renders either an <img> or <video>.
 * - behavior="hover": plays on hover/focus (good for grids)
 * - behavior="autoplay": plays immediately (good for detail/hero)
 */
export default function ProductMedia({ src, alt, className, behavior = 'hover' }) {
  const videoRef = useRef(null)

  const isVideo = isVideoSource(src)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!isVideo) return
    if (behavior !== 'viewport') return
    if (prefersReducedMotion) return

    const el = videoRef.current
    if (!el) return

    const play = async () => {
      try {
        await el.play()
      } catch {
        // Ignore autoplay/gesture errors.
      }
    }

    const pause = () => {
      el.pause()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          void play()
        } else {
          pause()
        }
      },
      { threshold: [0, 0.25, 0.45, 0.65, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [behavior, isVideo, prefersReducedMotion, src])

  const a11yProps = alt ? { 'aria-label': alt } : { 'aria-hidden': true }

  if (!isVideo) {
    return <img className={className} src={src} alt={alt} loading="lazy" />
  }

  const commonProps = {
    ref: videoRef,
    className,
    src,
    muted: true,
    loop: true,
    playsInline: true,
    preload: behavior === 'autoplay' ? 'auto' : 'metadata',
    ...a11yProps,
  }

  if (behavior === 'autoplay') {
    return <video {...commonProps} autoPlay />
  }

  async function play() {
    const el = videoRef.current
    if (!el) return
    if (prefersReducedMotion) return
    try {
      await el.play()
    } catch {
      // Ignore autoplay/gesture errors.
    }
  }

  function pause() {
    const el = videoRef.current
    if (!el) return
    el.pause()
  }

  return <video {...commonProps} onMouseEnter={play} onMouseLeave={pause} onFocus={play} onBlur={pause} />
}
