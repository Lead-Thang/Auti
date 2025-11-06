"use client"

import * as React from "react"
import {
  ArrowUpCircle,
  BarChart,
  Camera,
  ClipboardList,
  Database,
  FileCode,
  File,
  FileText,
  Folder,
  HelpCircle,
  LayoutDashboard,
  List,
  Search,
  Settings,
  Settings2,
  LifeBuoy,
  Frame,
  PieChart,
  Map,
  User
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from '@clerk/nextjs'
import { navMain } from './nav-main'

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: navMain,
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const { state } = useSidebar()
  
  // Update user data with Clerk user info
  const userData = user ? {
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses[0]?.emailAddress || 'User',
    email: user.emailAddresses[0]?.emailAddress || '',
    avatar: user.imageUrl || '/avatars/shadcn.jpg',
  } : data.user

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
          <div className="flex aspect-square bg-gradient-to-br from-blue-600 to-purple-700 size-8 items-center justify-center rounded-md text-primary-foreground">
            <img src="/logo.png" alt="Autilance logo" className="size-5" />
          </div>
          <div className="text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">Autilance</span>
          </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <div className="w-full -mx-2">
          <NavSecondary items={data.navSecondary} />
        </div>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}