import { memo, useEffect, useMemo, useRef } from 'react'

function isVideoSource(src) {
  return typeof src === 'string' && src.toLowerCase().endsWith('.mp4')
}

function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  if (!window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const VIDEO_POSTER_SVG =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20160%20200'%3E%3Crect%20width='160'%20height='200'%20fill='%230c0c0f'%20fill-opacity='0.04'/%3E%3Cg%20fill='none'%20stroke='%230c0c0f'%20stroke-opacity='0.22'%20stroke-width='6'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpath%20d='M70%2040h20v22H70z'/%3E%3Cpath%20d='M58%2062h44v18H58z'/%3E%3Cpath%20d='M48%2080h64v96a18%2018%200%2001-18%2018H66a18%2018%200%2001-18-18V80z'/%3E%3C/g%3E%3Ctext%20x='80'%20y='150'%20text-anchor='middle'%20font-family='system-ui,%20-apple-system,%20Segoe%20UI,%20Roboto,%20Arial'%20font-size='44'%20fill='%230c0c0f'%20fill-opacity='0.22'%3EN%3C/text%3E%3C/svg%3E"

/**
 * Renders either an <img> or <video>.
 * - behavior="hover": plays on hover/focus (good for grids)
 * - behavior="autoplay": plays immediately (good for detail/hero)
 * - posterSrc: optional poster image for videos (shows instantly while MP4 loads)
 */
function ProductMedia({ src, alt, className, behavior = 'hover', priority = false, posterSrc }) {
  const videoRef = useRef(null)

  const isVideo = useMemo(() => isVideoSource(src), [src])
  const prefersReducedMotion = useMemo(() => getPrefersReducedMotion(), [])

  useEffect(() => {
    if (!isVideo) return
    if (prefersReducedMotion) return

    const el = videoRef.current
    if (!el) return

    // For hero/detail media, warm up immediately so it feels instant.
    if (behavior === 'autoplay' || priority) {
      try {
        // priority media should get its first frame ASAP.
        el.preload = behavior === 'autoplay' ? 'auto' : 'metadata'
        el.load()
      } catch {
        // Ignore load/preload errors.
      }

      const playNow = async () => {
        try {
          await el.play()
        } catch {
          // Ignore autoplay/gesture errors.
        }
      }

      // Ensure the element is mounted before attempting play.
      if (behavior === 'autoplay') {
        const raf = requestAnimationFrame(() => {
          void playNow()
        })
        return () => cancelAnimationFrame(raf)
      }
    }

    if (behavior !== 'viewport') return

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
        // Start loading slightly before the video is actually visible.
        if (entry.isIntersecting) {
          try {
            if (el.preload === 'none') {
              el.preload = 'metadata'
              el.load()
            }
          } catch {
            // Ignore load/preload errors.
          }
        }

        // Play once it's reasonably visible.
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          void play()
        } else {
          pause()
        }
      },
      // rootMargin lets us begin fetching a bit early for smoother scroll-in.
      { rootMargin: '240px 0px', threshold: [0, 0.2, 0.45, 0.65, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [behavior, isVideo, prefersReducedMotion, priority, src])

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
    poster: posterSrc || VIDEO_POSTER_SVG,
    // For grids, avoid fetching every MP4 up-front.
    preload:
      behavior === 'autoplay'
        ? 'auto'
        : behavior === 'viewport'
          ? priority
            ? 'metadata'
            : 'none'
          : 'metadata',
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
