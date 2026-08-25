import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useAppointmentForm, type AppointmentFormData } from '../hooks/useAppointmentForm.ts'
import './AppointmentModal.css'

interface AppointmentModalProps {
  isOpen: boolean
  preselectedService?: string
  onClose: () => void
}

interface ServiceOption {
  key: string
  value: string
  group: string
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { key: 'service_primary', value: 'Первичный приём', group: 'modal_group_consult' },
  { key: 'service_repeat', value: 'Повторный приём', group: 'modal_group_consult' },
  { key: 'service_urgent', value: 'Срочный приём', group: 'modal_group_consult' },
  { key: 'service_postop', value: 'Осмотр после операции', group: 'modal_group_consult' },
  { key: 'service_miniphleb', value: 'Минифлебэктомия', group: 'modal_group_surgery' },
  { key: 'service_sclerotherapy', value: 'Склеротерапия', group: 'modal_group_surgery' },
  { key: 'service_evla', value: 'ЭВЛК', group: 'modal_group_surgery' },
  { key: 'service_bandage', value: 'Наложение венозного бандажа', group: 'modal_group_surgery' },
]

function getServiceValueByKey(key: string): string {
  const normalizedKey = key.replace('service_detail_', 'service_')
  const found = SERVICE_OPTIONS.find((s) => s.key === normalizedKey)
  return found ? found.value : key
}

async function createAppointment(data: AppointmentFormData) {
  const res = await fetch('http://localhost:3001/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Error')
  }
  return res.json()
}

