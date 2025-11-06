"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Breadcrumb from "@/components/Breadcrumb"
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  DollarSign,
  Globe,
  Key,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Info
} from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (!response.ok) {
          router.push('/login')
          return
        }
        const data = await response.json()
        if (!data.user) {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])
  const [activeTab, setActiveTab] = useState("account")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    suspiciousLogin: true
  })
  const [paymentSettings, setPaymentSettings] = useState({
    autoWithdrawal: false,
    defaultCurrency: "USD",
    currencyDisplay: "symbol"
  })
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567"
  })
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!")
  }

  const handlePasswordChange = async () => {
    if (password.new !== password.confirm) {
      toast.error("New passwords do not match!")
      return
    }

    if (password.new.length < 8) {
      toast.error("New password must be at least 8 characters long!")
      return
    }

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || `Failed to change password (${response.status})`);
        return;
      }

      toast.success("Password changed successfully!")
      setPassword({ current: "", new: "", confirm: "" })
    } catch (error) {
      toast.error("Failed to change password")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Wallet", href: "/dashboard/payments" },
            { label: "Settings", href: "/dashboard/payments/settings" }
          ]} 
        />
        
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8 text-purple-600" />
            Account Settings
          </h1>
          <p className="text-gray-600">Manage your account preferences and security</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Payment
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-6 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={password.current}
                    onChange={(e) => setPassword({...password, current: e.target.value})}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={password.new}
                    onChange={(e) => setPassword({...password, new: e.target.value})}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-gray-600">Password must be at least 8 characters long</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={password.confirm}
                    onChange={(e) => setPassword({...password, confirm: e.target.value})}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handlePasswordChange}>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactor" className="text-base font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="twoFactor"
                  checked={security.twoFactor}
                  onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="loginAlerts" className="text-base font-medium">
                    Login Alerts
                  </Label>
                  <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                </div>
                <Switch
                  id="loginAlerts"
                  checked={security.loginAlerts}
                  onCheckedChange={(checked) => setSecurity({...security, loginAlerts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="suspiciousLogin" className="text-base font-medium">
                    Suspicious Login Attempts
                  </Label>
                  <p className="text-sm text-gray-600">Get alerts for unusual login activities</p>
                </div>
                <Switch
                  id="suspiciousLogin"
                  checked={security.suspiciousLogin}
                  onCheckedChange={(checked) => setSecurity({...security, suspiciousLogin: checked})}
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Security Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Enable two-factor authentication to secure your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Regularly update your password (every 3-6 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Review your recent activity log monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Never share account credentials with others</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  id="email"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push" className="text-base font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                </div>
                <Switch
                  id="push"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms" className="text-base font-medium">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing" className="text-base font-medium">
                    Marketing Communications
                  </Label>
                  <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                </div>
                <Switch
                  id="marketing"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Notification Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>Manage your payment preferences and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoWithdrawal" className="text-base font-medium">
                    Auto-Withdrawal
                  </Label>
                  <p className="text-sm text-gray-600">Automatically withdraw earnings to your bank account</p>
                </div>
                <Switch
                  id="autoWithdrawal"
                  checked={paymentSettings.autoWithdrawal}
                  onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, autoWithdrawal: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default Currency</Label>
                <Select 
                  value={paymentSettings.defaultCurrency} 
                  onValueChange={(value) => setPaymentSettings({...paymentSettings, defaultCurrency: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="VND">VND - Vietnamese Dong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="currencyDisplay">Currency Display</Label>
                <Select 
                  value={paymentSettings.currencyDisplay} 
                  onValueChange={(value) => setPaymentSettings({...paymentSettings, currencyDisplay: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="symbol">$ Symbol</SelectItem>
                    <SelectItem value="code">USD Code</SelectItem>
                    <SelectItem value="full">Full Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-yellow-600" />
                Payment Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertDescription className="text-blue-700">
                  All payment information is securely encrypted using PCI DSS Level 1 standards. 
                  We never store your full card details on our servers.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Current Security Level</h4>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">High</Badge>
                  <span>PCI DSS Compliant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}