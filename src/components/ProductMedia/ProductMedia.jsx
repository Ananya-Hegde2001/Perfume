import { memo, useEffect, useMemo, useRef } from 'react'

function isVideoSource(src) {
  return typeof src === 'string' && src.toLowerCase().endsWith('.mp4')
}

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  if (!window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Renders either an <img> or <video>.
 * - behavior="hover": plays on hover/focus (good for grids)
 * - behavior="autoplay": plays immediately (good for detail/hero)
 */
function ProductMedia({ src, alt, className, behavior = 'hover' }) {
  const videoRef = useRef(null)

  const isVideo = useMemo(() => isVideoSource(src), [src])
  const prefersReducedMotion = useMemo(() => getPrefersReducedMotion(), [])

  useEffect(() => {
    if (!isVideo) return
    if (behavior !== 'viewport') return
    if (prefersReducedMotion) return

    const el = videoRef.current
    if (!el) return

    const play = async () => {
      try {
        // In viewport mode, avoid preloading every MP4 on the page.
        // Load only when the element is near/inside the viewport.
        if (el.preload !== 'auto') {
          el.preload = 'auto'
          el.load()
        }
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
    const loading = behavior === 'autoplay' ? 'eager' : 'lazy'
    const fetchPriority = behavior === 'autoplay' ? 'high' : 'auto'
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  const commonProps = {
    ref: videoRef,
    className,
    src,
    muted: true,
    loop: true,
    playsInline: true,
    // For grids, avoid fetching every MP4 up-front.
    preload: behavior === 'autoplay' ? 'auto' : behavior === 'viewport' ? 'none' : 'metadata',
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

export default memo(ProductMedia)
