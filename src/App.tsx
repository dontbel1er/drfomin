import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ServicesPage } from './pages/ServicesPage.tsx'
import { PricesPage } from './pages/PricesPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactsPage } from './pages/ContactsPage.tsx'
import { ReviewsPage } from './pages/ReviewsPage.tsx'
import { FaqPage } from './pages/FaqPage.tsx'
import { ResultsPage } from './pages/ResultsPage.tsx'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="prices" element={<PricesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
