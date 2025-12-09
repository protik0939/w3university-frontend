'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  Edit2, Save, X, Github, Linkedin, Twitter,
  BookOpen, Clock, Trophy, Flame, LogOut, Upload, Lock
} from 'lucide-react'
import Footer from '@/Components/Footer/Footer'
import { useParams } from 'next/navigation'
import { profileAPI, getAuthToken, authAPI } from '@/lib/api'

interface ProfileData {
  user: {
    id: number
    name: string
    email: string
    created_at?: string
  }
  profile?: {
    username?: string
    phone?: string
    bio?: string
    github_url?: string
    linkedin_url?: string
    twitter_url?: string
    portfolio_url?: string
    location?: string
    skill_level?: string
    is_public?: boolean
    avatar?: string
    avatar_url?: string
  }
  performance?: {
    total_courses_completed: number
    total_lessons_completed: number
    current_streak: number
    total_points: number
    total_hours_learned?: number
    total_certificates_earned?: number
    experience_level?: number
  }
}

interface EditedData {
  name: string
  email: string
  username: string
  phone: string
  bio: string
  github_url: string
  linkedin_url: string
  twitter_url: string
  portfolio_url: string
  location: string
  skill_level: string
  is_public: boolean
}

export default function ProfilePage() {
  const params = useParams()
  const currentLocale = (params?.locale as string) || 'en'
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<EditedData>({
    name: '',
    email: '',
    username: '',
    phone: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    portfolio_url: '',
    location: '',
    skill_level: 'beginner',
    is_public: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await profileAPI.getProfile()
      
      if (response.success && response.data) {
        const profileData = response.data as ProfileData
        setProfileData(profileData)
        setEditedData({
          name: profileData.user.name,
          email: profileData.user.email,
          username: profileData.profile?.username || '',
          phone: profileData.profile?.phone || '',
          bio: profileData.profile?.bio || '',
          github_url: profileData.profile?.github_url || '',
          linkedin_url: profileData.profile?.linkedin_url || '',
          twitter_url: profileData.profile?.twitter_url || '',
          portfolio_url: profileData.profile?.portfolio_url || '',
          location: profileData.profile?.location || '',
          skill_level: profileData.profile?.skill_level || 'beginner',
          is_public: profileData.profile?.is_public ?? true
        })
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error('Error fetching profile:', error)
      setError(error.message)
      if (error.message.includes('Session expired') || error.message.includes('Unauthenticated')) {
        setTimeout(() => {
          window.location.href = `/${currentLocale}/login`
        }, 1000)
      }
    } finally {
      setLoading(false)
    }
  }, [currentLocale])

  useEffect(() => {
    setMounted(true)
    const token = getAuthToken()
    
    if (!token) {
      window.location.href = `/${currentLocale}/login`
      return
    }
    
    fetchProfile()
  }, [currentLocale, fetchProfile])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      if (editedData.name !== profileData?.user.name || editedData.email !== profileData?.user.email) {
        await profileAPI.updateBasicInfo({
          name: editedData.name,
          email: editedData.email
        })
      }

      await profileAPI.updateProfile(editedData)

      if (avatarFile) {
        await profileAPI.uploadAvatar(avatarFile)
        setAvatarFile(null)
        setAvatarPreview(null)
      }

      await fetchProfile()
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error('Error saving profile:', error)
      alert('Failed to save profile: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = async () => {
    try {
      if (passwordData.new_password !== passwordData.new_password_confirmation) {
        alert('Passwords do not match')
        return
      }

      await profileAPI.changePassword(passwordData)
      alert('Password changed successfully!')
      setShowPasswordModal(false)
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      alert('Failed to change password: ' + error.message)
    }
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      window.location.href = `/${currentLocale}/login`
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error && !profileData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-2 bg-green-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!profileData) return null

  const avatarUrl = avatarPreview || 
    (profileData.profile?.avatar ? `https://backend-w3university.vercel.app/storage/${profileData.profile.avatar}` : null) ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.user.name)}&size=128&background=10b981&color=fff`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="relative pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative">
                  <Image
                    src={avatarUrl}
                    alt={profileData.user.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg object-cover"
                  />
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg cursor-pointer">
                      <Upload size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {!isEditing && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <Award size={20} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="text-3xl font-bold bg-white dark:bg-gray-800 border-2 border-green-500 rounded-lg px-4 py-2 text-gray-900 dark:text-white w-full"
                        placeholder="Full Name"
                      />
                      <input
                        type="text"
                        value={editedData.username}
                        onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white w-full"
                        placeholder="@username"
                      />
                      <textarea
                        value={editedData.bio}
                        onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                        className="w-full bg-white dark:bg-gray-800 border rounded-lg p-4 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Bio"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editedData.location}
                          onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                          className="bg-white dark:bg-gray-800 border rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                          placeholder="Location"
                        />
                        <select
                          value={editedData.skill_level}
                          onChange={(e) => setEditedData({ ...editedData, skill_level: e.target.value })}
                          className="bg-white dark:bg-gray-800 border rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {profileData.user.name}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        @{profileData.profile?.username || 'username'}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {profileData.profile?.bio || 'No bio available'}
                      </p>
                      {profileData.profile?.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <MapPin size={14} />
                          <span>{profileData.profile.location}</span>
                        </div>
                      )}
                      {profileData.profile?.skill_level && (
                        <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                          {profileData.profile.skill_level.charAt(0).toUpperCase() + profileData.profile.skill_level.slice(1)}
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>Joined {profileData.user.created_at ? new Date(profileData.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {!isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                        <Edit2 size={18} />Edit
                      </button>
                      <button onClick={() => setShowPasswordModal(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                        <Lock size={18} />Password
                      </button>
                      <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                        <LogOut size={18} />Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50">
                        <Save size={18} />{saving ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setIsEditing(false)} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50">
                        <X size={18} />Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <BookOpen className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.performance?.total_courses_completed || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.performance?.total_hours_learned || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.performance?.total_certificates_earned || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Certificates</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Flame className="text-red-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.performance?.current_streak || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
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
                          value={editedData.email}
                          onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                          className="flex-1 bg-white dark:bg-gray-800 border rounded-lg px-4 py-2"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-green-500" size={20} />
                        <input
                          type="tel"
                          value={editedData.phone}
                          onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          className="flex-1 bg-white dark:bg-gray-800 border rounded-lg px-4 py-2"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Mail className="text-green-500" size={20} />
                        <span>{profileData.user.email}</span>
                      </div>
                      {profileData.profile?.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="text-green-500" size={20} />
                          <span>{profileData.profile.phone}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border">
                <h2 className="text-xl font-bold mb-6">Social Links</h2>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <input
                        type="url"
                        value={editedData.github_url}
                        onChange={(e) => setEditedData({ ...editedData, github_url: e.target.value })}
                        placeholder="GitHub URL"
                        className="w-full bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="url"
                        value={editedData.linkedin_url}
                        onChange={(e) => setEditedData({ ...editedData, linkedin_url: e.target.value })}
                        placeholder="LinkedIn URL"
                        className="w-full bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 text-sm"
                      />
                      <input
                        type="url"
                        value={editedData.twitter_url}
                        onChange={(e) => setEditedData({ ...editedData, twitter_url: e.target.value })}
                        placeholder="Twitter URL"
                        className="w-full bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 text-sm"
                      />
                    </>
                  ) : (
                    <>
                      {profileData.profile?.github_url && (
                        <a href={profileData.profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-500">
                          <Github size={20} />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                      {profileData.profile?.linkedin_url && (
                        <a href={profileData.profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-500">
                          <Linkedin size={20} />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      )}
                      {profileData.profile?.twitter_url && (
                        <a href={profileData.profile.twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-500">
                          <Twitter size={20} />
                          <span className="text-sm">Twitter</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4">Keep Learning! 🚀</h3>
                <p className="text-sm mb-4">
                  You&apos;re on a {profileData.performance?.current_streak || 0}-day streak!
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {profileData.performance?.experience_level || 1}</span>
                    <span>{profileData.performance?.total_points || 0} XP</span>
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

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <div className="space-y-4">
              <input
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border rounded-lg px-4 py-2"
                placeholder="Current Password"
              />
              <input
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border rounded-lg px-4 py-2"
                placeholder="New Password"
              />
              <input
                type="password"
                value={passwordData.new_password_confirmation}
                onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                className="w-full bg-white dark:bg-gray-800 border rounded-lg px-4 py-2"
                placeholder="Confirm Password"
              />
              <div className="flex gap-3">
                <button onClick={handlePasswordChange} className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                  Change
                </button>
                <button onClick={() => { setShowPasswordModal(false); setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' }) }} className="flex-1 px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}