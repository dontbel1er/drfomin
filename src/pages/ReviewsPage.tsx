import { useTranslation } from 'react-i18next'

interface Review {
  name: string
  age: string
  text: string
  image: string | null
}

export function ReviewsPage() {
  const { t } = useTranslation()
  const reviews = t('reviews', { returnObjects: true }) as unknown as Review[]

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '64px' }}>{t('reviews_title')}</h2>

        <div className="reviews-list">
          {reviews.map((r, i) => {
            const isEven = i % 2 === 0
            return (
              <div className={`review-card review-card--${isEven ? 'left' : 'right'}`} key={i}>
                <div className="review-card__grid">
                  {isEven ? (
                    <>
                      <div className="review-card__media">
                        {r.image ? (
                          <img src={r.image} alt={r.name} loading="lazy" />
                        ) : (
                          <div className="review-card__placeholder" />
                        )}
                      </div>
                      <div className="review-card__content">
                        <h3>
                          {r.name}, {r.age}
                        </h3>
                        <div className="review-card__sep" />
                        <p className="review-text">{r.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="review-card__content">
                        <h3>
                          {r.name}, {r.age}
                        </h3>
                        <div className="review-card__sep" />
                        <p className="review-text">{r.text}</p>
                      </div>
                      <div className="review-card__media">
                        {r.image ? (
                          <img src={r.image} alt={r.name} loading="lazy" />
                        ) : (
                          <div className="review-card__placeholder" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
