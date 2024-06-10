import React, { FC } from 'react'
import { GithubIcon, GoogleIcon } from '@/assets/icons'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
} from '@/components/ui'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { BASE_API_URL } from '@/constants'
import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'
import { useAuthForm } from '../hooks'
import { z } from 'zod'

interface IProps {
  isLoginForm?: boolean
}

const AuthForm: FC<IProps> = ({ isLoginForm = false }) => {
  const { theme } = useTheme()
  const { form, formSchema, handleAuth, isLoginPending, isRegisterPending } = useAuthForm()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleAuth(values, isLoginForm)
  }

  return (
    <div className="mb-20 sm:w-[350px]">
      <section className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isLoginForm ? 'Akkountga kirish' : 'Yangi akkount ochish'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isLoginForm ? 'Akkountga kirish' : 'Yangi akkount ochish'} uchun pastda elektron pochtangizni kiriting
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { invalid } }) => (
                    <FormItem className="flex flex-col text-start">
                      <FormLabel htmlFor="password">Parol</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          type="password"
                          className={cn('h-9', { 'border-red-500': invalid })}
                          id="password"
                          placeholder="12345678"
                          autoComplete="new-password"
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
                disabled={isLoginPending || isRegisterPending}
              >
                {(isLoginPending || isRegisterPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoginForm
                  ? isLoginPending
                    ? 'Kirilmoqda...'
                    : 'Kirish'
                  : isRegisterPending
                    ? "Ro'yxatdan o'tilmoqda..."
                    : "Ro'yxatdan o'tish"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
      <section className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Yoki ushbular orqali</span>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <Button
          size="sm"
          variant={theme === 'dark' ? 'default' : 'outline'}
          disabled={isLoginPending || isRegisterPending}
        >
          <Link href={`${BASE_API_URL}/auth/google`} className="flex h-full w-full items-center justify-center gap-2">
            {isLoginPending || isRegisterPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
            <span>Google orqali {isLoginForm ? 'kirish' : "ro'yxatdan o'tish"}</span>
          </Link>
        </Button>
        <Button
          size="sm"
          variant={theme === 'dark' ? 'default' : 'outline'}
          disabled={isLoginPending || isRegisterPending}
        >
          <Link href={`${BASE_API_URL}/auth/github`} className="flex h-full w-full items-center justify-center gap-2">
            {isLoginPending || isRegisterPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GithubIcon />}
            <span>Github orqali {isLoginForm ? 'kirish' : "ro'yxatdan o'tish"}</span>
          </Link>
        </Button>
      </section>
    </div>
  )
}

export default AuthForm
