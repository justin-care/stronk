import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WorkoutProvider } from './providers/provider.jsx'
import { ToastProvider } from './providers/ToastProvider.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const mockUUID = '44521c15-699e-41f1-801f-e19fc952b91b'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <WorkoutProvider userId={mockUUID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WorkoutProvider>
    </ToastProvider>
  </StrictMode>,
)
