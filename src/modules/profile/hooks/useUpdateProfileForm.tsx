import React, { useEffect } from 'react'
import { useToast } from '@/components/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserUpdateProfile } from '@/hooks/mutations'
import { CircleCheck, CircleX } from 'lucide-react'
import { useAppStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useUpdateProfileForm = () => {
  const { updateAppStore } = useAppStore(useShallow((state) => state))
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUserUpdateProfile()
  const { toast } = useToast()

  useEffect(() => {
    updateAppStore('isLoading', isUpdatePending)
  }, [isUpdatePending, updateAppStore])

  const formSchema = z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string().email({ message: 'Emailni kiritish majburiy!' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
    },
  })

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    const { message, status } = await updateAsync(values)
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

  return { form, formSchema, handleUpdate, isUpdatePending }
}

export default useUpdateProfileForm
