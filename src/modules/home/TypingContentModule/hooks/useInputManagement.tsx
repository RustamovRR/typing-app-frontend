import { ChangeEvent, useCallback } from 'react'
import { useTypingStore } from '@/store'
import { determineCorrectness } from '@/utils'
import { useShallow } from 'zustand/react/shallow'

const useInputManagement = () => {
  const { text, updateTypingState } = useTypingStore(
    useShallow(({ text, updateTypingState }) => ({ text, updateTypingState })),
  )

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      updateTypingState('inputValue', value)
      updateTypingState('valueLength', value.length)
      updateTypingState('isTyping', true)

      const { correctCount, incorrectCount } = determineCorrectness(value, text)
      updateTypingState('totalChars', value.length)
      updateTypingState('correctChars', correctCount)
      updateTypingState('incorrectChars', incorrectCount)
    },
    [text, updateTypingState],
  )

  return { handleInput }
}

export default useInputManagement
