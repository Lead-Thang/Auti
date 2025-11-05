"use client"

import * as React from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavUser } from "@/components/nav-user"
import { Search } from "@/components/search"
import { useUser } from "@clerk/nextjs"

export function SiteHeader() {
  const { state: sidebarState } = useSidebar()
  const isSidebarCollapsed = sidebarState === "collapsed"

  const [localUser, setLocalUser] = React.useState({
    name: "User",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  });

  const { user: clerkUser, isLoaded } = useUser();

  // Update user info when Clerk user changes
  React.useEffect(() => {
    if (isLoaded && clerkUser) {
      setLocalUser({
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || "User",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        avatar: clerkUser.imageUrl || "/avatars/shadcn.jpg",
      });
    } else if (isLoaded && !clerkUser) {
      // Handle sign out - reset to default user state
      setLocalUser({
        name: "Guest",
        email: "",
        avatar: "/avatars/shadcn.jpg",
      });
    }
  }, [clerkUser, isLoaded]);

  return (
    <header 
      className={`group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear w-full border-border/50 bg-background supports-[backdrop-filter]:bg-background sticky top-0 z-40 ${
        isSidebarCollapsed ? 'h-12' : 'h-14'
      }`}
    >
      <div className={`flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ${isSidebarCollapsed ? 'gap-2' : 'gap-4'}`}>
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="flex-1 flex justify-center items-center">
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavUser user={localUser} />
        </div>
      </div>
    </header>
  )
}