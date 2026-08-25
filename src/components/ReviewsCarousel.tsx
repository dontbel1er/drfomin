import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface ReviewItem {
  name: string
  text: string
  image: string | null
}

export function ReviewsCarousel() {
  const { t } = useTranslation()
  const reviews = t('reviews_carousel', { returnObjects: true }) as unknown as ReviewItem[]
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.85
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="reviews-carousel">
      <button
        type="button"
        className="carousel-arrow carousel-arrow--left"
        onClick={() => scroll('left')}
        aria-label={t('reviews_prev')}
      >
        ‹
      </button>
      <div className="carousel-track" ref={trackRef}>
        {reviews.map((r, i) => (
          <div className="carousel-review-card" key={i}>
            {r.image ? (
              <div className="carousel-review-image">
                <img src={r.image} alt={r.name} loading="lazy" />
              </div>
            ) : (
              <div className="carousel-review-placeholder">
                <span>{t('reviews_no_image')}</span>
              </div>
            )}
            <p className="carousel-review-text">{r.text}</p>
            <p className="carousel-review-author">{r.name}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow carousel-arrow--right"
        onClick={() => scroll('right')}
        aria-label={t('reviews_next')}
      >
        ›
      </button>
    </div>
  )
}
