'use client'

import { useTimer } from '@/hooks/common'
import { useTypingStore } from '@/store'
import { AnalyticsModule, TypingContentModule, TypingSettingsModule } from '@/modules/home'
import { formatTime } from '@/utils'
import { useShallow } from 'zustand/react/shallow'

export default function Home() {
  const { isTypingStarted, isTypingFinished } = useTypingStore(
    useShallow(({ isTypingStarted, isTypingFinished }) => ({ isTypingStarted, isTypingFinished })),
  )
  const timer = useTimer()
  const timerInMinutes = formatTime(timer)

  return (
    <div className="mt-6">
      {!isTypingStarted && !isTypingFinished && (
        <div className="animate-fade-in">
          <TypingSettingsModule />
        </div>
      )}
      {isTypingStarted && !isTypingFinished && (
        <div className="animate-fade-in text-center">
          <h1 className="text-6xl">{timerInMinutes}</h1>
        </div>
      )}

      {!isTypingFinished && (
        <div className="animate-fade-in">
          <TypingContentModule />
        </div>
      )}

      {isTypingFinished && (
        <div className="animate-fade-in">
          <AnalyticsModule />
        </div>
      )}
    </div>
  )
}
