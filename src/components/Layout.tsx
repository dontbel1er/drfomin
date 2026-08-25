import { Outlet } from 'react-router-dom'
import { AppointmentProvider, useAppointment } from '../contexts/AppointmentContext.tsx'
import { Header } from './Header.tsx'
import { Footer } from './Footer.tsx'
import { AppointmentModal } from './AppointmentModal.tsx'

function ModalHost() {
  const { isOpen, preselectedService, close } = useAppointment()
  return <AppointmentModal isOpen={isOpen} preselectedService={preselectedService} onClose={close} />
}

export function Layout() {
  return (
    <AppointmentProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ModalHost />
    </AppointmentProvider>
  )
}
