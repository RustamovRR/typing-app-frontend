'use client'

import { Button, Skeleton } from '@/components/ui'
import { useAppStore } from '@/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useUserProfileQuery } from '@/hooks/queries'
import Image from 'next/image'

const AuthButton = () => {
  const { isLoading } = useAppStore(
    useShallow(({ isLoading }) => ({
      isLoading,
    })),
  )
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login'
  const { data, isLoading: isUserLoading } = useUserProfileQuery()
  const profile = data?.data

  return (
    <div>
      {isUserLoading ? (
        <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
      ) : data?.status ? (
        <Link href="/profile">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              width={40}
              height={40}
              src={profile?.photo || ''}
              alt={profile?.fullName || profile?.username || profile?.email || ''}
            />
          </div>
        </Link>
      ) : isLoading ? (
        <Button variant="outline" disabled>
          {isLoginPage ? "Ro'yxatdan o'tish" : 'Login'}{' '}
        </Button>
      ) : (
        <Link href={isLoginPage ? '/auth/register' : '/auth/login'}>
          <Button variant="outline">{isLoginPage ? "Ro'yxatdan o'tish" : 'Login'} </Button>
        </Link>
      )}
    </div>
  )
}

export default AuthButton
