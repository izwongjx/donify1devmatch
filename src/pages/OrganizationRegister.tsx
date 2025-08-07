import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Building, MapPin, Target, Tag } from 'lucide-react'
import { useUser } from '../context/UserContext'

const OrganizationRegister: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mission, setMission] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [location, setLocation] = useState('')
  const { setUser } = useUser()
  const navigate = useNavigate()

  const categories = [
    'Water & Sanitation',
    'Education',
    'Healthcare',
    'Disaster Relief',
    'Old Folks Home',
    'Environmental',
    'Food Security',
    'Housing',
    'Other'
  ]

  const getImageByCategory = (category: string) => {
    const imageMap: { [key: string]: string } = {
      'Water & Sanitation': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      'Education': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
      'Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      'Disaster Relief': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400',
      'Old Folks Home': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
      'Environmental': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'Food Security': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
      'Housing': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
    }
    return imageMap[category] || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalCategory = category === 'Other' ? customCategory : category
    
    // Generate fixed stats for this organization
    const fixedReceived = 23.7
    const fixedDonors = 67
    
    // Simulate registration
    setUser({
      id: Date.now().toString(),
      name: name,
      email: email,
      type: 'organization',
      organizationDetails: {
        mission: mission,
        category: finalCategory,
        location: location,
        verified: false,
        totalReceived: fixedReceived,
        donorCount: fixedDonors
      }
    })
    navigate('/organization/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="glass-card p-8 rounded-3xl w-full max-w-md">
        <div className="text-center mb-8">
          <Building className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Register Organization</h1>
          <p className="text-white/90 drop-shadow-md">Join our transparent donation platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Organization Name</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Mission Statement</label>
            <div className="relative">
              <Target className="absolute left-3 top-3 h-5 w-5 text-white/50" />
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[80px]"
                placeholder="Describe your organization's mission"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {category === 'Other' && (
            <div>
              <label className="block text-white font-medium mb-2 drop-shadow-md">Custom Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter your category"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-white font-medium mb-2 drop-shadow-md">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="glass w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          {/* Category Preview */}
          {category && category !== 'Other' && (
            <div className="glass p-4 rounded-xl">
              <p className="text-white/90 text-sm mb-2 drop-shadow-md">Organization Preview:</p>
              <div className="flex items-center space-x-3">
                <img
                  src={getImageByCategory(category)}
                  alt={category}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-white font-medium drop-shadow-md">{name || 'Your Organization'}</p>
                  <p className="text-white/80 text-sm">{category}</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="glass-button w-full py-3 rounded-xl text-white font-semibold text-lg"
          >
            Register Organization
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/90 drop-shadow-md">
            Already have an account?{' '}
            <Link to="/organization/login" className="text-white font-semibold hover:underline">
              Login here
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

export default OrganizationRegister
