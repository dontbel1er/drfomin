import { useTranslation } from 'react-i18next'
import { useAppointment } from '../contexts/AppointmentContext.tsx'
import { ServiceDetailModal, useServiceDetail } from './ServiceDetailModal.tsx'

export function Services() {
  const { t } = useTranslation()
  const { openWithService } = useAppointment()
  const { detailKey, detailOpen, openDetail, closeDetail, bookFromDetail } = useServiceDetail()

  const categories = [
    {
      titleKey: 'services_cat_consult',
      detailKeys: ['service_detail_primary', 'service_detail_repeat', 'service_detail_urgent', 'service_detail_postop'],
    },
    {
      titleKey: 'services_cat_surgery',
      detailKeys: ['service_detail_miniphleb', 'service_detail_sclerotherapy', 'service_detail_evla'],
    },
    {
      titleKey: 'services_cat_other',
      detailKeys: ['service_detail_bandage', 'service_detail_homevisit'],
    },
  ]

  const getServiceNameKey = (detailKey: string) => detailKey.replace('service_detail_', 'service_')

  return (
    <>
      <section id="services" className="section">
        <div className="container">
          <div className="services-heading">
            <h2>{t('services_heading')}</h2>
            <p className="lead" style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              {t('services_lead')}
            </p>
          </div>

          {categories.map((cat) => (
            <div className="services-category" key={cat.titleKey}>
              <h3 className="services-category-title">{t(cat.titleKey)}</h3>
              <div className="services-grid">
                {cat.detailKeys.map((dk) => {
                  const serviceKey = getServiceNameKey(dk)
                  return (
                    <div
                      className="service-card"
                      key={dk}
                      onClick={() => openDetail(dk)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openDetail(dk)
                        }
                      }}
                      aria-label={t(serviceKey)}
                    >
                      <h3>{t(serviceKey)}</h3>
                      <p>{t(serviceKey + '_desc')}</p>
                      <div className="service-card-price">{t(serviceKey + '_price')}</div>
                      <div className="service-card-actions" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="btn btn-text-link" onClick={() => openDetail(dk)}>
                          {t('services_details')}
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => openWithService(dk)}>
                          {t('services_book')}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServiceDetailModal
        serviceKey={detailKey}
        isOpen={detailOpen}
        onClose={closeDetail}
        onBook={bookFromDetail}
      />
    </>
  )
}
