'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Settings, 
  CreditCard, 
  Users, 
  Package, 
  MessageSquare, 
  Shield, 
  Globe, 
  Mail, 
  Key,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Autilance',
    siteDescription: 'All-in-one platform for e-commerce, freelancing, and networking',
    siteEmail: 'admin@autilance.com',
    siteUrl: 'https://autilance.com',
    currency: 'USD',
    timezone: 'UTC',
    maintenanceMode: false,
    registrationEnabled: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    defaultCommission: 5,
    stripeEnabled: true,
    paypalEnabled: true,
    bankTransferEnabled: true,
    minimumPayout: 20,
    payoutFrequency: 'weekly',
  });

  const [userSettings, setUserSettings] = useState({
    emailVerificationRequired: true,
    phoneVerificationRequired: false,
    businessVerificationRequired: false,
    maxLoginAttempts: 5,
    accountLockoutTime: 30,
  });

  const handleGeneralSettingChange = (name: string, value: string | boolean) => {
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSettingChange = (name: string, value: string | number | boolean) => {
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSettingChange = (name: string, value: string | boolean) => {
    setUserSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-8 w-8 mr-3 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <p className="text-gray-500">Manage your platform configuration</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => handleGeneralSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={generalSettings.currency} onValueChange={(value) => handleGeneralSettingChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="siteEmail">Admin Email</Label>
                  <Input
                    id="siteEmail"
                    value={generalSettings.siteEmail}
                    onChange={(e) => handleGeneralSettingChange('siteEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => handleGeneralSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => handleGeneralSettingChange('siteDescription', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={generalSettings.siteUrl}
                  onChange={(e) => handleGeneralSettingChange('siteUrl', e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Temporarily disable public access</p>
                </div>
                <Switch
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleGeneralSettingChange('maintenanceMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Registration Enabled</Label>
                  <p className="text-sm text-gray-500">Allow new user registrations</p>
                </div>
                <Switch
                  checked={generalSettings.registrationEnabled}
                  onCheckedChange={(checked) => handleGeneralSettingChange('registrationEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultCommission">Default Commission (%)</Label>
                  <Input
                    id="defaultCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={paymentSettings.defaultCommission}
                    onChange={(e) => handlePaymentSettingChange('defaultCommission', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="minimumPayout">Minimum Payout Amount</Label>
                  <Input
                    id="minimumPayout"
                    type="number"
                    min="1"
                    value={paymentSettings.minimumPayout}
                    onChange={(e) => handlePaymentSettingChange('minimumPayout', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Payout Frequency</Label>
                  <Select value={paymentSettings.payoutFrequency} onValueChange={(value) => handlePaymentSettingChange('payoutFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payment Methods</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => handlePaymentSettingChange('stripeEnabled', checked)}
                    />
                    <span>Stripe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(checked) => handlePaymentSettingChange('paypalEnabled', checked)}
                    />
                    <span>PayPal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={paymentSettings.bankTransferEnabled}
                      onCheckedChange={(checked) => handlePaymentSettingChange('bankTransferEnabled', checked)}
                    />
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={userSettings.maxLoginAttempts}
                    onChange={(e) => handleUserSettingChange('maxLoginAttempts', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="accountLockoutTime">Account Lockout Time (min)</Label>
                  <Input
                    id="accountLockoutTime"
                    type="number"
                    min="1"
                    value={userSettings.accountLockoutTime}
                    onChange={(e) => handleUserSettingChange('accountLockoutTime', Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Verification Requirements</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={userSettings.emailVerificationRequired}
                      onCheckedChange={(checked) => handleUserSettingChange('emailVerificationRequired', checked)}
                    />
                    <span>Email Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={userSettings.phoneVerificationRequired}
                      onCheckedChange={(checked) => handleUserSettingChange('phoneVerificationRequired', checked)}
                    />
                    <span>Phone Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={userSettings.businessVerificationRequired}
                      onCheckedChange={(checked) => handleUserSettingChange('businessVerificationRequired', checked)}
                    />
                    <span>Business Verification</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-gray-500">Duration before automatic logout (minutes)</p>
                </div>
                <div>
                  <Label>Security Logs</Label>
                  <p className="text-sm text-gray-500">Keep detailed logs of security events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/minute)</Label>
                  <Input id="apiRateLimit" type="number" defaultValue="100" />
                </div>
                <div>
                  <Label>API Access</Label>
                  <p className="text-sm text-gray-500">Control public API access</p>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}