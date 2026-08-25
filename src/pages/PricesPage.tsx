import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PriceItem {
  name: string
  price: string
}

interface PriceCategory {
  cat: string
  items: PriceItem[]
}

export function PricesPage() {
  const { t } = useTranslation()
  const prices = t('prices', { returnObjects: true }) as unknown as PriceCategory[]
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
        <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>{t('prices_title')}</h2>

        <div className="price-accordion">
          {prices.map((category, idx) => (
            <div
              className={`price-accordion-item ${openSet.has(idx) ? 'open' : ''}`}
              key={idx}
            >
              <button
                type="button"
                className="price-accordion-header"
                onClick={() => toggle(idx)}
              >
                {t(category.cat)}
              </button>
              <div className="price-accordion-body">
                <div className="price-accordion-inner">
                  <table>
                    <tbody>
                      {category.items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td className="price">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
