import { createContext, useContext, useState, useCallback } from 'react'

interface AppointmentContextType {
  isOpen: boolean
  preselectedService: string
  open: () => void
  openWithService: (service: string) => void
  close: () => void
}

const AppointmentContext = createContext<AppointmentContextType | null>(null)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')

  const open = useCallback(() => {
    setPreselectedService('')
    setIsOpen(true)
  }, [])

  const openWithService = useCallback((service: string) => {
    setPreselectedService(service)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setPreselectedService('')
  }, [])

  return (
    <AppointmentContext.Provider
      value={{ isOpen, preselectedService, open, openWithService, close }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointment() {
  const ctx = useContext(AppointmentContext)
  if (!ctx) {
    throw new Error('useAppointment must be used within AppointmentProvider')
  }
  return ctx
}
