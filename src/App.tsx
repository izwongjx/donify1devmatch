import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DonorDashboard from './pages/DonorDashboard'
import OrganizationDashboard from './pages/OrganizationDashboard'
import DonorLogin from './pages/DonorLogin'
import OrganizationLogin from './pages/OrganizationLogin'
import DonorRegister from './pages/DonorRegister'
import OrganizationRegister from './pages/OrganizationRegister'
import DonationDetails from './pages/DonationDetails'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/donor/login" element={<DonorLogin />} />
            <Route path="/donor/register" element={<DonorRegister />} />
            <Route path="/donor/dashboard" element={<DonorDashboard />} />
            <Route path="/organization/login" element={<OrganizationLogin />} />
            <Route path="/organization/register" element={<OrganizationRegister />} />
            <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
            <Route path="/donation/:id" element={<DonationDetails />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
