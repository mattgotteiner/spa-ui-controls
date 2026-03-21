import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DemoApp } from './demo/App'
import { ThemeProvider } from './theme/ThemeProvider'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container not found')
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <DemoApp />
    </ThemeProvider>
  </StrictMode>
)
