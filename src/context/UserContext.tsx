import React, { createContext, useContext, useState, ReactNode } from 'react'

declare global {
  interface Window {
    ethereum?: any
  }
}

interface User {
  id: string
  name: string
  email: string
  type: 'donor' | 'organization'
  walletAddress?: string
  organizationDetails?: {
    mission: string
    category: string
    location: string
    verified: boolean
    totalReceived?: number
    donorCount?: number
  }
}

interface Donation {
  id: string
  organizationId: string
  organizationName: string
  amount: number
  status: 'pending' | 'verified' | 'completed'
  date: string
  usage: string
  milestones: Milestone[]
  proofs: Proof[]
}

interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

interface Proof {
  id: string
  type: 'receipt' | 'photo' | 'video'
  url: string
  description: string
  uploadDate: string
  aiVerified?: boolean
  aiScore?: number
}

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

interface Organization {
  id: string
  name: string
  mission: string
  category: string
  location: string
  verified: boolean
  totalReceived: number
  donorCount: number
  image: string
  milestones: Milestone[]
  proofs: Proof[]
  tasks: Task[]
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  donations: Donation[]
  setDonations: (donations: Donation[]) => void
  organizations: Organization[]
  setOrganizations: (organizations: Organization[]) => void
  connectWallet: () => Promise<void>
  isWalletConnected: boolean
  globalMilestones: Milestone[]
  setGlobalMilestones: (milestones: Milestone[]) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [globalMilestones, setGlobalMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Community Water Well Installation',
      description: 'Install 5 new water wells in rural communities to provide clean drinking water access',
      completed: true,
      completedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Educational Material Distribution',
      description: 'Distribute textbooks and learning materials to 200 students in underserved schools',
      completed: false
    }
  ])
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      organizationId: '1',
      organizationName: 'Global Water Initiative',
      amount: 0.5,
      status: 'completed',
      date: '2024-01-15',
      usage: 'Water pumps and filtration systems',
      milestones: [
        { id: '1', title: 'Water pump installation', description: 'Install new water pumps in rural areas', completed: true, completedDate: '2024-01-20' },
        { id: '2', title: 'Community training', description: 'Train local community on maintenance', completed: true, completedDate: '2024-01-25' }
      ],
      proofs: [
        { id: '1', type: 'photo', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', description: 'Water pump installation progress', uploadDate: '2024-01-20', aiVerified: true, aiScore: 95 }
      ]
    },
    {
      id: '2',
      organizationId: '2',
      organizationName: 'Education for All',
      amount: 0.3,
      status: 'verified',
      date: '2024-01-18',
      usage: 'School supplies and textbooks',
      milestones: [
        { id: '3', title: 'School supplies purchase', description: 'Buy books and materials for students', completed: false }
      ],
      proofs: []
    },
    {
      id: '3',
      organizationId: '3',
      organizationName: 'Disaster Relief Network',
      amount: 0.8,
      status: 'pending',
      date: '2024-01-20',
      usage: 'Emergency food supplies and medical aid',
      milestones: [
        { id: '4', title: 'Emergency supplies distribution', description: 'Distribute food and medical supplies to affected areas', completed: false }
      ],
      proofs: []
    }
  ])

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Global Water Initiative',
      mission: 'Providing clean water access to underserved communities worldwide',
      category: 'Water & Sanitation',
      location: 'Kenya, Africa',
      verified: true,
      totalReceived: 12.5,
      donorCount: 45,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      milestones: [
        { id: '1', title: 'Water pump installation', description: 'Install new water pumps in rural areas', completed: true, completedDate: '2024-01-20' },
        { id: '2', title: 'Community training', description: 'Train local community on maintenance', completed: true, completedDate: '2024-01-25' }
      ],
      proofs: [
        { id: '1', type: 'photo', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', description: 'Water pump installation progress', uploadDate: '2024-01-20', aiVerified: true, aiScore: 95 },
        { id: '2', type: 'receipt', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', description: 'Receipt for water pump equipment purchase', uploadDate: '2024-01-18', aiVerified: true, aiScore: 88 }
      ],
      tasks: [
        { id: '1', title: 'Purchase rice supplies', description: 'Buy 500kg of rice for distribution', completed: true, completedDate: '2024-01-15' },
        { id: '2', title: 'Renovate community center', description: 'Complete renovation of main hall', completed: false },
        { id: '3', title: 'Install water filters', description: 'Set up filtration systems in 5 locations', completed: true, completedDate: '2024-01-22' }
      ]
    },
    {
      id: '2',
      name: 'Education for All',
      mission: 'Ensuring quality education reaches every child in remote areas',
      category: 'Education',
      location: 'Bangladesh',
      verified: true,
      totalReceived: 8.2,
      donorCount: 32,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400',
      milestones: [
        { id: '3', title: 'School supplies purchase', description: 'Buy books and materials for students', completed: false }
      ],
      proofs: [],
      tasks: [
        { id: '4', title: 'Purchase textbooks', description: 'Buy 200 textbooks for primary students', completed: false },
        { id: '5', title: 'Repair school roof', description: 'Fix damaged roof sections', completed: true, completedDate: '2024-01-10' }
      ]
    },
    {
      id: '3',
      name: 'Disaster Relief Network',
      mission: 'Rapid response and aid for natural disaster victims',
      category: 'Disaster Relief',
      location: 'Philippines',
      verified: true,
      totalReceived: 25.8,
      donorCount: 78,
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400',
      milestones: [],
      proofs: [],
      tasks: [
        { id: '6', title: 'Distribute emergency kits', description: 'Hand out 1000 emergency supply kits', completed: false },
        { id: '7', title: 'Set up temporary shelters', description: 'Establish 10 temporary shelter units', completed: true, completedDate: '2024-01-12' }
      ]
    },
    {
      id: '4',
      name: 'Senior Care Foundation',
      mission: 'Supporting elderly care and improving quality of life for seniors',
      category: 'Old Folks Home',
      location: 'India',
      verified: true,
      totalReceived: 15.3,
      donorCount: 56,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
      milestones: [],
      proofs: [],
      tasks: [
        { id: '8', title: 'Purchase medical supplies', description: 'Buy essential medications and equipment', completed: false },
        { id: '9', title: 'Renovate dining hall', description: 'Upgrade dining facilities for residents', completed: true, completedDate: '2024-01-08' }
      ]
    }
  ])

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          if (user) {
            setUser({ ...user, walletAddress: accounts[0] })
          }
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask to connect your wallet.')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      donations,
      setDonations,
      organizations,
      setOrganizations,
      connectWallet,
      isWalletConnected,
      globalMilestones,
      setGlobalMilestones
    }}>
      {children}
    </UserContext.Provider>
  )
}
