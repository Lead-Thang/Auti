import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { maskEmail } from '@/lib/utils';

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 138 },
  { name: 'Mar', revenue: 2000, orders: 143 },
  { name: 'Apr', revenue: 2780, orders: 259 },
  { name: 'May', revenue: 1890, orders: 120 },
  { name: 'Jun', revenue: 2390, orders: 150 },
];

const metricCards = [
  { title: 'Total Revenue', value: '$24,569', icon: DollarSign, change: '+12.5%' },
  { title: 'Active Users', value: '1,234', icon: Users, change: '+8.2%' },
  { title: 'Total Orders', value: '342', icon: ShoppingCart, change: '+3.1%' },
  { title: 'Growth', value: '18.2%', icon: TrendingUp, change: '+2.4%' },
];

const defaultRecentActivities = [
  {
    id: 1,
    title: 'New user registered',
    description: 'j***@example.com',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'New order placed',
    description: '#ORD-001234',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    title: 'Job completed',
    description: 'Website design project',
    timestamp: '6 hours ago'
  },
  {
    id: 4,
    title: 'Payment processed',
    description: '$1,240.00',
    timestamp: '1 day ago'
  }
];

import RevenueChart from './components/RevenueChart';
import OrdersChart from './components/OrdersChart';

export default function AdminDashboard() {
  const recentActivities = defaultRecentActivities;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
                <p className={`text-xs ${metric.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{metric.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <OrdersChart data={revenueData} />
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
             {recentActivities.map((activity) => (
               <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                 <div>
                   <p className="font-medium">{activity.title}</p>
                   <p className="text-sm text-muted-foreground">{activity.description}</p>
                 </div>
                 <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
               </div>
             ))}
           </div>
         </CardContent>
      </Card>
    </div>
  );
}