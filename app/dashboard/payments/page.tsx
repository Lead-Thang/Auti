"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Calendar, 
  CreditCard,
  Settings,
  History,
  Send,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Plus,
  User
} from "lucide-react"

// Mock data for the dashboard
const mockBalance = {
  total: 523450,
  currency: "USD",
  last30Days: 75
}

const mockRecentTransactions = [
  {
    id: "1",
    type: "incoming",
    amount: 10000,
    description: "Payment from Client",
    date: "2025-11-05",
    status: "completed",
    counterparty: {
      name: "John Doe",
      image: "/avatars/01.png"
    }
  },
  {
    id: "2",
    type: "outgoing",
    amount: 5000,
    description: "Transfer to Savings",
    date: "2025-11-04",
    status: "completed",
    counterparty: {
      name: "Savings Account",
      image: "/avatars/02.png"
    }
  },
  {
    id: "3",
    type: "incoming",
    amount: 2500,
    description: "Refund",
    date: "2025-11-03",
    status: "completed",
    counterparty: {
      name: "Store Refund",
      image: "/avatars/03.png"
    }
  },
  {
    id: "4",
    type: "outgoing",
    amount: 15000,
    description: "Business Purchase",
    date: "2025-11-02",
    status: "pending",
    counterparty: {
      name: "Office Supplies",
      image: "/avatars/04.png"
    }
  }
]

const mockMonthlyEarnings = [
  { month: "Nov", year: 2025, amount: 125000, transactions: 24 },
  { month: "Oct", year: 2025, amount: 118000, transactions: 22 },
  { month: "Sep", year: 2025, amount: 132000, transactions: 28 },
  { month: "Aug", year: 2025, amount: 105000, transactions: 20 },
  { month: "Jul", year: 2025, amount: 98000, transactions: 18 },
]

const mockStats = {
  totalEarned: 253450,
  available: 125000,
  pending: 7500,
  paymentsCount: 142
}

export default function PaymentsDashboard() {
  const [activeTab, setActiveTab] = useState("wallet")
  const [searchQuery, setSearchQuery] = useState("")
  
  const formatAmount = (amountCents: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amountCents / 100)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800"><Clock className="w-3 h-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wallet className="w-8 h-8 text-purple-600" />
            Wallet Dashboard
          </h1>
          <p className="text-gray-600">Manage your finances and transactions</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" /> Wallet
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Cards
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" /> History
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Wallet Tab Content */}
        <TabsContent value="wallet" className="space-y-6 mt-6">
          {/* Main Balance Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Current Balance</span>
                <Button variant="secondary" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Funds
                </Button>
              </CardTitle>
              <CardDescription>Your available balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center my-6">
                {formatAmount(mockBalance.total, mockBalance.currency)}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last 30 days:</span>
                  <span className="text-sm font-medium">+75%</span>
                </div>
                <Progress value={mockBalance.last30Days} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <Button className="flex flex-col py-6">
                    <Send className="w-6 h-6 mb-2" />
                    <span>Send Money</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col py-6">
                    <DollarSign className="w-6 h-6 mb-2" />
                    <span>Request</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col py-6">
                    <TrendingDown className="w-6 h-6 mb-2" />
                    <span>Withdraw</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Earned
                </CardTitle>
                <DollarSign className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatAmount(mockStats.totalEarned)}
                </div>
                <p className="text-xs text-gray-600 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Available
                </CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatAmount(mockStats.available)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Ready to withdraw</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Pending
                </CardTitle>
                <Clock className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {formatAmount(mockStats.pending)}
                </div>
                <p className="text-xs text-gray-600 mt-1">In escrow</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Payments
                </CardTitle>
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStats.paymentsCount}
                </div>
                <p className="text-xs text-gray-600 mt-1">Total transactions</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4 mr-1" />
                More
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={transaction.counterparty.image} />
                        <AvatarFallback>
                          {transaction.counterparty.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{transaction.counterparty.name}</span>
                          <span>•</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === "incoming" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "incoming" ? "+" : "-"}
                        {formatAmount(transaction.amount, "USD")}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Monthly Earnings
              </CardTitle>
              <CardDescription>
                Your earnings breakdown by month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMonthlyEarnings.slice(0, 6).map((month, index) => (
                  <div key={`${month.year}-${month.month}`} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{month.month} {month.year}</p>
                      <p className="text-xs text-gray-600">{month.transactions} transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatAmount(month.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cards Tab Content */}
        <TabsContent value="cards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Cards</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Credit Card</h3>
                      <p className="text-sm text-gray-600">**** 4832</p>
                    </div>
                    <Badge>Primary</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Expiry: 12/27</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Debit Card</h3>
                      <p className="text-sm text-gray-600">**** 5281</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Expiry: 08/28</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Start date"
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="End date"
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                {mockRecentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={transaction.counterparty.image} />
                        <AvatarFallback>
                          {transaction.counterparty.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{transaction.counterparty.name}</span>
                          <span>•</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === "incoming" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "incoming" ? "+" : "-"}
                        {formatAmount(transaction.amount, "USD")}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab Content */}
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-600">Receive alerts for transactions</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Currency Preferences</h3>
                    <p className="text-sm text-gray-600">Default currency for transactions</p>
                  </div>
                  <Select defaultValue="USD">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="VND">VND</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Withdrawal</h3>
                    <p className="text-sm text-gray-600">Automatically withdraw earnings</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}