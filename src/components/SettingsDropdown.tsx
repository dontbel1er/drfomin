import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface SettingsDropdownProps {
  inline?: boolean
}

interface MenuContentProps {
  lang: string
  setLang: (lang: 'ru' | 'en') => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  visionMode: boolean
  toggleVision: () => void
  t: (key: string) => string
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`toggle-switch ${checked ? 'toggle-switch--on' : ''} ${ready ? 'toggle-switch--ready' : ''}`}
    >
      <span className="toggle-switch__knob" />
    </button>
  )
}

function MenuContent({
  lang,
  setLang,
  theme,
  toggleTheme,
  visionMode,
  toggleVision,
  t,
}: {
  lang: string
  setLang: (lang: 'ru' | 'en') => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  visionMode: boolean
  toggleVision: () => void
  t: (key: string) => string
}) {
  return (
    <>
      <div className="settings-dropdown__row">
        <button
          type="button"
          className={"settings-dropdown__lang " + (lang === 'ru' ? 'active' : '')}
          onClick={() => setLang('ru')}
          role="menuitem"
        >
          RU
        </button>
        <span className="settings-dropdown__lang-sep">|</span>
        <button
          type="button"
          className={"settings-dropdown__lang " + (lang === 'en' ? 'active' : '')}
          onClick={() => setLang('en')}
          role="menuitem"
        >
          EN
        </button>
      </div>

      <div className="settings-dropdown__divider" />

      <div className="settings-dropdown__toggle">
        <span className="settings-dropdown__toggle-text">{t('settings_theme_dark')}</span>
        <ToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>

      <div className="settings-dropdown__toggle">
        <span className="settings-dropdown__toggle-text">{t('settings_vision')}</span>
        <ToggleSwitch checked={visionMode} onChange={toggleVision} />
      </div>
    </>
  )
}

export function SettingsDropdown({ inline = false }: SettingsDropdownProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(inline)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [visionMode, setVisionMode] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const lang = (i18n.resolvedLanguage || i18n.language || 'ru').startsWith('ru') ? 'ru' : 'en'

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        setTheme(savedTheme)
        if (savedTheme === 'dark') document.documentElement.classList.add('dark-theme')
      }
      if (localStorage.getItem('visionMode')) {
        setVisionMode(true)
        document.documentElement.classList.add('vision-mode')
      }
    } catch {}
  }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const setLang = (next: 'ru' | 'en') => {
    i18n.changeLanguage(next)
  }

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    const root = document.documentElement
    if (next === 'dark') root.classList.add('dark-theme')
    else root.classList.remove('dark-theme')
    try { localStorage.setItem('theme', next) } catch {}
  }

  const toggleVision = () => {
    const next = !visionMode
    setVisionMode(next)
    const root = document.documentElement
    if (next) root.classList.add('vision-mode')
    else root.classList.remove('vision-mode')
    try { localStorage.setItem('visionMode', next ? '1' : '') } catch {}
  }

  const menuProps: MenuContentProps = { lang, setLang, theme, toggleTheme, visionMode, toggleVision, t }

  return (
    <div className={"settings-dropdown" + (inline ? " settings-dropdown--inline" : "")} ref={dropdownRef}>
      {!inline && (
        <label className="settings-dropdown__popup">
          <input
            type="checkbox"
            checked={open}
            onChange={() => setOpen(prev => !prev)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={t('settings_label')}
          />
          <div className="settings-dropdown__burger" tabIndex={0}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="settings-dropdown__window">
            <div className="settings-dropdown__content">
              <MenuContent {...menuProps} />
            </div>
          </nav>
        </label>
      )}

      {inline && (
        <div className="mobile-settings" role="menu">
          <MenuContent {...menuProps} />
        </div>
      )}
    </div>
  )
}
