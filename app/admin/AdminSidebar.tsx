'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingCart, Users, BarChart3, CreditCard, FileText, MessageSquare, Settings, User, Percent, Wallet, Shield, Mail, AlertTriangle } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/jobs', label: 'Jobs', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FileText },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/commissions', label: 'Commissions', icon: Percent },
  { href: '/admin/payouts', label: 'Payouts', icon: Wallet },
  { href: '/admin/escrow', label: 'Escrow', icon: Shield },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/support', label: 'Support', icon: Mail },
  { href: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}