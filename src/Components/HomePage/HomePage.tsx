import React from 'react'
import BlurText from '../Others/BlurText'
import Aurora from '../Aurora'
import { useTranslations } from 'next-intl';

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
            text={t('welcome')}
            delay={150}
            animateBy="words"
            direction="top"
            className="md:text-5xl text-xl mb-8 text-center"
          />
        </div>

      </div>
    </div>
  )
}
