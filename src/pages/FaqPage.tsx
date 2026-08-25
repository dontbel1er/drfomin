import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FaqItem {
  q: string
  a: string
}

export function FaqPage() {
  const { t } = useTranslation()
  const faqs = t('faq', { returnObjects: true }) as unknown as FaqItem[]
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>{t('faq_title')}</h2>

        <div className="faq-accordion">
          {faqs.map((item, idx) => (
            <div
              className={`faq-item ${openSet.has(idx) ? 'open' : ''}`}
              key={idx}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(idx)}
              >
                {item.q}
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
