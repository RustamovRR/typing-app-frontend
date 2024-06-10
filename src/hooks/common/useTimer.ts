import { useEffect, useState } from 'react'
import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useTimer = () => {
  const { isTypingStarted, timerDuration, isTypingFinished, updateTypingState } = useTypingStore(
    useShallow(({ isTypingStarted, timerDuration, isTypingFinished, updateTypingState }) => ({
      isTypingStarted,
      timerDuration,
      isTypingFinished,
      updateTypingState,
    })),
  )
  const [timer, setTimer] = useState<number>(timerDuration)

  useEffect(() => {
    setTimer(timerDuration)
  }, [timerDuration])

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    if (isTypingStarted && timer > 0) {
      timerId = setTimeout(() => setTimer((value) => value - 1), 1000)
    }
    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isTypingStarted, timer])

  useEffect(() => {
    if (timer === 0 && !isTypingFinished) {
      updateTypingState('isTypingFinished', true)
    }
  }, [isTypingFinished, timer, updateTypingState])

  return timer
}

export default useTimer
