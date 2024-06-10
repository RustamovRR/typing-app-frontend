import { useEffect } from 'react'
import { useSoundStore, useTypingStore } from '@/store'
import { splitTextByWordCount, cn } from '@/utils'
import { useShallow } from 'zustand/react/shallow'
import { useTypingSound } from '@/hooks/common'

const useHighlightedText = () => {
  const { valueLength, inputValue, isTyping, text, currentTextPartIndex, updateTypingState } = useTypingStore(
    useShallow(({ valueLength, inputValue, isTyping, text, currentTextPartIndex, updateTypingState }) => ({
      valueLength,
      inputValue,
      isTyping,
      text,
      currentTextPartIndex,
      updateTypingState,
    })),
  )
  const { isDisabledTypingSound, isDisabledErrorTypingSound } = useSoundStore(
    useShallow(({ isDisabledTypingSound, isDisabledErrorTypingSound }) => ({
      isDisabledTypingSound,
      isDisabledErrorTypingSound,
    })),
  )

  const { playTypingSound, playErrorSound } = useTypingSound()

  const textParts = splitTextByWordCount(text)
  const textPartsLength = Object.keys(textParts).length
  const currentPart = textParts[currentTextPartIndex]

  useEffect(() => {
    if (inputValue.length > currentPart.length) {
      const newPartIndex = currentTextPartIndex < textPartsLength - 1 ? currentTextPartIndex + 1 : 0
      updateTypingState('currentTextPartIndex', newPartIndex)
      updateTypingState('inputValue', '')
      updateTypingState('valueLength', 0)
    }
  }, [inputValue, currentPart, currentTextPartIndex, textPartsLength, updateTypingState])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        const correctChar = currentPart[valueLength] === event.key
        if (correctChar) {
          !isDisabledTypingSound && playTypingSound()
        } else {
          !isDisabledErrorTypingSound && playErrorSound()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentPart, valueLength, playTypingSound, playErrorSound, isDisabledTypingSound, isDisabledErrorTypingSound])

  const words = currentPart?.split(' ')
  let currentIndex = 0
  let globalCharIndex = 0

  return words?.map((word, wordIndex) => {
    const wordElements = word.split('').map((char, charIndexInWord) => {
      globalCharIndex = currentIndex + charIndexInWord

      return (
        <span
          key={charIndexInWord}
          className={cn('relative inline-block text-gray-500', {
            'before:absolute before:-left-[2.5px] before:top-1 before:ml-[1.5px] before:h-8 before:w-[3px] before:rounded-sm before:bg-green-500 before:content-[""]':
              globalCharIndex === valueLength,
            'before:animate-blink': globalCharIndex === valueLength && !isTyping,
            'text-white': inputValue[globalCharIndex] === char,
            'text-red-500': inputValue[globalCharIndex] !== char && globalCharIndex < inputValue.length,
          })}
        >
          {char}
        </span>
      )
    })

    currentIndex += word.length + 1
    return (
      <div key={wordIndex} className="mr-2 inline-block">
        {wordElements}
        <span
          className={cn('relative inline-block', {
            'before:absolute before:-bottom-1.5 before:-left-[2.5px] before:ml-0.5 before:h-8 before:w-[3px] before:rounded-sm before:bg-green-500 before:content-[""]':
              globalCharIndex + 1 === valueLength,
            'before:animate-blink': globalCharIndex + 1 === valueLength && !isTyping,
          })}
        ></span>
        {wordIndex < words.length - 1 && <span className="inline-block"> </span>}
      </div>
    )
  })
}

export default useHighlightedText
