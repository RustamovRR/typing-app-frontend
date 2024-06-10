export type TimerDurationOptionsType = 15 | 30 | 60 | 120

export interface ITypingContent {
  readonly id: number
  doctor: string
  start_time: string
  end_time: string
  status: boolean
  client: number
}
