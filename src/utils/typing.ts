export function determineCorrectness(inputValue: string, referenceText: string) {
  let correctCount = 0
  const inputLength = inputValue.length
  const referenceLength = referenceText.length
  const maxLength = Math.min(inputLength, referenceLength)

  for (let i = 0; i < maxLength; i++) {
    if (inputValue[i] === referenceText[i]) {
      correctCount++
    }
  }

  const incorrectCount = inputLength - correctCount
  return { correctCount, incorrectCount }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return remainingSeconds.toString()
  }

  const formattedMinutes = minutes.toString()
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

export function splitTextByWordCount(text: string, wordCount: number = 20) {
  const lines = text.split(' ')
  const parts: Record<number, string> = {}
  let currentIndex = 0

  while (currentIndex * wordCount < lines.length) {
    parts[currentIndex] = lines.slice(currentIndex * wordCount, (currentIndex + 1) * wordCount).join(' ')
    currentIndex++
  }

  return parts
}
