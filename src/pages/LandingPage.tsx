import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Shield, Eye, Zap, Users, Globe, ArrowRight, CheckCircle, TrendingUp, AlertTriangle, Brain } from 'lucide-react'
import Navbar from '../components/Navbar'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="floating-animation">
            <Heart className="h-20 w-20 text-white mx-auto mb-8 pulse-glow" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Transparent Donations
            <br />
            <span className="text-white drop-shadow-2xl bg-gradient-to-r from-white to-white/90 bg-clip-text">Powered by Blockchain</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
            Donify connects donors with verified organizations through blockchain technology, 
            ensuring complete transparency and accountability in every donation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/donor/register"
              className="glass-button px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 group"
            >
              <span>Start as Donor</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/organization/register"
              className="glass-button px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 group"
            >
              <span>Register Organization</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 rounded-3xl mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="h-8 w-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">AI Donation Insights</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-bold text-white drop-shadow-md">Trending Cause</h3>
                </div>
                <p className="text-white/90 mb-2 drop-shadow-md">Water & Sanitation projects are seeing 45% more donations this month</p>
                <p className="text-green-400 text-sm font-semibold">↑ 45% increase</p>
              </div>

              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                  <h3 className="text-lg font-bold text-white drop-shadow-md">Most Needed</h3>
                </div>
                <p className="text-white/90 mb-2 drop-shadow-md">Disaster Relief organizations urgently need support for recent floods</p>
                <p className="text-orange-400 text-sm font-semibold">Critical need</p>
              </div>

              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white drop-shadow-md">Transparency Score</h3>
                </div>
                <p className="text-white/90 mb-2 drop-shadow-md">Organizations with 90%+ transparency receive 3x more donations</p>
                <p className="text-blue-400 text-sm font-semibold">AI verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 drop-shadow-lg">
            Why Choose Donify?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl text-center">
              <Shield className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Blockchain Security</h3>
              <p className="text-white/90 drop-shadow-md">
                Every donation is recorded on the blockchain, ensuring immutable transparency and security.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl text-center">
              <Eye className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Full Transparency</h3>
              <p className="text-white/90 drop-shadow-md">
                Track your donations in real-time and see exactly how your funds are being used.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl text-center">
              <Zap className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Smart Contracts</h3>
              <p className="text-white/90 drop-shadow-md">
                Automated milestone-based fund release ensures accountability and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16 drop-shadow-lg">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Donors */}
            <div className="glass-card p-8 rounded-3xl">
              <Users className="h-12 w-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">For Donors</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Connect Your Wallet</h4>
                    <p className="text-white/90 drop-shadow-md">Link your MetaMask wallet to get started</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Choose Organizations</h4>
                    <p className="text-white/90 drop-shadow-md">Browse verified organizations and their causes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Track Impact</h4>
                    <p className="text-white/90 drop-shadow-md">Monitor milestones and see proof of impact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Organizations */}
            <div className="glass-card p-8 rounded-3xl">
              <Globe className="h-12 w-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">For Organizations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Get Verified</h4>
                    <p className="text-white/90 drop-shadow-md">Complete verification process to build trust</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Set Milestones</h4>
                    <p className="text-white/90 drop-shadow-md">Define clear goals and milestones for your projects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white drop-shadow-md">Upload Proof</h4>
                    <p className="text-white/90 drop-shadow-md">Share receipts and photos to unlock funds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              Join thousands of donors and organizations building a more transparent future for charitable giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donor/register"
                className="glass-button px-8 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                Become a Donor
              </Link>
              <Link
                to="/organization/register"
                className="glass-button px-8 py-4 rounded-2xl text-white font-semibold text-lg"
              >
                Register Your Organization
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Proudly Sponsored By</h3>
              <div className="flex items-center justify-center space-x-12">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white drop-shadow-md">ChatAndBuild</h4>
                  <p className="text-white/80 text-sm">AI-Powered Development</p>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white drop-shadow-md">Asia Pacific University</h4>
                  <p className="text-white/80 text-sm">Technology & Innovation</p>
                </div>
              </div>
            </div>
            <div className="text-center border-t border-white/20 pt-6">
              <p className="text-white/70 text-sm">
                © 2024 Donify. Built with transparency, powered by blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
