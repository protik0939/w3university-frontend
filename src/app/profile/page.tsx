'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  Edit2, Save, X, Github, Linkedin, Twitter,
  BookOpen, Clock, Trophy, Flame
} from 'lucide-react'
import Navbar from '@/Components/NavBar/Navbar'
import Footer from '@/Components/Footer/Footer'

interface Address {
  street: string
  city: string
  state: string
  country: string
  zip: string
}

interface Skill {
  id: number
  name: string
  category: string
  completedDate: string
  progress: number
}

interface Stats {
  totalCourses: number
  hoursLearned: number
  certificatesEarned: number
  currentStreak: number
}

interface Social {
  github: string
  linkedin: string
  twitter: string
}

interface UserData {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: Address
  bio: string
  avatar: string
  joinedDate: string
  skillsCompleted: Skill[]
  stats: Stats
  social: Social
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Simulating logged-in user ID (change this to fetch from auth context)
  const loggedInUserId = 1

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Fetch user data from dummy JSON
    fetch('/userData.json')
      .then(res => res.json())
      .then((data: UserData[]) => {
        const user = data.find(u => u.id === loggedInUserId)
        if (user) {
          setUserData(user)
          setEditedData(user)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading user data:', err)
        setLoading(false)
      })
  }, [loggedInUserId, mounted])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(userData)
  }

  const handleSave = () => {
    setUserData(editedData)
    setIsEditing(false)
    // Here you would typically save to a backend API
    console.log('Saving user data:', editedData)
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    if (!editedData) return
    setEditedData({ ...editedData, [field]: value })
  }

  const handleAddressChange = (field: keyof Address, value: string) => {
    if (!editedData) return
    setEditedData({
      ...editedData,
      address: { ...editedData.address, [field]: value }
    })
  }

  const handleSocialChange = (field: keyof Social, value: string) => {
    if (!editedData) return
    setEditedData({
      ...editedData,
      social: { ...editedData.social, [field]: value }
    })
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User not found</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Navbar />
      
      {/* Hero Section with Profile Header */}
      <div className="relative pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 transition-colors">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="relative">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <Award size={20} />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editedData?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-3xl font-bold bg-transparent border-b-2 border-green-500 text-gray-900 dark:text-white focus:outline-none w-full"
                      />
                      <input
                        type="text"
                        value={editedData?.username || ''}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="text-lg bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 focus:outline-none w-full"
                        placeholder="@username"
                      />
                      <textarea
                        value={editedData?.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={3}
                        placeholder="Bio"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {userData.name}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        @{userData.username}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {userData.bio}
                      </p>
                    </>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>Joined {new Date(userData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Edit Button */}
                <div>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20"
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20"
                      >
                        <Save size={18} />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all font-medium"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BookOpen className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.totalCourses}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.hoursLearned}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.certificatesEarned}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Certificates</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Flame className="text-red-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.currentStreak}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contact Information */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <User size={24} className="text-green-500" />
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Mail className="text-green-500" size={20} />
                        <input
                          type="email"
                          value={editedData?.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-green-500" size={20} />
                        <input
                          type="tel"
                          value={editedData?.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Mail className="text-green-500" size={20} />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <Phone className="text-green-500" size={20} />
                        <span>{userData.phone}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MapPin size={24} className="text-green-500" />
                  Address
                </h2>

                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedData?.address.street || ''}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Street"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editedData?.address.city || ''}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="City"
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={editedData?.address.state || ''}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="State"
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editedData?.address.country || ''}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        placeholder="Country"
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={editedData?.address.zip || ''}
                        onChange={(e) => handleAddressChange('zip', e.target.value)}
                        placeholder="ZIP Code"
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>{userData.address.street}</p>
                    <p>{userData.address.city}, {userData.address.state}</p>
                    <p>{userData.address.country} - {userData.address.zip}</p>
                  </div>
                )}
              </div>

              {/* Skills Completed */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award size={24} className="text-green-500" />
                  Skills Completed ({userData.skillsCompleted.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userData.skillsCompleted.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border border-green-200 dark:border-green-900/30 rounded-lg p-4 transition-colors hover:shadow-md"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </h3>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                          {skill.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {skill.category}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Completed: {new Date(skill.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 transition-colors">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Social Links
                </h2>

                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Github className="text-gray-900 dark:text-white" size={20} />
                        <input
                          type="url"
                          value={editedData?.social.github || ''}
                          onChange={(e) => handleSocialChange('github', e.target.value)}
                          placeholder="GitHub URL"
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin className="text-blue-500" size={20} />
                        <input
                          type="url"
                          value={editedData?.social.linkedin || ''}
                          onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                          placeholder="LinkedIn URL"
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Twitter className="text-sky-500" size={20} />
                        <input
                          type="url"
                          value={editedData?.social.twitter || ''}
                          onChange={(e) => handleSocialChange('twitter', e.target.value)}
                          placeholder="Twitter URL"
                          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <a
                        href={userData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors group"
                      >
                        <Github size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm">GitHub</span>
                      </a>
                      <a
                        href={userData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors group"
                      >
                        <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a
                        href={userData.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors group"
                      >
                        <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm">Twitter</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Learning Progress */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4">Keep Learning! 🚀</h3>
                <p className="text-sm text-green-50 mb-4">
                  You&apos;re on a {userData.stats.currentStreak}-day streak! Keep up the great work.
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
