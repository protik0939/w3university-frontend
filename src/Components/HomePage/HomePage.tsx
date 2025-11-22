'use client'
import React from 'react'
import Navbar from '../NavBar/Navbar'
import HeroFloatingActions from './HeroFloatingActions'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import CoursesSection from './CoursesSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import Footer from '../Footer/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors">
      <Navbar />
      <HeroFloatingActions />
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
