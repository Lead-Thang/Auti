'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  ShoppingCart,
  FileText,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'seller',
  status: 'active',
  joinDate: '2023-01-15',
  lastActive: '2023-10-24',
  totalSpent: '$1,240',
  totalOrders: 12,
  bio: 'Experienced seller specializing in electronics and gadgets. Committed to providing excellent customer service.',
  location: 'New York, NY',
  phone: '+1 (555) 123-4567',
  verified: true,
  trustScore: 4.8,
  totalSales: 12400,
  successfulTransactions: 45,
};

// Mock related data
const mockTransactions = [
  { id: 1, date: '2023-10-20', type: 'sale', amount: '$240.00', status: 'completed' },
  { id: 2, date: '2023-10-18', type: 'sale', amount: '$180.00', status: 'completed' },
  { id: 3, date: '2023-10-15', type: 'refund', amount: '$89.99', status: 'refunded' },
];

const mockReviews = [
  { id: 1, reviewer: 'Jane Smith', rating: 5, comment: 'Great seller! Fast shipping and excellent communication.', date: '2023-10-20' },
  { id: 2, reviewer: 'Robert Johnson', rating: 4, comment: 'Good products, would buy again.', date: '2023-10-10' },
];

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState(mockUser);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [reviews, setReviews] = useState(mockReviews);

  // In a real app, you would fetch user data based on params.id
  useEffect(() => {
    // Fetch user data
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching user data for ID:', params.id);
    }
  }, [params.id]);

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserRoleColor = (role: string) => {
    switch (role) {
      case 'seller':
        return 'bg-blue-100 text-blue-800';
      case 'buyer':
        return 'bg-purple-100 text-purple-800';
      case 'freelancer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Edit User</Button>
          <Button variant="destructive">Suspend User</Button>
        </div>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getUserRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <Badge className={getUserStatusColor(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                  {user.verified && (
                    <Badge variant="secondary" className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Joined: {user.joinDate}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Last Active: {user.lastActive}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Trust Score</span>
                <span className="font-medium">{user.trustScore}/5</span>
              </div>
               <div className="flex justify-between">
                 <span className="text-gray-500">Total Sales</span>
                 <span className="font-medium">{formatCurrency(user.totalSales ?? 0)}</span>
               </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Successful Transactions</span>
                <span className="font-medium">{user.successfulTransactions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Orders</span>
                <span className="font-medium">{user.totalOrders}</span>
              </div>
            </div>
          </div>
          {user.bio && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Bio</h3>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for additional information */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-2">{transaction.date}</td>
                        <td className="py-2 capitalize">{transaction.type}</td>
                        <td className="py-2">{transaction.amount}</td>
                        <td className="py-2">
                          <Badge className={getTransactionStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>User Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div className="font-medium">{review.reviewer}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Communication Log</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Communication history with this user will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Verified</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone Verified</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ID Verified</span>
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Pending</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Business Verified</span>
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span>Not Required</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}