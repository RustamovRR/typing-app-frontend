'use client'

import { FC, memo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { TIMER_DURATION_OPTIONS } from '@/constants'
import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'
import { TimerDurationOptionsType } from '@/types'
import { useCalculateAccuracy, useCalculateWPM } from '@/hooks/common'

interface IProps {}

const AnalyticsHeaderModule: FC<IProps> = (): JSX.Element => {
  const { timerDuration, updateTypingState } = useTypingStore(
    useShallow(({ timerDuration, updateTypingState }) => ({ timerDuration, updateTypingState })),
  )
  const wpm = useCalculateWPM()
  const accuracy = useCalculateAccuracy()

  return (
    <div className="animate-fade-in">
      <div className="mx-auto flex w-3/5 items-center gap-3">
        <h1>Anayltics Test</h1>
        <div>WPM: {wpm}</div>
        <div>ACC: {accuracy ?? 100}%</div>
        <section className="flex items-center">
          <Tabs
            value={timerDuration.toString()}
            defaultValue={timerDuration.toString()}
            onValueChange={(value) => updateTypingState('timerDuration', Number(value) as TimerDurationOptionsType)}
          >
            <TabsList>
              {TIMER_DURATION_OPTIONS.map((time) => (
                <TabsTrigger key={time} value={time.toString()}>
                  {time}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default memo(AnalyticsHeaderModule)
