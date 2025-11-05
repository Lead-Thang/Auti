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
import { Search, Eye, DollarSign, TrendingUp, TrendingDown, Settings } from 'lucide-react';
import { getCommissionStatusColor } from '../../../lib/admin-utils';

// Mock data for commissions
const mockCommissions = [
  { id: '#COM-001', orderId: '#ORD-001', seller: 'Tech Store', product: 'Wireless Headphones', amount: 124.99, commissionRate: 5, commission: 6.25, date: '2023-10-20', status: 'paid' },
  { id: '#COM-002', orderId: '#ORD-002', seller: 'Gadget World', product: 'Smart Watch', amount: 89.99, commissionRate: 5, commission: 4.50, date: '2023-10-21', status: 'paid' },
  { id: '#COM-003', orderId: '#ORD-003', seller: 'Fashion Hub', product: 'Cotton T-Shirt', amount: 156.49, commissionRate: 5, commission: 7.82, date: '2023-10-22', status: 'pending' },
  { id: '#COM-004', orderId: '#ORD-005', seller: 'Home Essentials', product: 'Coffee Maker', amount: 67.50, commissionRate: 5, commission: 3.38, date: '2023-10-20', status: 'paid' },
   { id: '#COM-005', orderId: '#ORD-006', seller: 'Fitness Pro', product: 'Yoga Mat', amount: 199.99, commissionRate: 5, commission: 10.00, date: '2023-10-22', status: 'pending' },
  { id: '#COM-006', orderId: '#ORD-001', seller: 'Style Accessories', product: 'Leather Wallet', amount: 210.99, commissionRate: 5, commission: 10.55, date: '2023-10-19', status: 'refunded' },
];

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState(mockCommissions);
  const [filteredCommissions, setFilteredCommissions] = useState(mockCommissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sellerFilter, setSellerFilter] = useState('all');

  useEffect(() => {
    let result = commissions;
    
    if (searchTerm) {
      result = result.filter(commission => 
        commission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(commission => commission.status === statusFilter);
    }
    
    if (sellerFilter !== 'all') {
      result = result.filter(commission => commission.seller === sellerFilter);
    }
    
    setFilteredCommissions(result);
  }, [searchTerm, statusFilter, sellerFilter, commissions]);

  const getSellerOptions = () => {
    const sellers = [...new Set(mockCommissions.map(c => c.seller))];
    return ['all', ...sellers];
  };



  const totalCommission = filteredCommissions.reduce((sum, commission) => {
    if (commission.status !== 'refunded') return sum + commission.commission;
    return sum;
  }, 0);

  const pendingCommission = filteredCommissions.reduce((sum, commission) => {
    if (commission.status === 'pending') return sum + commission.commission;
    return sum;
  }, 0);

  const paidCommission = filteredCommissions.reduce((sum, commission) => {
    if (commission.status === 'paid') return sum + commission.commission;
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Commission Management</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Commission Settings
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">5% of sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Already distributed</p>
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
                  placeholder="Search commissions..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by seller" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sellers</SelectItem>
                {getSellerOptions()
                  .filter(s => s !== 'all')
                  .map((seller) => (
                    <SelectItem key={seller} value={seller}>{seller}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Commissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commission ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Order Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.id}</TableCell>
                    <TableCell>{commission.orderId}</TableCell>
                    <TableCell>{commission.seller}</TableCell>
                    <TableCell>{commission.product}</TableCell>
                    <TableCell>${commission.amount.toFixed(2)}</TableCell>
                    <TableCell>{commission.commissionRate}%</TableCell>
                    <TableCell>${commission.commission.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getCommissionStatusColor(commission.status)}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{commission.date}</TableCell>
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

      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Default Commission Rate</h3>
              <p className="text-2xl font-bold text-blue-600">5%</p>
              <p className="text-sm text-gray-500 mt-1">Applies to all sellers by default</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tiered Commission</h3>
              <p className="text-sm text-gray-500">
                Higher rates for top-performing sellers based on sales volume
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}