import { useTranslation } from 'react-i18next'
import { useAppointment } from '../contexts/AppointmentContext.tsx'

export function Hero() {
  const { t } = useTranslation()
  const { open } = useAppointment()

  return (
    <section className="hero">
      <div className="container">
        <h1>{t('hero_title')}</h1>
        <p className="lead">
          {t('hero_subtitle')}
        </p>
        <button type="button" className="btn btn-primary" onClick={open}>
          {t('nav_book')}
        </button>
      </div>
    </section>
  )
}
