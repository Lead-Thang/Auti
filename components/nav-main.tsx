"use client"

import { ChevronRight, type LucideIcon, Home, SquareTerminal, CheckSquare, ShoppingCart, Users, DollarSign, Store, Bot, Trophy, BarChart3, MessageSquare, Calendar, Settings2, Search, Sparkles, Star, Briefcase, Shield, Wallet, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export const navMain = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
      {
        title: "Feed",
        url: "/dashboard/feed",
      },
    ],
  },
  {
    title: "Job Descriptions",
    url: "/dashboard/jd",
    icon: CheckSquare,
    items: [
      {
        title: "Browse",
        url: "/dashboard/jd",
      },
      {
        title: "My Applications",
        url: "/dashboard/jd/my-applications",
      },
      {
        title: "Saved Jobs",
        url: "/dashboard/jd/saved",
      },
    ],
  },
  {
    title: "Marketplace",
    url: "/dashboard/marketplace",
    icon: ShoppingCart,
    items: [
      {
        title: "Browse Products",
        url: "/dashboard/marketplace",
      },
      {
        title: "My Orders",
        url: "/dashboard/marketplace/orders",
      },
      {
        title: "Selling",
        url: "/dashboard/marketplace/selling",
      },
    ],
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: Users,
    items: [
      {
        title: "Forums",
        url: "/dashboard/community/forums",
      },
      {
        title: "Groups",
        url: "/dashboard/community/groups",
      },
      {
        title: "Events",
        url: "/dashboard/community/events",
      },
    ],
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: DollarSign,
    items: [
      {
        title: "Wallet",
        url: "/dashboard/payments/wallet",
      },
      {
        title: "Transactions",
        url: "/dashboard/payments/transactions",
      },
      {
        title: "Payouts",
        url: "/dashboard/payments/payouts",
      },
    ],
  },
  {
    title: "Store",
    url: "/dashboard/store",
    icon: Store,
    items: [
      {
        title: "My Store",
        url: "/dashboard/store",
      },
      {
        title: "Products",
        url: "/dashboard/store/products",
      },
      {
        title: "Orders",
        url: "/dashboard/store/orders",
      },
    ],
  },
  {
    title: "AI Assistant",
    url: "/dashboard/assistant",
    icon: Bot,
    items: [
      {
        title: "Chat",
        url: "/dashboard/assistant",
      },
      {
        title: "Documents",
        url: "/dashboard/assistant/documents",
      },
    ],
  },
  {
    title: "Certifications",
    url: "/dashboard/certifications",
    icon: Trophy,
    items: [
      {
        title: "My Certifications",
        url: "/dashboard/certifications",
      },
      {
        title: "Earn Certifications",
        url: "/dashboard/certifications/earn",
      },
    ],
  },
]

export function NavMain({ items }: { items: typeof navMain }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                  <Link href={item.url}>
                    {item.icon && <item.icon className="size-4 shrink-0" />}
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    {item.items?.length ? (
                      <>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </>
                    ) : null}
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url} className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ${pathname === subItem.url ? "bg-sidebar-accent" : ""}`}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}