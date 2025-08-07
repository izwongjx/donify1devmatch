import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, Award, TrendingUp, Users, MapPin, CheckCircle, Clock, AlertCircle, ShoppingCart } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext'

const DonorDashboard: React.FC = () => {
  const { user, donations, organizations, setDonations, connectWallet, isWalletConnected } = useUser()
  const [selectedOrg, setSelectedOrg] = useState<string>('')
  const [donationAmount, setDonationAmount] = useState('')
  const [donationUsage, setDonationUsage] = useState('')
  const [customUsage, setCustomUsage] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const completedDonations = donations.filter(d => d.status === 'completed').length
  const activeDonations = donations.filter(d => d.status !== 'completed').length

  const usageOptions = [
    'Rice and basic food supplies',
    'Clean water systems',
    'Medical supplies and equipment',
    'Educational materials and books',
    'Emergency shelter materials',
    'Clothing and blankets',
    'Baby supplies (diapers, formula)',
    'Agricultural tools and seeds',
    'Solar panels and batteries',
    'Wheelchairs and mobility aids',
    'Others'
  ]

  const handleDonate = async () => {
    if (!isWalletConnected) {
      await connectWallet()
      return
    }

    if (!selectedOrg || !donationAmount || (!donationUsage && !customUsage)) return

    const org = organizations.find(o => o.id === selectedOrg)
    if (!org) return

    const finalUsage = donationUsage === 'Others' ? customUsage : donationUsage

    const newDonation = {
      id: Date.now().toString(),
      organizationId: selectedOrg,
      organizationName: org.name,
      amount: parseFloat(donationAmount),
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      usage: finalUsage,
      milestones: [],
      proofs: []
    }

    setDonations([...donations, newDonation])
    setShowDonationModal(false)
    setSelectedOrg('')
    setDonationAmount('')
    setDonationUsage('')
    setCustomUsage('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'verified': return 'text-blue-400'
      default: return 'text-yellow-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5" />
      case 'verified': return <Eye className="h-5 w-5" />
      default: return <Clock className="h-5 w-5" />
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="glass-card p-8 rounded-3xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome back, {user.name}!
              </h1>
              <p className="text-white/90 drop-shadow-md">Track your donations and make a difference</p>
            </div>
            <button
              onClick={() => setShowDonationModal(true)}
              className="glass-button px-6 py-3 rounded-xl text-white font-semibold flex items-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Total Donated</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{totalDonated.toFixed(2)} ETH</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Active Donations</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{activeDonations}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Completed</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{completedDonations}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Organizations</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{organizations.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Your Donations</h2>
            <div className="space-y-4">
              {donations.map((donation) => (
                <div key={donation.id} className="glass p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white drop-shadow-md">{donation.organizationName}</h3>
                    <div className={`flex items-center space-x-1 ${getStatusColor(donation.status)}`}>
                      {getStatusIcon(donation.status)}
                      <span className="text-sm capitalize font-medium">{donation.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <ShoppingCart className="h-4 w-4 text-white/60" />
                    <span className="text-white/90 text-sm drop-shadow-md">{donation.usage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/90">
                    <span className="font-medium">{donation.amount} ETH</span>
                    <span>{donation.date}</span>
                  </div>
                  <Link
                    to={`/donation/${donation.id}`}
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Available Organizations */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Featured Organizations</h2>
            <div className="space-y-4">
              {organizations.slice(0, 4).map((org) => (
                <div key={org.id} className="glass p-4 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-white drop-shadow-md">{org.name}</h3>
                        {org.verified && (
                          <Award className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-white/90 text-sm mb-2 drop-shadow-md">{org.mission}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-white/80">
                          <MapPin className="h-3 w-3" />
                          <span>{org.location}</span>
                        </div>
                        <span className="text-white/80 font-medium">{org.totalReceived} ETH raised</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card p-8 rounded-3xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Make a Donation</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Select Organization</label>
                <select
                  value={selectedOrg}
                  onChange={(e) => setSelectedOrg(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="">Choose an organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id} className="bg-gray-800 text-white">
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Amount (ETH)</label>
                <input
                  type="number"
                  step="0.01"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Donation Usage</label>
                <select
                  value={donationUsage}
                  onChange={(e) => setDonationUsage(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="">Select how funds should be used</option>
                  {usageOptions.map((usage) => (
                    <option key={usage} value={usage} className="bg-gray-800 text-white">
                      {usage}
                    </option>
                  ))}
                </select>
              </div>

              {donationUsage === 'Others' && (
                <div>
                  <label className="block text-white font-medium mb-2 drop-shadow-md">Custom Donation Usage</label>
                  <input
                    type="text"
                    value={customUsage}
                    onChange={(e) => setCustomUsage(e.target.value)}
                    className="glass w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Specify how you want funds to be used"
                  />
                </div>
              )}

              {!isWalletConnected && (
                <div className="glass-dark p-4 rounded-xl flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-white/90 text-sm drop-shadow-md">Connect your wallet to proceed</span>
                </div>
              )}

              <div className="glass-dark p-4 rounded-xl">
                <p className="text-white/90 text-sm mb-2 drop-shadow-md">🤖 AI Smart Contract Protection</p>
                <p className="text-white/80 text-xs">Funds will be released only when AI verifies receipts match your specified usage and milestones are completed.</p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={!selectedOrg || !donationAmount || (!donationUsage || (donationUsage === 'Others' && !customUsage))}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium disabled:opacity-50"
              >
                {isWalletConnected ? 'Donate Now' : 'Connect & Donate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DonorDashboard
