import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IErrorResponse, QueryParamsType } from '@/types'

export type QueryProps<T> = {
  params?: QueryParamsType
  options?: Omit<UseQueryOptions<T, IErrorResponse>, 'queryKey'>
}

type QueryFunction<T> = (...args: object[]) => Promise<T> | T

export function useGetQuery<T, F extends QueryFunction<T> = QueryFunction<T>>(
  key: string,
  queryFn: F,
  args?: Parameters<F>, // custom params
  props?: QueryProps<T>, // common params like limit, offset
) {
  const { params, options = {} } = props ?? {}
  const queryKey = params ? [key, params] : [key, ...(args || [])]

  return useQuery<T, IErrorResponse>({
    queryKey,
    queryFn: () => queryFn(...(params ? [params] : args || [])),
    ...options,
  })
}
