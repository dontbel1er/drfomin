// Apply saved settings before first paint to avoid FOUC
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') document.documentElement.classList.add('dark-theme')
if (localStorage.getItem('visionMode')) document.documentElement.classList.add('vision-mode')

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
import './style.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
