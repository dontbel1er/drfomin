import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppointment } from '../contexts/AppointmentContext.tsx'
import './ServiceDetailModal.css'

export interface ServiceDetail {
  description: string
  fullDescription: string
  price: string
  duration?: string
  features: string[]
}

export function ServiceDetailModal({ serviceKey, isOpen, onClose, onBook }: {
  serviceKey: string
  isOpen: boolean
  onClose: () => void
  onBook: (service: string) => void
}) {
  const { t } = useTranslation()
  const detail = t(serviceKey, { returnObjects: true }) as unknown as ServiceDetail | undefined
  const serviceName = t(serviceKey.replace('service_detail_', 'service_'))

  if (!isOpen || !detail || !detail.fullDescription) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal service-detail-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>{serviceName}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t('services_modal_close')}
          >
            ×
          </button>
        </div>

        <div className="service-detail-content">
          <p className="service-detail-description">{detail.fullDescription}</p>

          {detail.duration && (
            <div className="service-detail-meta">
              <span className="service-detail-badge">{t('service_detail_duration')}: {detail.duration}</span>
            </div>
          )}

          <div className="service-detail-features">
            <h4>{t('service_detail_included')}</h4>
            <ul>
              {detail.features.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="service-detail-footer">
            <div className="service-detail-price">{detail.price}</div>
            <div className="service-detail-actions">
              <button type="button" className="btn btn-primary" onClick={() => { onClose(); onBook(serviceKey); }}>
                {t('service_detail_book')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function useServiceDetail() {
  const [detailKey, setDetailKey] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const { openWithService } = useAppointment()

  const openDetail = (key: string) => {
    setDetailKey(key)
    setDetailOpen(true)
  }

  const closeDetail = () => {
    setDetailOpen(false)
  }

  const bookFromDetail = (service: string) => {
    setDetailOpen(false)
    openWithService(service)
  }

  return {
    detailKey,
    detailOpen,
    openDetail,
    closeDetail,
    bookFromDetail,
  }
}
