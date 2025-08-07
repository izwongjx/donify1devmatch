import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Building } from 'lucide-react'
import { useUser } from '../context/UserContext'

const OrganizationLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    setUser({
      id: '1',
      name: 'Global Water Initiative',
      email: email,
      type: 'organization',
      organizationDetails: {
        mission: 'Providing clean water access to underserved communities worldwide',
        category: 'Water & Sanitation',
        location: 'Kenya, Africa',
        verified: true,
        totalReceived: 23.7,
        donorCount: 67
      }
    })
    navigate('/organization/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 rounded-3xl w-full max-w-md">
        <div className="text-center mb-8">
          <Building className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Organization Login</h1>
          <p className="text-white/90 drop-shadow-md">Welcome back to Donify</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter organization email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="glass-button w-full py-3 rounded-xl text-white font-semibold text-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/90 drop-shadow-md">
            Don't have an account?{' '}
            <Link to="/organization/register" className="text-white font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-white/90 hover:text-white drop-shadow-md">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrganizationLogin
