type NavigationTypes = {
  count: number
  next: number | null
  previous: number | null
}

export type QueryParamsType = Partial<{
  limit: number
  type_ides: string
  tag_id: string
  offset: number
}>

export type GetResponseType<T> = NavigationTypes & {
  results: T
}

export type GetResponseWithStatusType<T> = {
  data: T
  status: string
}

export interface IErrorResponse {
  data: string
  name: string
}
