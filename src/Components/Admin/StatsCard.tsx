'use client'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  color: 'green' | 'blue' | 'purple' | 'orange'
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const colors = {
    green: 'from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-400',
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-400',
    orange: 'from-orange-500/10 to-yellow-500/10 border-orange-500/30 text-orange-400',
  }

  const iconBg = {
    green: 'bg-gradient-to-br from-green-400 to-emerald-400',
    blue: 'bg-gradient-to-br from-blue-400 to-cyan-400',
    purple: 'bg-gradient-to-br from-purple-400 to-pink-400',
    orange: 'bg-gradient-to-br from-orange-400 to-yellow-400',
  }

  return (
    <div className={`relative bg-gradient-to-br ${colors[color]} backdrop-blur-sm border rounded-xl p-6 overflow-hidden group hover:scale-105 transition-transform`}>
      {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 ${iconBg[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
