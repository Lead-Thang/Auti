"use client"

import { LogOut } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function SignOutButton() {
  const { signOut } = useClerk()

  const handleSignOut = () => {
    signOut(() => {
      // Redirect to home page after sign out
      window.location.href = "/"
    })
  }

  return (
    <>
      <Button 
        variant="ghost" 
        className="w-full justify-start"
        onClick={handleSignOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
      
      <DropdownMenuItem 
        className="md:hidden"
        onSelect={(e) => {
          e.preventDefault()
          handleSignOut()
        }}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  )
}