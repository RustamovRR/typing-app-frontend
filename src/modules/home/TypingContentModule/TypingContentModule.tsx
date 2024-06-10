'use client'

import { FC, memo } from 'react'
import { useTypingStore } from '@/store'
import { useFocusManagement, useHighlightedText, useInputManagement } from './hooks'
import { useShallow } from 'zustand/react/shallow'
import { useTypingContentsQuery } from '@/hooks/queries'

interface IProps {}

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { inputValue } = useTypingStore(useShallow(({ inputValue, text }) => ({ inputValue, text })))
  const { data } = useTypingContentsQuery()
  console.log(data)

  const highlightedText = useHighlightedText()
  const { handleInput } = useInputManagement()
  const { inputRef, handleFocus } = useFocusManagement()

  return (
    <div className="animate-fade-in">
      <input type="text" value={inputValue} onChange={handleInput} ref={inputRef} className="opacity-0" />
      <div className="border border-black p-2 text-3xl leading-10 tracking-wider" tabIndex={0} onClick={handleFocus}>
        {highlightedText}
      </div>
    </div>
  )
}

export default memo(TypingContentModule)
