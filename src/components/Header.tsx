import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useAppointment } from '../contexts/AppointmentContext.tsx'
import { SettingsDropdown } from './SettingsDropdown.tsx'

export function Header() {
  const { t } = useTranslation()
  const { open } = useAppointment()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/services', label: t('nav_services') },
    { to: '/prices', label: t('nav_prices') },
    { to: '/about', label: t('nav_about') },
    { to: '/results', label: t('nav_results') },
    { to: '/reviews', label: t('nav_reviews') },
    { to: '/faq', label: t('nav_faq') },
    { to: '/contacts', label: t('nav_contacts') },
  ]

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMobile}>
          Doctor<span>Fomin</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <ul className="nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="btn btn-primary"
                onClick={open}
              >
                {t('nav_book')}
              </button>
            </li>
            <li>
              <SettingsDropdown />
            </li>
          </ul>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          className="mobile-burger"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={closeMobile}>
          <div className="mobile-menu__content" onClick={(e) => e.stopPropagation()}>
            <SettingsDropdown inline />
            <nav className="mobile-menu__nav">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="mobile-menu__link"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu__actions">
              <button
                type="button"
                className="btn btn-primary mobile-menu__cta"
                onClick={() => {
                  closeMobile()
                  open()
                }}
              >
                {t('nav_book')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
