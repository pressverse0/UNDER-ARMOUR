'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Determine icon based on variant
        let Icon = Info
        if (variant === 'success') Icon = CheckCircle
        if (variant === 'destructive') Icon = AlertCircle

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-4 w-full">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="h-6 w-6 stroke-[3]" />
              </div>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
