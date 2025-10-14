'use client'
import React from 'react'
import BlurText from '../Others/BlurText'
import Aurora from '../Aurora'
import { useTranslations } from 'next-intl';
import TextType from '../TextType';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div className='-z-50 w-full h-full relative'>
        <Aurora
          colorStops={["#2E964C", "#2E964C", "#2E964C"]}
          blend={.5}
          amplitude={0.5}
          speed={0.3}
        />
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none'>
        <div className='flex flex-col items-center justify-center'>
          <BlurText
            text={t("welcome")}
            delay={150}
            animateBy="words"
            direction="top"
            className="md:text-5xl text-xl mb-8 text-center"
          />
          <TextType
            text={[t("text-1"), t("text-2"), t("text-3"), t("text-4"), t("text-5"), t("text-6"), t("text-7"), t("text-8"), t("text-9"), t("text-10")]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

      </div>
    </div>
  )
}
