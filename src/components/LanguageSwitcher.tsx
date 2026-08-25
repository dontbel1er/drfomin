import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={toggle}
      aria-label="Switch language"
    >
      {i18n.language === 'ru' ? 'EN' : 'RU'}
    </button>
  )
}
