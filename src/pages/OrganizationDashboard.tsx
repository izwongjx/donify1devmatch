import React, { useState } from 'react'
import { Upload, FileText, Camera, DollarSign, Users, TrendingUp, CheckCircle, Clock, Plus, Target, ClipboardList } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext'

const OrganizationDashboard: React.FC = () => {
  const { user, organizations, setOrganizations, globalMilestones, setGlobalMilestones } = useUser()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)
  const [uploadType, setUploadType] = useState<'receipt' | 'photo' | 'video'>('photo')
  const [uploadDescription, setUploadDescription] = useState('')
  const [milestoneTitle, setMilestoneTitle] = useState('')
  const [milestoneDescription, setMilestoneDescription] = useState('')

  // Create organization data based on user input or find existing
  const createOrgData = () => {
    if (user?.organizationDetails) {
      // Use fixed stats if they exist, otherwise generate them once
      const fixedReceived = user.organizationDetails.totalReceived || 23.7
      const fixedDonors = user.organizationDetails.donorCount || 67
      
      return {
        id: user.id,
        name: user.name,
        mission: user.organizationDetails.mission,
        category: user.organizationDetails.category,
        location: user.organizationDetails.location,
        verified: user.organizationDetails.verified,
        totalReceived: fixedReceived,
        donorCount: fixedDonors,
        image: getImageByCategory(user.organizationDetails.category),
        milestones: globalMilestones,
        proofs: [
          {
            id: 'example-receipt',
            type: 'receipt' as const,
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
            description: 'Receipt for medical supplies purchase - $2,450 for emergency medical equipment',
            uploadDate: '2024-01-18',
            aiVerified: true,
            aiScore: 92
          }
        ],
        tasks: [
          { id: '1', title: 'Purchase rice supplies', description: 'Buy 500kg of rice for distribution', completed: true, completedDate: '2024-01-15' },
          { id: '2', title: 'Renovate bedroom', description: 'Complete renovation of sleeping quarters', completed: false },
          { id: '3', title: 'Install equipment', description: 'Set up necessary equipment for operations', completed: false }
        ]
      }
    }
    return organizations[0]
  }

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

  const orgData = createOrgData()

  const handleUploadProof = () => {
    // Simulate proof upload with AI verification
    const aiScore = Math.floor(Math.random() * 20) + 80 // Random score between 80-100
    const newProof = {
      id: Date.now().toString(),
      type: uploadType,
      url: uploadType === 'photo' ? 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' : 
           uploadType === 'receipt' ? 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' : '',
      description: uploadDescription,
      uploadDate: new Date().toISOString().split('T')[0],
      aiVerified: aiScore > 85,
      aiScore: aiScore
    }

    // Update organization data
    const updatedOrgs = organizations.map(org => 
      org.id === orgData.id 
        ? { ...org, proofs: [...org.proofs, newProof] }
        : org
    )
    setOrganizations(updatedOrgs)

    setShowUploadModal(false)
    setUploadDescription('')
  }

  const handleAddMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      title: milestoneTitle,
      description: milestoneDescription,
      completed: false
    }

    // Update global milestones
    setGlobalMilestones([...globalMilestones, newMilestone])

    setShowMilestoneModal(false)
    setMilestoneTitle('')
    setMilestoneDescription('')
  }

  const handleCompleteTask = (taskId: string) => {
    const updatedOrgs = organizations.map(org => 
      org.id === orgData.id 
        ? { 
            ...org, 
            tasks: org.tasks.map(task =>
              task.id === taskId
                ? { ...task, completed: true, completedDate: new Date().toISOString().split('T')[0] }
                : task
            )
          }
        : org
    )
    setOrganizations(updatedOrgs)
  }

  const handleCompleteMilestone = (milestoneId: string) => {
    const updatedMilestones = globalMilestones.map(milestone =>
      milestone.id === milestoneId
        ? { ...milestone, completed: true, completedDate: new Date().toISOString().split('T')[0] }
        : milestone
    )
    setGlobalMilestones(updatedMilestones)
  }

  if (!user || user.type !== 'organization') return null

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Organization Header */}
        <div className="glass-card p-8 rounded-3xl mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <img
                src={orgData.image}
                alt={orgData.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">{orgData.name}</h1>
                  {orgData.verified && (
                    <div className="glass px-3 py-1 rounded-full flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-semibold">Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-white drop-shadow-md mb-2">{orgData.mission}</p>
                <div className="flex items-center space-x-4 text-sm text-white drop-shadow-md">
                  <span className="font-medium">{orgData.category}</span>
                  <span>•</span>
                  <span className="font-medium">{orgData.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="glass-button px-6 py-3 rounded-xl text-white font-semibold flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Proof</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Total Received</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{orgData.totalReceived} ETH</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Total Donors</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{orgData.donorCount}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Total Milestones</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{globalMilestones.length}</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Proofs Uploaded</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{orgData.proofs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">Pending Tasks</p>
                <p className="text-2xl font-bold text-white drop-shadow-lg">{orgData.tasks.filter(t => !t.completed).length}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Milestones */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">Project Milestones</h2>
              <button 
                onClick={() => setShowMilestoneModal(true)}
                className="glass-button p-2 rounded-xl text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {globalMilestones.length > 0 ? (
                globalMilestones.map((milestone) => (
                  <div key={milestone.id} className="glass p-4 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {milestone.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-400" />
                          )}
                          <h3 className="font-semibold text-white drop-shadow-md">{milestone.title}</h3>
                        </div>
                        <p className="text-white/90 text-sm mb-2 drop-shadow-md">{milestone.description}</p>
                        {milestone.completed && milestone.completedDate && (
                          <p className="text-green-400 text-xs font-medium">
                            Completed on {milestone.completedDate}
                          </p>
                        )}
                      </div>
                      {!milestone.completed && (
                        <button
                          onClick={() => handleCompleteMilestone(milestone.id)}
                          className="glass-button px-3 py-1 rounded-xl text-white text-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/80 drop-shadow-md">No milestones set yet</p>
                  <button 
                    onClick={() => setShowMilestoneModal(true)}
                    className="glass-button px-4 py-2 rounded-xl text-white mt-4"
                  >
                    Add First Milestone
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Task Management */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white drop-shadow-lg mb-6">Task Management</h2>
            <div className="space-y-4">
              {orgData.tasks.map((task) => (
                <div key={task.id} className="glass p-4 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-400" />
                        )}
                        <h3 className="font-semibold text-white drop-shadow-md">{task.title}</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-2 drop-shadow-md">{task.description}</p>
                      {task.completed && task.completedDate && (
                        <p className="text-green-400 text-xs font-medium">
                          Completed on {task.completedDate}
                        </p>
                      )}
                    </div>
                    {!task.completed && (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="glass-button px-3 py-1 rounded-xl text-white text-sm"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Uploaded Proofs */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <h2 className="text-xl font-bold text-white drop-shadow-lg mb-6">Uploaded Proofs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgData.proofs.length > 0 ? (
              orgData.proofs.map((proof) => (
                <div key={proof.id} className="glass p-4 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="glass-button p-2 rounded-xl">
                      {proof.type === 'photo' && <Camera className="h-5 w-5 text-white" />}
                      {proof.type === 'receipt' && <FileText className="h-5 w-5 text-white" />}
                      {proof.type === 'video' && <Camera className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-white capitalize drop-shadow-md">{proof.type}</h3>
                        {proof.aiVerified && (
                          <div className="glass px-2 py-1 rounded-full">
                            <span className="text-green-400 text-xs font-medium">AI Verified {proof.aiScore}%</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/90 text-sm mb-1 drop-shadow-md">{proof.description}</p>
                      <p className="text-white/70 text-xs">Uploaded on {proof.uploadDate}</p>
                    </div>
                  </div>
                  {(proof.type === 'photo' || proof.type === 'receipt') && (
                    <img
                      src={proof.url}
                      alt={proof.description}
                      className="w-full h-32 object-cover rounded-xl mt-3"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 col-span-full">
                <Upload className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/80 drop-shadow-md">No proofs uploaded yet</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="glass-button px-4 py-2 rounded-xl text-white mt-4"
                >
                  Upload First Proof
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <h2 className="text-xl font-bold text-white drop-shadow-lg mb-6">Recent Donations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium drop-shadow-md">Anonymous Donor</span>
                  <span className="text-green-400 font-semibold">0.{3 + i} ETH</span>
                </div>
                <p className="text-white/80 text-sm">2024-01-{15 + i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showMilestoneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card p-8 rounded-3xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Add Milestone</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Milestone Title</label>
                <input
                  type="text"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter milestone title"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Description</label>
                <textarea
                  value={milestoneDescription}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[80px]"
                  placeholder="Describe the milestone..."
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowMilestoneModal(false)}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMilestone}
                disabled={!milestoneTitle || !milestoneDescription}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium disabled:opacity-50"
              >
                Add Milestone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Proof Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card p-8 rounded-3xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-6">Upload Proof</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Proof Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as 'receipt' | 'photo' | 'video')}
                  className="glass w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="photo" className="bg-gray-800 text-white">Photo</option>
                  <option value="receipt" className="bg-gray-800 text-white">Receipt</option>
                  <option value="video" className="bg-gray-800 text-white">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2 drop-shadow-md">Description</label>
                <textarea
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="glass w-full px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[80px]"
                  placeholder="Describe what this proof shows..."
                />
              </div>

              <div className="glass-dark p-4 rounded-xl border-2 border-dashed border-white/30 text-center">
                <Upload className="h-8 w-8 text-white/50 mx-auto mb-2" />
                <p className="text-white/90 text-sm drop-shadow-md">Click to upload or drag and drop</p>
                <p className="text-white/70 text-xs">PNG, JPG, PDF up to 10MB</p>
              </div>

              <div className="glass-dark p-4 rounded-xl">
                <p className="text-white/90 text-sm mb-2 drop-shadow-md">🤖 AI Verification</p>
                <p className="text-white/80 text-xs">Our AI will automatically verify if receipts match donor-specified usage and milestone requirements.</p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadProof}
                disabled={!uploadDescription}
                className="flex-1 glass-button py-3 rounded-xl text-white font-medium disabled:opacity-50"
              >
                Upload Proof
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizationDashboard
