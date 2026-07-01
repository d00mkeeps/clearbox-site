import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import DashboardScreen from './pages/admin/DashboardScreen'
import { AuthGate } from './components/admin/AuthGate'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="/admin"
          element={
            <AuthGate>
              <DashboardScreen />
            </AuthGate>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}