export function AppointmentModal({ isOpen, preselectedService = '', onClose }: AppointmentModalProps) {
  const { t } = useTranslation()
  const {
    form,
    errors,
    occupiedSlots,
    fetchingSlots,
    timeSlots,
    isTimeBlocked,
    handleChange,
    validate,
    reset,
  } = useAppointmentForm()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [requestNumber, setRequestNumber] = useState('')

  const [showSms, setShowSms] = useState(false)
  const [smsDigits, setSmsDigits] = useState<string[]>(['', '', '', ''])
  const [smsError, setSmsError] = useState('')
  const [smsCountdown, setSmsCountdown] = useState(0)
  const [smsSuccessGlow, setSmsSuccessGlow] = useState(false)

  useEffect(() => {
    if (isOpen && preselectedService) {
      const value = getServiceValueByKey(preselectedService)
      handleChange('service', value)
    }
  }, [isOpen, preselectedService])

  useEffect(() => {
    if (smsCountdown <= 0) return
    const timer = setInterval(() => {
      setSmsCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [smsCountdown])

  if (!isOpen) return null

  const handleClose = () => {
    reset()
    setLoading(false)
    setSuccess(false)
    setServerError('')
    setShowSms(false)
    setSmsDigits(['', '', '', ''])
    setSmsError('')
    setSmsCountdown(0)
    setSmsSuccessGlow(false)
    setRequestNumber('')
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    if (!validate(t)) return
    setShowSms(true)
    setSmsCountdown(60)
  }

  const handleSmsVerify = async () => {
    await handleSmsVerifyWithCode(smsDigits)
  }

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const next = [...smsDigits]
    next[index] = digit
    setSmsDigits(next)
    if (smsError) setSmsError('')
    // Auto-verify when 4th digit entered
    if (index === 3) {
      // Focus is currently on this digit, after state update run verify
      setTimeout(() => handleSmsVerifyWithCode(next), 50)
      return
    }
    // Focus next
    const nextInput = document.getElementById(`sms-d-${index + 1}`) as HTMLInputElement | null
    if (nextInput) nextInput.focus()
  }

  const generateRequestNumber = () => {
    const prefix = 'BKS-'
    const random = Math.floor(100000 + Math.random() * 900000)
    return `${prefix}${random}`
  }

  const handleSmsVerifyWithCode = async (digits: string[]) => {
    const code = digits.join('')
    if (code.length !== 4) return
    setSmsError('')
    // Test mode: always valid — show green glow first
    setSmsSuccessGlow(true)
    await new Promise((r) => setTimeout(r, 900))
    setSmsSuccessGlow(false)
    setLoading(true)
    try {
      const order = generateRequestNumber()
      setRequestNumber(order)
      await createAppointment({ ...form, requestNumber: order })
      setSuccess(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t('modal_fail'))
    } finally {
      setLoading(false)
    }
  }

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (smsDigits[index]) {
        const next = [...smsDigits]
        next[index] = ''
        setSmsDigits(next)
      } else if (index > 0) {
        const prevInput = document.getElementById(`sms-d-${index - 1}`) as HTMLInputElement | null
        if (prevInput) {
          prevInput.focus()
          const next = [...smsDigits]
          next[index - 1] = ''
          setSmsDigits(next)
        }
      }
      if (smsError) setSmsError('')
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!text) return
    const next = text.split('').concat(Array(4).fill('')).slice(0, 4)
    setSmsDigits(next)
    // Focus last filled or next empty
    const focusIndex = Math.min(text.length, 3)
    const el = document.getElementById(`sms-d-${focusIndex}`) as HTMLInputElement | null
    if (el) el.focus()
  }

  const selectTime = (slot: string) => {
    handleChange('time', slot)
  }

  const consultServices = SERVICE_OPTIONS.filter((s) => s.group === 'modal_group_consult')
  const surgeryServices = SERVICE_OPTIONS.filter((s) => s.group === 'modal_group_surgery')

  return (
    <>
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="modal" role="dialog" aria-modal="true">
        {!success && (
          <div className="modal-header">
            <h3>{t('modal_title')}</h3>
            <button
              type="button"
              className="modal-close"
              onClick={handleClose}
              aria-label={t('modal_close')}
            >
              ×
            </button>
          </div>
        )}

        {success ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h4>{t('modal_success_title')}</h4>
            <div className="success-details">
              <div className="success-detail-row">
                <span className="success-detail-label">{t('modal_success_date')}</span>
                <span className="success-detail-value">{form.date}</span>
              </div>
              <div className="success-detail-row">
                <span className="success-detail-label">{t('modal_success_time')}</span>
                <span className="success-detail-value">{form.time}</span>
              </div>
              {form.service && (
                <div className="success-detail-row">
                  <span className="success-detail-label">{t('modal_success_service')}</span>
                  <span className="success-detail-value">{form.service}</span>
                </div>
              )}
              {requestNumber && (
                <div className="success-detail-row">
                  <span className="success-detail-label">{t('modal_success_order')}</span>
                  <span className="success-detail-value">{requestNumber}</span>
                </div>
              )}
            </div>
          </div>
        ) : showSms ? (
          <div className="modal-form">
            <div className="form-group">
              <h4 style={{ margin: '0 0 8px', fontFamily: "'Raleway', Arial, sans-serif", fontSize: '16px', fontWeight: 600 }}>
                {t('sms_title')}
              </h4>
              <p className="caption" style={{ margin: '0 0 16px' }}>
                {t('sms_info', { phone: form.phone })}
              </p>
              <label style={{ marginBottom: '8px', display: 'block' }}>{t('sms_label')}</label>
              <div className="sms-digits-row">
                {smsDigits.map((digit, i) => (
                  <input
                    key={i}
                    id={`sms-d-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleDigitKeyDown(i, e)}
                    onPaste={handlePaste}
                    disabled={loading}
                    autoFocus={i === 0}
                    className={`sms-digit ${smsSuccessGlow ? 'sms-digit--success' : ''} ${smsError ? 'sms-digit--error' : ''}`}
                  />
                ))}
              </div>
              {smsError && <span className="error-text">{smsError}</span>}
            </div>

            {serverError && (
              <div className="server-error">{serverError}</div>
            )}

            <button
              type="button"
              className="btn btn-primary modal-submit"
              onClick={handleSmsVerify}
              disabled={loading}
            >
              {loading ? t('modal_loading') : t('sms_button_verify')}
            </button>

            {smsCountdown > 0 ? (
              <span className="caption" style={{ textAlign: 'center', marginTop: '8px' }}>
                {t('sms_countdown', { seconds: smsCountdown })}
              </span>
            ) : (
              <button
                type="button"
                className="sms-resend-btn"
                onClick={() => setSmsCountdown(60)}
                disabled={loading}
              >
                {t('sms_button_resend')}
              </button>
            )}
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">{t('modal_name')} *</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={t('modal_name')}
                className={errors.name ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('modal_phone')} *</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+79991234567"
                className={errors.phone ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('modal_email')} *</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="example@email.com"
                className={errors.email ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">{t('modal_date')} *</label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={errors.date ? 'input-error' : ''}
                disabled={loading}
              />
              {fetchingSlots && <span className="caption">{t('modal_loading_slots')}</span>}
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label>{t('modal_time')} *</label>
              {!form.date ? (
                <span className="caption">{t('modal_select_date_first')}</span>
              ) : (
                <div className="time-slots">
                  {timeSlots.map((slot) => {
                    const blocked = isTimeBlocked(slot, occupiedSlots)
                    const selected = form.time === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={`time-slot ${selected ? 'selected' : ''} ${blocked ? 'blocked' : ''}`}
                        onClick={() => !blocked && selectTime(slot)}
                        disabled={blocked || loading}
                        title={blocked ? t('modal_occupied') : ''}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              )}
              {errors.time && <span className="error-text">{errors.time}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="service">{t('modal_service')}</label>
              <select
                id="service"
                value={form.service}
                onChange={(e) => handleChange('service', e.target.value)}
                disabled={loading}
              >
                <option value="">{t('modal_service_none')}</option>
                <optgroup label={t('modal_group_consult')}>
                  {consultServices.map((s) => (
                    <option key={s.key} value={s.value}>{t(s.key)}</option>
                  ))}
                </optgroup>
                <optgroup label={t('modal_group_surgery')}>
                  {surgeryServices.map((s) => (
                    <option key={s.key} value={s.value}>{t(s.key)}</option>
                  ))}
                </optgroup>
              </select>
            </div>

        {serverError && (
          <div className="server-error">{serverError}</div>
        )}

        <div className="form-group">
          <div className="consent-row">
            <label htmlFor="consent-check" className="consent-toggle">
              <input
                id="consent-check"
                type="checkbox"
                className="consent-native"
                checked={form.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                disabled={loading}
              />
              <span className="consent-box" aria-hidden="true">
                {form.consent && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            </label>
            <span className="consent-caption">
              {t('modal_consent_text')}{' '}
              <a href="#" className="consent-policy" onClick={(e) => e.preventDefault()}>
                {t('modal_consent_link')}
              </a>
            </span>
          </div>
          {errors.consent && <span className="consent-policy-error">{errors.consent}</span>}
        </div>

        <button type="submit" className="btn btn-primary modal-submit" disabled={loading}>
          {loading ? t('modal_loading') : t('modal_submit')}
        </button>
          </form>
        )}
      </div>
    </>
  )
}
