"use client"

import React from "react"

import { Toaster as SonnerToaster } from "sonner"

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

export function SonnerToasterWrapper({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme="system"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100",
          description: "text-gray-600 dark:text-gray-400",
          actionButton: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
          cancelButton: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600",
        },
      }}
      {...props}
    />
  )
}