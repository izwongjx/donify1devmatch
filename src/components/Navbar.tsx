import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, User, LogOut, Wallet } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Navbar: React.FC = () => {
  const { user, setUser, connectWallet, isWalletConnected } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="glass rounded-2xl m-4 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Donify</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user && (
            <button
              onClick={connectWallet}
              className="glass-button px-4 py-2 rounded-xl text-white font-medium flex items-center space-x-2"
            >
              <Wallet className="h-4 w-4" />
              <span>{isWalletConnected && user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'CONNECT WALLET'}</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-5 w-5" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="glass-button p-2 rounded-xl text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/donor/login"
                className="glass-button px-4 py-2 rounded-xl text-white font-medium"
              >
                Donor Login
              </Link>
              <Link
                to="/organization/login"
                className="glass-button px-4 py-2 rounded-xl text-white font-medium"
              >
                Organization Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
