import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useCalculateWPM = () => {
  const { timerDuration, isTypingStarted, correctChars } = useTypingStore(
    useShallow(({ timerDuration, isTypingStarted, correctChars }) => ({
      timerDuration,
      isTypingStarted,
      correctChars,
    })),
  )

  if (!isTypingStarted) {
    return
  }

  const minutes = timerDuration / 60
  return correctChars / 5 / minutes
}

export default useCalculateWPM
