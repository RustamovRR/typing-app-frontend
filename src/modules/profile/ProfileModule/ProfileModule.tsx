'use client'

import React, { useEffect } from 'react'
import { z } from 'zod'
import { useTheme } from 'next-themes'
import { Loader2 } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, Button } from '@/components/ui'
import { cn } from '@/utils'
import { useUpdateProfileForm } from '../hooks'
import { useUserProfileQuery } from '@/hooks/queries'

const ProfileModule = () => {
  const { theme } = useTheme()
  const { form, formSchema, handleUpdate, isUpdatePending } = useUpdateProfileForm()
  const { data } = useUserProfileQuery()
  const profile = data?.data

  useEffect(() => {
    if (profile) {
      form.setValue('fullName', profile.fullName)
      form.setValue('username', profile.username)
      form.setValue('email', profile.email)
    }
  }, [form, profile])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleUpdate(values)
  }

  return (
    <div className="flex animate-fade-in items-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-2/5 flex-col gap-5">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel htmlFor="fullName">To'liq ism</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="fullName"
                        className={cn('h-9', { 'border-red-500': invalid })}
                        id="fullName"
                        placeholder="Ali Valiyev"
                        autoComplete="fullName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="username"
                        className={cn('h-9', { 'border-red-500': invalid })}
                        id="username"
                        placeholder="Ali Valiyev"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { invalid } }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled
                        className={cn('h-9', { 'border-red-500': invalid })}
                        id="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="sm"
              type="submit"
              variant={theme === 'dark' ? 'default' : 'outline'}
              disabled={isUpdatePending}
            >
              {isUpdatePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yangilash
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProfileModule
