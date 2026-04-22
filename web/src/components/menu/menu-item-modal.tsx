import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { MenuItem } from '../../types/menu'
import { MOTION } from '../../constants/motion'
import { UI_TEXT } from '../../constants/ui-text'
import { useI18n } from '../../i18n/i18n-context'
import { t } from '../../i18n/localized'
import { formatVnd } from '../../utils/money'

type Props = {
  item: MenuItem
  onClose: () => void
}

type Phase = 'entering' | 'entered' | 'exiting'

/**
 * Trả về danh sách ảnh hiển thị cho món, ưu tiên gallery nhiều ảnh.
 */
function getItemImageSources(item: MenuItem): string[] {
  if (item.imageSources?.length) return item.imageSources
  return item.imageSrc ? [item.imageSrc] : []
}

export function MenuItemModal({ item, onClose }: Props) {
  const { language } = useI18n()
  const titleId = useId()
  const cardRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const touchDeltaXRef = useRef<number>(0)
  const autoplayTimerRef = useRef<number | null>(null)
  const isAnimatingRef = useRef<boolean>(false)

  const [phase, setPhase] = useState<Phase>('entering')
  const [transform, setTransform] = useState<string>('translate3d(0, 10px, 0) scale(0.98)')
  const [opacity, setOpacity] = useState<number>(0)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [trackIndex, setTrackIndex] = useState<number>(0)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true)

  const durationMs = MOTION.modalDurationMs
  const easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
  const imageSources = useMemo(() => getItemImageSources(item), [item])
  const activeImageAlt = t(item.name, language)
  const slideTransitionMs = 500
  const hasPrice = typeof item.priceVnd === 'number'

  const hasCarousel = imageSources.length > 1
  const slides = useMemo(() => {
    if (!hasCarousel) return imageSources
    const first = imageSources[0]
    const last = imageSources[imageSources.length - 1]
    return [last, ...imageSources, first]
  }, [hasCarousel, imageSources])

  const clearAutoplayTimer = () => {
    if (autoplayTimerRef.current === null) return
    window.clearTimeout(autoplayTimerRef.current)
    autoplayTimerRef.current = null
  }

  const scheduleAutoplay = () => {
    clearAutoplayTimer()
    if (imageSources.length <= 1) return
    autoplayTimerRef.current = window.setTimeout(() => {
      // Nếu user đang chuyển ảnh (animation chưa kết thúc) thì dời lại để tránh đẩy trackIndex vượt biên.
      if (isAnimatingRef.current) {
        scheduleAutoplay()
        return
      }

      isAnimatingRef.current = true
      setIsTransitionEnabled(true)
      setTrackIndex((prev) => prev + 1)
      setActiveImageIndex((prev) => (prev + 1) % imageSources.length)
      // Tiếp tục auto-play cho lần kế tiếp.
      scheduleAutoplay()
    }, 2000)
  }

  const handleClose = () => {
    setPhase('exiting')
    window.setTimeout(onClose, durationMs)
  }

  const handlePreviousImage = () => {
    if (!imageSources.length) return
    if (hasCarousel) {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      setIsTransitionEnabled(true)
      setTrackIndex((prev) => prev - 1)
      setActiveImageIndex((prev) => (prev - 1 + imageSources.length) % imageSources.length)
      scheduleAutoplay()
      return
    }
    setActiveImageIndex(0)
  }

  const handleNextImage = () => {
    if (!imageSources.length) return
    if (hasCarousel) {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      setIsTransitionEnabled(true)
      setTrackIndex((prev) => prev + 1)
      setActiveImageIndex((prev) => (prev + 1) % imageSources.length)
      scheduleAutoplay()
      return
    }
    setActiveImageIndex(0)
  }

  /**
   * Vuốt ngang trên mobile để đổi ảnh (trái/phải).
   */
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t0 = e.touches[0]
    if (!t0) return
    touchStartRef.current = { x: t0.clientX, y: t0.clientY }
    touchDeltaXRef.current = 0
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const start = touchStartRef.current
    const t0 = e.touches[0]
    if (!start || !t0) return
    touchDeltaXRef.current = t0.clientX - start.x
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (imageSources.length <= 1) return
    const deltaX = touchDeltaXRef.current
    touchStartRef.current = null
    touchDeltaXRef.current = 0

    if (Math.abs(deltaX) < MOTION.carouselSwipeThresholdPx) return
    if (deltaX < 0) handleNextImage()
    else handlePreviousImage()
  }

  const overlayClassName = useMemo(() => {
    const base =
      'fixed inset-0 z-50 grid place-items-center px-4 py-8 md:px-8 md:py-10'
    return base
  }, [])

  const backdropClassName = useMemo(() => {
    const base = 'absolute inset-0 bg-black/30 transition-opacity'
    const opacity = phase === 'entering' ? 'opacity-0' : 'opacity-100'
    const exiting = phase === 'exiting' ? 'opacity-0' : opacity
    return `${base} ${exiting}`
  }, [phase])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    setTransform('translate3d(0, 10px, 0) scale(0.98)')
    setOpacity(0)

    const raf1 = window.requestAnimationFrame(() => {
      const raf2 = window.requestAnimationFrame(() => {
        setPhase('entered')
        setTransform('translate3d(0, 0, 0) scale(1)')
        setOpacity(1)
      })
      return () => window.cancelAnimationFrame(raf2)
    })

    return () => window.cancelAnimationFrame(raf1)
  }, [])

  useEffect(() => {
    if (phase !== 'exiting') return
    setTransform('translate3d(0, 10px, 0) scale(0.98)')
    setOpacity(0)
  }, [phase])

  useEffect(() => {
    setActiveImageIndex(0)
    setIsTransitionEnabled(false)
    setTrackIndex(imageSources.length > 1 ? 1 : 0)
    clearAutoplayTimer()
    isAnimatingRef.current = false
  }, [item.id])

  useEffect(() => {
    scheduleAutoplay()
    return () => clearAutoplayTimer()
  }, [imageSources.length])

  return (
    <div className={overlayClassName} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className={backdropClassName} onClick={handleClose} />

      <div
        ref={cardRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-(--zi-radius) border border-[rgb(var(--zi-line))] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]"
        style={{
          transform,
          transformOrigin: 'center',
          opacity,
          transition: `transform ${durationMs}ms ${easing}, opacity ${durationMs}ms ${easing}`,
        }}
      >
        <div className="relative overflow-hidden bg-[rgb(var(--zi-surface))]">
          {imageSources.length ? (
            <div className="aspect-video w-full">
              <div
                className="flex h-full w-full touch-pan-y ease-out"
                style={{
                  transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
                  transition: isTransitionEnabled ? `transform ${slideTransitionMs}ms ease-out` : 'none',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTransitionEnd={() => {
                  if (!hasCarousel) return
                  isAnimatingRef.current = false
                  if (trackIndex === 0) {
                    setIsTransitionEnabled(false)
                    setTrackIndex(imageSources.length)
                    return
                  }
                  if (trackIndex === imageSources.length + 1) {
                    setIsTransitionEnabled(false)
                    setTrackIndex(1)
                  }
                }}
              >
                {slides.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="h-full w-full shrink-0">
                    <img src={src} alt={activeImageAlt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full bg-[radial-gradient(900px_260px_at_20%_20%,rgba(var(--zi-accent)/0.18),transparent_55%),radial-gradient(900px_260px_at_80%_55%,rgba(var(--zi-accent)/0.10),transparent_50%)]" />
          )}

          {imageSources.length ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[rgb(var(--zi-line))] bg-white/90 px-3 py-2 text-sm text-[rgb(var(--zi-text))] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--zi-accent))]"
                onClick={handlePreviousImage}
                aria-label={t(UI_TEXT.previousImage, language)}
              >
                {'<'}
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[rgb(var(--zi-line))] bg-white/90 px-3 py-2 text-sm text-[rgb(var(--zi-text))] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--zi-accent))]"
                onClick={handleNextImage}
                aria-label={t(UI_TEXT.nextImage, language)}
              >
                {'>'}
              </button>

              <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[rgb(var(--zi-line))] bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-[rgb(var(--zi-text))]">
                {t(UI_TEXT.imagePosition, language)
                  .replace('{current}', String(activeImageIndex + 1))
                  .replace('{total}', String(imageSources.length))}
              </div>
            </>
          ) : null}
        </div>

        <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div id={titleId} className="zi-serif text-balance text-xl tracking-tight text-[rgb(var(--zi-text))]">
                {t(item.name, language)}
              </div>
              <p className="mt-2 text-sm leading-6 text-[rgb(var(--zi-muted))]">{t(item.description, language)}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full border border-[rgb(var(--zi-line))] bg-white px-3 py-2 text-sm text-[rgb(var(--zi-text))] hover:bg-[rgb(var(--zi-surface))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--zi-accent))]"
              onClick={handleClose}
            >
              {t(UI_TEXT.close, language)}
            </button>
          </div>

          {hasPrice ? (
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="text-sm font-medium tracking-[0.18em] text-[rgb(var(--zi-muted))] uppercase">
                {t(UI_TEXT.price, language)}
              </div>
              <div className="font-medium tracking-wide text-[rgb(var(--zi-text))]">
                {formatVnd(item.priceVnd)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

