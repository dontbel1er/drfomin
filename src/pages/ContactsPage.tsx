import { useTranslation } from 'react-i18next'
import { Map } from '../components/Map.tsx'

export function ContactsPage() {
  const { t } = useTranslation()

  return (
    <section className="section">
      <div className="container">
        <h2>{t('contacts_title')}</h2>

        <div className="contacts-layout">
          <div className="contacts-main">
            <div className="contacts-card">
              <h3>{t('contacts_address_label')}</h3>
              <p>
                {t('contacts_clinic')}<br />
                {t('contacts_address')}
              </p>
            </div>

            <div className="contacts-card">
              <h3>{t('contacts_phone_label')}</h3>
              <p>{t('contacts_messengers')}</p>
              <p><a href="tel:+79214062000">{t('contacts_phone')}</a></p>
            </div>

            <div className="contacts-card">
              <h3>{t('footer_hours')}</h3>
              <p>{t('footer_hours_weekdays')}</p>
              <p>{t('footer_hours_sat')}</p>
            </div>

            <div className="contacts-card">
              <h3>{t('contacts_email_label')}</h3>
              <p><a href="mailto:kn@doctorfomin.com">kn@doctorfomin.com</a></p>
            </div>
          </div>

          <div className="contacts-side">
            <div className="contacts-card">
              <h3>{t('contacts_map_title')}</h3>
              <Map />
            </div>

            <div className="contacts-card">
              <h3>{t('contacts_socials')}</h3>
              <div className="footer-socials">
                <a
                  href="https://vk.com/dr_fomin_kn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VK"
                  className="footer-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.673 4 8.233c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.472c0 .373.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@doctorfomin?si=_EuNZbACq8xY4fdn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="footer-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/dr.fominkn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
