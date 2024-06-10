'use client'

import { FC, memo } from 'react'
import { useCalculateAccuracy, useCalculateWPM } from '@/hooks/common'

interface IProps {}

const AnalyticsModule: FC<IProps> = (): JSX.Element => {
  const wpm = useCalculateWPM()
  const accuracy = useCalculateAccuracy()

  return (
    <div className="animate-fade-in">
      <div className="mx-auto flex w-3/5 items-center gap-3">
        <h1>Anayltics Test</h1>
        <div>WPM: {wpm}</div>
        <div>ACC: {accuracy ?? 100}%</div>
      </div>
    </div>
  )
}

export default memo(AnalyticsModule)
