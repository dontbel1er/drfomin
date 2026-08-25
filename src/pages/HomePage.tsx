import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppointment } from '../contexts/AppointmentContext.tsx'
import { ReviewsCarousel } from '../components/ReviewsCarousel.tsx'
import { ServiceDetailModal, useServiceDetail } from '../components/ServiceDetailModal.tsx'

export function HomePage() {
  const { t } = useTranslation()
  const { open, openWithService } = useAppointment()
  const { detailKey, detailOpen, openDetail, closeDetail, bookFromDetail } = useServiceDetail()

  const popularServiceKeys = [
    'service_detail_primary',
    'service_detail_evla',
    'service_detail_sclerotherapy',
    'service_detail_miniphleb',
    'service_detail_homevisit',
    'service_detail_urgent',
  ]

  const steps = t('process_steps', { returnObjects: true }) as Array<{ title: string; text: string }>
  const advantages = t('home_advantages_list', { returnObjects: true }) as string[]
  const services = t('home_services_list', { returnObjects: true }) as Array<{ title: string; desc: string; price: string }>

  return (
    <>
      {/* 1. Hero */}
      <section className="hero-banner hero-banner--doctor">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>{t('hero_title')}</h1>
              <p className="hero-subtitle">{t('hero_subtitle')}</p>
              <button type="button" className="btn btn-primary btn-large" onClick={open}>
                {t('hero_cta')}
              </button>
              <div className="hero-badges">
                <div className="hero-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {t('hero_badge_exp')}
                </div>
                <div className="hero-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {t('hero_badge_patients')}
                </div>
                <div className="hero-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                  </svg>
                  {t('hero_badge_science')}
                </div>
              </div>
            </div>
            <div className="hero-photo">
              <img src="/Fomin_Kirill_photo.jpg" alt={t('hero_photo_alt')} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Process */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">{t('process_title')}</h2>
          <p className="section-subtitle">{t('process_heading')}</p>
          <div className="process-grid">
            {steps.map((step, i) => (
              <div className="process-card" key={i}>
                <div className="process-number">{String(i + 1).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Advantages */}
      <section className="section advantages-section">
        <div className="container">
          <h2 className="section-title">{t('home_advantages_title')}</h2>
          <div className="advantages-grid">
            {advantages.map((a, i) => (
              <div className="advantage-card" key={i}>
                <div className="advantage-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About */}
      <section className="section about-section">
        <div className="container">
          <div className="about-text-only">
            <h2>{t('home_about_title')}</h2>
            <p>{t('home_about_text')}</p>
            <Link to="/about" className="btn btn-primary">
              {t('home_about_button')}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Popular Services */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">{t('home_services_title')}</h2>
          <div className="services-grid">
            {services.map((s, i) => {
              const detailKey = popularServiceKeys[i]
              return (
                <div
                  className="service-card"
                  key={i}
                  onClick={() => openDetail(detailKey)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openDetail(detailKey)
                    }
                  }}
                  aria-label={s.title}
                >
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="service-price">{s.price}</span>
                  <div className="service-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn btn-text-link" onClick={() => openDetail(detailKey)}>
                      {t('services_details')}
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => openWithService(detailKey)}>
                      {t('services_book')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/services" className="btn btn-primary">
              {t('home_services_button')}
            </Link>
          </div>
        </div>
      </section>

      <ServiceDetailModal
        serviceKey={detailKey}
        isOpen={detailOpen}
        onClose={closeDetail}
        onBook={bookFromDetail}
      />

      {/* 6. Reviews */}
      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title">{t('home_reviews_title')}</h2>
          <ReviewsCarousel />
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/reviews" className="btn btn-primary">
              {t('home_reviews_button')}
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
