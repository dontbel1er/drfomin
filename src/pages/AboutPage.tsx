import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface GalleryImage {
  thumb: string
  full: string
  alt: string
}

export function AboutPage() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const specs = [
    t('about_spec_1'),
    t('about_spec_2'),
    t('about_spec_3'),
    t('about_spec_4'),
    t('about_spec_5'),
    t('about_spec_6'),
  ]

  const memberships = [
    t('about_membership_1'),
    t('about_membership_2'),
    t('about_membership_3'),
    t('about_membership_4'),
    t('about_membership_5'),
  ]

  const education = [
    t('about_edu_1'),
    t('about_edu_2'),
    t('about_edu_3'),
    t('about_edu_4'),
    t('about_edu_5'),
    t('about_edu_6'),
  ]

  const science = [
    t('about_sci_1'),
    t('about_sci_2'),
    t('about_sci_3'),
    t('about_sci_4'),
    t('about_sci_5'),
    t('about_sci_6'),
    t('about_sci_7'),
    t('about_sci_8'),
  ]

  const certificates: GalleryImage[] = Array.from({ length: 21 }, (_, i) => ({
    thumb: `https://doctorfomin.com/wp-content/uploads/2020/03/setrificate${i + 1}-400x200.jpg`,
    full: `https://doctorfomin.com/wp-content/uploads/2020/03/setrificate${i + 1}.jpg`,
    alt: `${t('about_certs_title')} ${i + 1}`,
  }))

  const licenses: GalleryImage[] = Array.from({ length: 4 }, (_, i) => ({
    thumb: `https://doctorfomin.com/wp-content/uploads/license-2018-${i + 1}-400x200.jpg`,
    full: `https://doctorfomin.com/wp-content/uploads/license-2018-${i + 1}.jpg`,
    alt: `${t('about_license_title')} ${i + 1}`,
  }))

  const allImages = [...certificates, ...licenses]
  const lightboxOpen = lightboxIndex !== null
  const currentImg = lightboxOpen ? allImages[lightboxIndex] : null

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : allImages.length - 1)
  }, [lightboxIndex, allImages.length])

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex < allImages.length - 1 ? lightboxIndex + 1 : 0)
  }, [lightboxIndex, allImages.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, closeLightbox, goPrev, goNext])

  return (
    <>
      <section className="section">
        <div className="container">
          <h2>{t('about_title')}</h2>
          <div className="about-layout">
            <div className="about-main">
              <p className="lead">
                <strong>{t('about_name')}</strong> — {t('about_role')}
              </p>

              <h3>{t('about_spec_title')}</h3>
              <ul className="about-list">
                {specs.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>{t('about_membership_title')}</h3>
              <ul className="about-list">
                {memberships.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>{t('about_edu_title')}</h3>
              <ul className="about-list">
                {education.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3>{t('about_sci_title')}</h3>
              <ul className="about-list">
                {science.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certificates */}
          <h3 style={{ marginTop: '64px', marginBottom: '24px' }}>{t('about_certs_title')}</h3>
          <div className="certs-grid">
            {certificates.map((cert, i) => (
              <button
                key={i}
                type="button"
                className="cert-thumb"
                onClick={() => openLightbox(i)}
                aria-label={cert.alt}
              >
                <img src={cert.thumb} alt={cert.alt} loading="lazy" />
              </button>
            ))}
          </div>

          {/* Licenses — compact */}
          <div className="section-sep" style={{ margin: '48px 0' }} />
          <h3 style={{ marginTop: '0', marginBottom: '16px' }}>{t('about_license_title')}</h3>
          <div className="license-row">
            {licenses.map((lic, i) => {
              const globalIdx = certificates.length + i
              return (
                <button
                  key={i}
                  type="button"
                  className="license-thumb"
                  onClick={() => openLightbox(globalIdx)}
                  aria-label={lic.alt}
                >
                  <img src={lic.thumb} alt={lic.alt} loading="lazy" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox with navigation */}
      {lightboxOpen && currentImg && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label={t('modal_close')}
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={goPrev}
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            <img src={currentImg.full} alt={currentImg.alt} />
            <div className="lightbox-counter">
              {lightboxIndex! + 1} / {allImages.length}
            </div>
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--next"
            onClick={goNext}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
