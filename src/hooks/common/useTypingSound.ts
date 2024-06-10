import { useCallback, useEffect, useRef } from 'react'
import typingSound from '@/assets/sounds/typing_1.wav'
import typingErrorSound from '@/assets/sounds/typing_error_1.wav'

const useTypingSound = () => {
  const typingAudioRef = useRef<HTMLAudioElement | null>(null)
  const errorAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      typingAudioRef.current = new Audio(typingSound)
      errorAudioRef.current = new Audio(typingErrorSound)
    }
  }, [])

  const playTypingSound = useCallback(() => {
    if (typingAudioRef.current) {
      typingAudioRef.current.currentTime = 0
      typingAudioRef.current.play()
    }
  }, [])

  const playErrorSound = useCallback(() => {
    if (errorAudioRef.current) {
      errorAudioRef.current.currentTime = 0
      errorAudioRef.current.play()
    }
  }, [])

  return { playTypingSound, playErrorSound }
}

export default useTypingSound
