import React, { useEffect } from 'react'
import { useToast } from '@/components/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation, useUserRegisterMutation } from '@/hooks/mutations'
import { CircleCheck, CircleX } from 'lucide-react'
import { useAppStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useAuthForm = () => {
  const { updateAppStore } = useAppStore(useShallow(({ updateAppStore }) => ({ updateAppStore })))
  const { mutateAsync: loginAsync, isPending: isLoginPending } = useLoginMutation()
  const { mutateAsync: registerAsync, isPending: isRegisterPending } = useUserRegisterMutation()
  const { toast } = useToast()

  useEffect(() => {
    updateAppStore('isLoading', isLoginPending || isRegisterPending)
  }, [isLoginPending, isRegisterPending, updateAppStore])

  const formSchema = z.object({
    email: z.string().email({ message: 'Emailni kiritish majburiy!' }),
    password: z
      .string({ message: 'Parolni kiritish majburiy!' })
      .min(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak!" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleAuth = async (values: z.infer<typeof formSchema>, isLoginForm: boolean) => {
    if (isLoginForm) {
      return await handleLogin(values)
    } else {
      return await handleRegister(values)
    }
  }

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const { message, status } = await loginAsync(values)
    triggerToast(status, message)
    return status
  }

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    const { status, message } = await registerAsync(values)
    triggerToast(status, message)
    return status
  }

  const triggerToast = (status: boolean, message?: string) => {
    toast({
      description: (
        <div className="flex items-center gap-2">
          {status ? <CircleCheck className="rounded-xl text-green-500" /> : <CircleX className="" />}
          <span>{message}</span>
        </div>
      ),
      duration: 2000,
      variant: status ? 'default' : 'destructive',
    })
  }

  return { form, formSchema, handleAuth, isLoginPending, isRegisterPending }
}

export default useAuthForm
