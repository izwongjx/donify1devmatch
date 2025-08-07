import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, Eye, MapPin, Calendar, DollarSign, FileText, Camera, ShoppingCart, Brain } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext'

const DonationDetails: React.FC = () => {
  const { id } = useParams()
  const { donations, organizations } = useUser()
  
  const donation = donations.find(d => d.id === id)
  const organization = donation ? organizations.find(o => o.id === donation.organizationId) : null

  if (!donation || !organization) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="glass-card p-8 rounded-3xl text-center">
            <h1 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Donation Not Found</h1>
            <Link to="/donor/dashboard" className="glass-button px-6 py-3 rounded-xl text-white">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
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
      case 'completed': return <CheckCircle className="h-6 w-6" />
      case 'verified': return <Eye className="h-6 w-6" />
      default: return <Clock className="h-6 w-6" />
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/donor/dashboard"
            className="glass-button p-3 rounded-xl text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Donation Details</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Overview */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{donation.organizationName}</h2>
                  <div className={`flex items-center space-x-2 ${getStatusColor(donation.status)}`}>
                    {getStatusIcon(donation.status)}
                    <span className="font-semibold capitalize">{donation.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/90 text-sm font-medium drop-shadow-md">Donation Amount</p>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{donation.amount} ETH</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-white/70" />
                    <div>
                      <p className="text-white/90 text-sm font-medium drop-shadow-md">Donation Date</p>
                      <p className="text-white font-medium drop-shadow-md">{donation.date}</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-white/70" />
                    <div>
                      <p className="text-white/90 text-sm font-medium drop-shadow-md">Transaction ID</p>
                      <p className="text-white font-medium drop-shadow-md">0x742d35...5b8c</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Usage */}
              <div className="glass p-4 rounded-xl mt-6">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-white/70" />
                  <div>
                    <p className="text-white/90 text-sm font-medium drop-shadow-md">Specified Usage</p>
                    <p className="text-white font-medium drop-shadow-md">{donation.usage}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones Progress */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Project Milestones</h3>
              {donation.milestones.length > 0 ? (
                <div className="space-y-4">
                  {donation.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="glass p-4 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {milestone.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-white/30" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1 drop-shadow-md">{milestone.title}</h4>
                          <p className="text-white/90 text-sm mb-2 drop-shadow-md">{milestone.description}</p>
                          {milestone.completed && milestone.completedDate && (
                            <p className="text-green-400 text-xs font-medium">
                              Completed on {milestone.completedDate}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/80 drop-shadow-md">No milestones set for this donation yet</p>
                </div>
              )}
            </div>

            {/* Proof of Impact */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-6 drop-shadow-lg">Proof of Impact</h3>
              {donation.proofs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {donation.proofs.map((proof) => (
                    <div key={proof.id} className="glass p-4 rounded-xl">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="glass-button p-2 rounded-xl">
                          {proof.type === 'photo' && <Camera className="h-4 w-4 text-white" />}
                          {proof.type === 'receipt' && <FileText className="h-4 w-4 text-white" />}
                          {proof.type === 'video' && <Camera className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-white capitalize drop-shadow-md">{proof.type}</h4>
                            {proof.aiVerified && (
                              <div className="glass px-2 py-1 rounded-full">
                                <span className="text-green-400 text-xs font-medium">AI Verified {proof.aiScore}%</span>
                              </div>
                            )}
                          </div>
                          <p className="text-white/90 text-sm drop-shadow-md">{proof.description}</p>
                          <p className="text-white/70 text-xs mt-1">Uploaded {proof.uploadDate}</p>
                        </div>
                      </div>
                      {proof.type === 'photo' && (
                        <img
                          src={proof.url}
                          alt={proof.description}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/80 drop-shadow-md">No proof uploaded yet</p>
                  <p className="text-white/70 text-sm">The organization will upload proof as milestones are completed</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Info */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 drop-shadow-lg">Organization Details</h3>
              <div className="space-y-4">
                <img
                  src={organization.image}
                  alt={organization.name}
                  className="w-full h-32 object-cover rounded-xl"
                />
                <div>
                  <h4 className="font-semibold text-white mb-1 drop-shadow-md">{organization.name}</h4>
                  <p className="text-white/90 text-sm mb-2 drop-shadow-md">{organization.mission}</p>
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{organization.location}</span>
                  </div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/90 font-medium">Category</span>
                    <span className="text-white drop-shadow-md">{organization.category}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/90 font-medium">Total Raised</span>
                    <span className="text-white drop-shadow-md">{organization.totalReceived} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/90 font-medium">Donors</span>
                    <span className="text-white drop-shadow-md">{organization.donorCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white drop-shadow-lg">AI Impact Analysis</h3>
              </div>
              <div className="space-y-3">
                <div className="glass p-3 rounded-xl">
                  <p className="text-white/90 text-sm mb-1 font-medium drop-shadow-md">Usage Compliance</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
                    </div>
                    <span className="text-white text-sm font-medium">92%</span>
                  </div>
                  <p className="text-green-400 text-xs mt-1 font-medium">Receipts match specified usage</p>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-white/90 text-sm mb-1 font-medium drop-shadow-md">Transparency Score</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
                    </div>
                    <span className="text-white text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-white/90 text-sm mb-1 font-medium drop-shadow-md">Impact Verification</p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Verified</span>
                  </div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-white/90 text-sm mb-1 font-medium drop-shadow-md">Fund Utilization</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                    </div>
                    <span className="text-white text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Contract Status */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 drop-shadow-lg">Smart Contract Status</h3>
              <div className="space-y-3">
                <div className="glass p-3 rounded-xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-white text-sm font-medium drop-shadow-md">Funds Escrowed</span>
                  </div>
                  <p className="text-white/80 text-xs">Funds held in smart contract until milestones complete</p>
                </div>
                <div className="glass p-3 rounded-xl">
                  <div className="flex items-center space-x-2 mb-1">
                    {donation.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="text-white text-sm font-medium drop-shadow-md">AI Verification</span>
                  </div>
                  <p className="text-white/80 text-xs">
                    {donation.status === 'completed' 
                      ? 'AI verified receipts match usage requirements'
                      : 'Awaiting proof upload and AI verification'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Certificate */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <h3 className="text-lg font-bold text-white mb-4 drop-shadow-lg">Digital Certificate</h3>
              <div className="glass p-4 rounded-xl mb-4">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium drop-shadow-md">Certificate of Impact</p>
                <p className="text-white/80 text-xs">Blockchain Verified</p>
              </div>
              <button className="glass-button w-full py-2 rounded-xl text-white text-sm font-medium">
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationDetails
