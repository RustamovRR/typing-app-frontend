import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { IErrorResponse } from '@/types'

export type MutationProps<TVariables, TResult> = {
  options?: UseMutationOptions<TResult, IErrorResponse, TVariables>
}

export function useCustomMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  props?: MutationProps<TVariables, TResult>,
) {
  const { options = {} } = props ?? {}
  return useMutation<TResult, IErrorResponse, TVariables>({ ...options, mutationFn })
}
