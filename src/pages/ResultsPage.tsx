import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ResultCase {
  id: number
  number: number
  title: string
  image: string
  category: string
}

export function ResultsPage() {
  const { t } = useTranslation()
  const [lightbox, setLightbox] = useState<string | null>(null)

  const cases: ResultCase[] = [
    {
      id: 26,
      number: 26,
      title: t('result_case_26'),
      image: '/images/results/sl-26.jpg',
      category: 'Радиочастотная абляция',
    },
    {
      id: 25,
      number: 25,
      title: t('result_case_25'),
      image: '/images/results/sl-25.jpg',
      category: 'Комплексное лечение',
    },
    {
      id: 24,
      number: 24,
      title: t('result_case_24'),
      image: '/images/results/sl-24.jpg',
      category: 'Радиочастотная абляция',
    },
    {
      id: 23,
      number: 23,
      title: t('result_case_23'),
      image: '/images/results/sl-23.jpg',
      category: 'Лазерная коагуляция',
    },
    {
      id: 22,
      number: 22,
      title: t('result_case_22'),
      image: '/images/results/sl-22.jpg',
      category: 'Радиочастотная абляция',
    },
    {
      id: 21,
      number: 21,
      title: t('result_case_21'),
      image: '/images/results/sl-21.jpg',
      category: 'Радиочастотная абляция',
    },
    {
      id: 20,
      number: 20,
      title: t('result_case_20'),
      image: '/images/results/sl-20.jpg',
      category: 'Радиочастотная абляция',
    },
    {
      id: 19,
      number: 19,
      title: t('result_case_19'),
      image: '/images/results/sl-19.jpg',
      category: 'Радиочастотная абляция',
    },
  ]

  return (
    <>
      <section className="section results-section">
        <div className="container">
          <div className="results-heading">
            <h1>{t('results_title')}</h1>
            <p className="lead">{t('results_subtitle')}</p>
          </div>

          <div className="results-grid">
            {cases.map((item) => (
              <div className="result-card" key={item.id}>
                <div
                  className="result-image"
                  onClick={() => setLightbox(item.image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(item.image)}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="result-overlay">
                    <span className="result-zoom">{t('results_zoom')}</span>
                  </div>
                </div>
                <div className="result-info">
                  <span className="result-category">{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label={t('close')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img src={lightbox} alt="" className="lightbox-img" />
        </div>
      )}
    </>
  )
}
