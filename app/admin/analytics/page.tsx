'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data for analytics
const revenueData = [
  { name: 'Jan', revenue: 4000, orders: 240, users: 120 },
  { name: 'Feb', revenue: 3000, orders: 138, users: 98 },
  { name: 'Mar', revenue: 2000, orders: 143, users: 85 },
  { name: 'Apr', revenue: 2780, orders: 259, users: 156 },
  { name: 'May', revenue: 1890, orders: 120, users: 78 },
  { name: 'Jun', revenue: 2390, orders: 150, users: 102 },
  { name: 'Jul', revenue: 3490, orders: 280, users: 167 },
  { name: 'Aug', revenue: 4200, orders: 321, users: 198 },
  { name: 'Sep', revenue: 3800, orders: 290, users: 182 },
  { name: 'Oct', revenue: 5200, orders: 410, users: 245 },
];

const metricCards = [
  { title: 'Total Revenue', value: '$24,569', icon: DollarSign, change: '+12.5%', isPositive: true },
  { title: 'Active Users', value: '1,234', icon: Users, change: '+8.2%', isPositive: true },
  { title: 'Total Orders', value: '342', icon: ShoppingBag, change: '+3.1%', isPositive: true },
  { title: 'Growth', value: '18.2%', icon: TrendingUp, change: '+2.4%', isPositive: true },
];

const topSellingProducts = [
  { id: 1, name: 'Wireless Headphones', sales: 124, revenue: 10200 },
  { id: 2, name: 'Smart Watch', sales: 89, revenue: 22000 },
  { id: 3, name: 'Cotton T-Shirt', sales: 342, revenue: 6500 },
  { id: 4, name: 'Coffee Maker', sales: 67, revenue: 5200 },
  { id: 5, name: 'Yoga Mat', sales: 156, revenue: 5400 },
];

const userActivity = [
  { name: 'Mon', active: 40, new: 24, returning: 24 },
  { name: 'Tue', active: 30, new: 13, returning: 17 },
  { name: 'Wed', active: 20, new: 14, returning: 10 },
  { name: 'Thu', active: 27, new: 12, returning: 15 },
  { name: 'Fri', active: 18, new: 8, returning: 10 },
  { name: 'Sat', active: 23, new: 10, returning: 13 },
  { name: 'Sun', active: 34, new: 15, returning: 19 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="orders" fill="#10b981" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="active" stackId="1" stroke="#8884d8" fill="#8884d8" name="Active Users" />
                <Area type="monotone" dataKey="new" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="New Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Order Conversion Rate</span>
                <span className="font-medium">3.24%</span>
              </div>
              <div className="flex justify-between">
                <span>Cart Abandonment Rate</span>
                <span className="font-medium">68.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Acquisition Cost</span>
                <span className="font-medium">$24.50</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Lifetime Value</span>
                <span className="font-medium">$124.30</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Sessions</span>
                <Badge variant="secondary">1,234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg. Session Duration</span>
                <span className="font-medium">4m 23s</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bounce Rate</span>
                <span className="font-medium text-red-500">42.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Page Load Time</span>
                <span className="font-medium text-green-500">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New order placed</p>
                  <p className="text-sm text-gray-500">#ORD-001234</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">4 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">New partnership formed</p>
                  <p className="text-sm text-gray-500">Tech Startup & Marketing Agency</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">6 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Payment processed</p>
                  <p className="text-sm text-gray-500">$1,240.00</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}