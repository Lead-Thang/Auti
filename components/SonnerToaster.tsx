"use client"

import { Toaster as SonnerToaster } from "sonner"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

export function SonnerToasterWrapper({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme="system"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white border-gray-200 text-gray-900",
          description: "text-gray-600",
          actionButton: "bg-purple-600 text-white hover:bg-purple-700",
          cancelButton: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        },
      }}
      {...props}
    />
  )
}