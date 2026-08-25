import { useState, useCallback } from 'react'

export interface AppointmentFormData {
  name: string
  phone: string
  email: string
  date: string
  time: string
  service: string
  requestNumber?: string
  consent: boolean
}

const PHONE_REGEX = /^(\+7|8)\d{10}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) =>
  `${String(i + 9).padStart(2, '0')}:00`
)

export function useAppointmentForm() {
  const [form, setForm] = useState<AppointmentFormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    consent: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({})
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([])
  const [fetchingSlots, setFetchingSlots] = useState(false)

  const isTimeBlocked = useCallback((selectedTime: string, occupied: string[]): boolean => {
    const [h, m] = selectedTime.split(':').map(Number)
    const selectedMinutes = h * 60 + m

    for (const slot of occupied) {
      const [sh, sm] = slot.split(':').map(Number)
      const slotMinutes = sh * 60 + sm
      if (Math.abs(selectedMinutes - slotMinutes) < 60) {
        return true
      }
    }
    return false
  }, [])

  const fetchOccupied = useCallback(async (date: string) => {
    if (!date) {
      setOccupiedSlots([])
      return
    }
    setFetchingSlots(true)
    try {
      const res = await fetch(`http://localhost:3001/api/appointments/occupied?date=${date}`)
      if (res.ok) {
        const slots: string[] = await res.json()
        setOccupiedSlots(slots)
      } else {
        setOccupiedSlots([])
      }
    } catch {
      setOccupiedSlots([])
    } finally {
      setFetchingSlots(false)
    }
  }, [])

  const validate = useCallback((t?: (key: string) => string): boolean => {
    const _t = t ?? ((key: string) => key)
    const newErrors: Partial<Record<keyof AppointmentFormData, string>> = {}

    if (!form.name.trim()) {
      newErrors.name = _t('modal_error_name')
    }

    if (!form.phone.trim()) {
      newErrors.phone = _t('modal_error_phone')
    } else if (!PHONE_REGEX.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = _t('modal_error_phone_format')
    }

    if (!form.email.trim()) {
      newErrors.email = _t('modal_error_email')
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = _t('modal_error_email_format')
    }

    if (!form.date) {
      newErrors.date = _t('modal_error_date')
    } else {
      const selected = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selected < today) {
        newErrors.date = _t('modal_error_date_past')
      }
    }

    if (!form.time) {
      newErrors.time = _t('modal_error_time')
    } else if (form.date && isTimeBlocked(form.time, occupiedSlots)) {
      newErrors.time = _t('modal_error_time_block')
    }

    if (!form.consent) {
      newErrors.consent = _t('modal_error_consent')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form, occupiedSlots, isTimeBlocked])

  const handleChange = useCallback(
    (field: keyof AppointmentFormData, value: string | boolean) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value } as AppointmentFormData
        if (field === 'date' && typeof value === 'string') {
          next.time = ''
          fetchOccupied(value)
        }
        return next
      })
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors, fetchOccupied]
  )

  const reset = useCallback(() => {
    setForm({ name: '', phone: '', email: '', date: '', time: '', service: '', consent: false })
    setErrors({})
    setOccupiedSlots([])
  }, [])

  return {
    form,
    errors,
    occupiedSlots,
    fetchingSlots,
    timeSlots: TIME_SLOTS,
    isTimeBlocked,
    handleChange,
    validate,
    reset,
  }
}
