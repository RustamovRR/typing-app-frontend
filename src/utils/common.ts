import Cookies from 'js-cookie'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { QueryParamsType } from '@/types'
import { clearObject } from './validation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const setCookie = (name: string, value: string, options = {}): void => {
  Cookies.set(name, value, options)
}

export const queryStringUrl = (baseUrl: string, params?: QueryParamsType): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const filteredParams = clearObject(params)

  const queryString = new URLSearchParams(filteredParams).toString()
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`
}
