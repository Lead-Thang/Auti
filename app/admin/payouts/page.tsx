'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../../components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Search, Eye, DollarSign, TrendingUp, TrendingDown, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock data for payouts
const mockPayouts = [
  { id: '#PAYOUT-001', seller: 'Tech Store', amount: 2450.75, method: 'Bank Transfer', status: 'completed', date: '2023-10-20', fee: 25.00, currency: 'USD' },
  { id: '#PAYOUT-002', seller: 'Gadget World', amount: 1200.50, method: 'PayPal', status: 'completed', date: '2023-10-19', fee: 15.00, currency: 'USD' },
  { id: '#PAYOUT-003', seller: 'Fashion Hub', amount: 890.25, method: 'Bank Transfer', status: 'processing', date: '2023-10-22', fee: 12.50, currency: 'USD' },
  { id: '#PAYOUT-004', seller: 'Home Essentials', amount: 1560.99, method: 'Bank Transfer', status: 'pending', date: '2023-10-23', fee: 18.75, currency: 'USD' },
  { id: '#PAYOUT-005', seller: 'Fitness Pro', amount: 650.40, method: 'PayPal', status: 'failed', date: '2023-10-21', fee: 8.90, currency: 'USD' },
  { id: '#PAYOUT-006', seller: 'Style Accessories', amount: 3200.60, method: 'Bank Transfer', status: 'completed', date: '2023-10-18', fee: 35.00, currency: 'USD' },
];

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState(mockPayouts);
  const [filteredPayouts, setFilteredPayouts] = useState(mockPayouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  useEffect(() => {
    let result = payouts;
    
    if (searchTerm) {
      result = result.filter(payout => 
        payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payout.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(payout => payout.status === statusFilter);
    }
    
    if (methodFilter !== 'all') {
      result = result.filter(payout => payout.method === methodFilter);
    }
    
    setFilteredPayouts(result);
  }, [searchTerm, statusFilter, methodFilter, payouts]);

  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'Bank Transfer':
        return 'bg-blue-100 text-blue-800';
      case 'PayPal':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPaid = filteredPayouts.reduce((sum, payout) => {
    if (payout.status === 'completed') return sum + payout.amount;
    return sum;
  }, 0);

  const totalPending = filteredPayouts.reduce((sum, payout) => {
    if (payout.status === 'pending' || payout.status === 'processing') return sum + payout.amount;
    return sum;
  }, 0);

  const totalFees = filteredPayouts.reduce((sum, payout) => sum + payout.fee, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payout Management</h1>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Process Payouts
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Fees collected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search payouts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.id}</TableCell>
                    <TableCell>{payout.seller}</TableCell>
                    <TableCell>${payout.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getPaymentMethodColor(payout.method)}>
                        {payout.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPayoutStatusColor(payout.status)}>
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>${payout.fee.toFixed(2)}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payout Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Standard</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">7 days after order completion</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Express</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">1-2 days after order completion</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium">Manual</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Admin initiated payouts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}