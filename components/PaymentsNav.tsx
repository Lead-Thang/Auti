"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wallet,
  CreditCard,
  History,
  Settings,
  Send,
  TrendingUp,
  DollarSign,
  Shield,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/hooks/use-user"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number
}

interface PaymentsNavProps {
  user?: {
    name?: string
    email?: string
    avatar?: string
    initials?: string
  }
}

const navItems: NavItem[] = [
  { title: "Wallet", href: "/dashboard/payments", icon: Wallet },
  { title: "Send Money", href: "/dashboard/payments/send", icon: Send },
  { title: "Cards", href: "/dashboard/payments/cards", icon: CreditCard },
  { title: "Transactions", href: "/dashboard/payments/transactions", icon: History },
  { title: "Earnings", href: "/dashboard/payments/earnings", icon: TrendingUp, badge: 3 },
  { title: "Escrow", href: "/dashboard/payments/escrow", icon: Shield },
  { title: "Settings", href: "/dashboard/payments/settings", icon: Settings },
]

export default function PaymentsNav({ user: propUser }: PaymentsNavProps = {}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user: contextUser } = useUser()

  // Use prop user if provided, otherwise use context user
  const user = propUser || contextUser

  // Generate initials from name if not provided
  const getInitials = (name?: string) => {
    if (!name) return "GU"
    const parts = name.trim().split(" ")
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar for larger screens */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-gray-200">
            <div className="p-2 bg-purple-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">AutiFinance</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"))
                
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start ${
                          isActive 
                            ? "bg-purple-50 text-purple-700 border-r-2 border-purple-600" 
                            : ""
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.title}
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

           {/* User Profile */}
           <div className="p-4 border-t border-gray-200">
             <div className="flex items-center gap-3">
               <Avatar>
                 <AvatarImage src={user?.avatar} />
                 <AvatarFallback>{(user as any)?.initials || getInitials(user?.name)}</AvatarFallback>
               </Avatar>
               <div>
                 <p className="font-medium">{user?.name || "Guest"}</p>
                 <p className="text-sm text-gray-600">{user?.email || ""}</p>
               </div>
             </div>
           </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}