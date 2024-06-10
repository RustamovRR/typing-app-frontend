import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useCalculateAccuracy = () => {
  const { totalChars, correctChars } = useTypingStore(
    useShallow(({ totalChars, correctChars }) => ({ totalChars, correctChars })),
  )

  if (totalChars === 0) return
  const accuracy = (correctChars / totalChars) * 100

  return accuracy.toFixed(0)
}

export default useCalculateAccuracy
