'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Search, Eye, FileText, DollarSign, TrendingUp, TrendingDown, Settings } from 'lucide-react';

// Mock data for tax records
const mockTaxRecords = [
  { id: 'TAX-001', orderId: '#ORD-001', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 9.72, total: 124.09, date: '2023-10-20', status: 'filed' },
  { id: 'TAX-002', orderId: '#ORD-002', customerCountry: 'Canada', sellerCountry: 'USA', taxRate: 5.0, taxAmount: 4.27, total: 89.76, date: '2023-10-21', status: 'pending' },
  { id: 'TAX-003', orderId: '#ORD-003', customerCountry: 'UK', sellerCountry: 'USA', taxRate: 20.0, taxAmount: 25.04, total: 150.23, date: '2023-10-22', status: 'pending' },
  { id: 'TAX-004', orderId: '#ORD-004', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 16.40, total: 209.39, date: '2023-10-19', status: 'filed' },
  { id: 'TAX-005', orderId: '#ORD-005', customerCountry: 'Germany', sellerCountry: 'USA', taxRate: 19.0, taxAmount: 10.39, total: 65.06, date: '2023-10-20', status: 'pending' },
  { id: 'TAX-006', orderId: '#ORD-006', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 15.55, total: 198.54, date: '2023-10-22', status: 'pending' },
];

export default function TaxPage() {
  const router = useRouter();
  const [filteredTaxRecords, setFilteredTaxRecords] = useState(mockTaxRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  useEffect(() => {
    let result = mockTaxRecords;
    
    if (searchTerm) {
      result = result.filter(tax => 
        tax.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tax.customerCountry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(tax => tax.status === statusFilter);
    }
    
    if (countryFilter !== 'all') {
      result = result.filter(tax => tax.customerCountry === countryFilter);
    }
    
    setFilteredTaxRecords(result);
  }, [searchTerm, statusFilter, countryFilter]);

  const getCountryOptions = () => {
    const countries = [...new Set(mockTaxRecords.map(t => t.customerCountry))];
    return ['all', ...countries];
  };

  const getTaxStatusColor = (status: string) => {
    switch (status) {
      case 'filed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalTaxCollected = filteredTaxRecords.reduce((sum, tax) => sum + tax.taxAmount, 0);
  const totalTaxFiled = filteredTaxRecords.filter(t => t.status === 'filed').reduce((sum, tax) => sum + tax.taxAmount, 0);
  const totalTaxPending = filteredTaxRecords.filter(t => t.status === 'pending').reduce((sum, tax) => sum + tax.taxAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tax Management</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Reports
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTaxCollected.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Filed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTaxFiled.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Successfully submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Pending</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTaxPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting filing</p>
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
                  placeholder="Search tax records..."
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
                <SelectItem value="filed">Filed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {getCountryOptions()
                  .filter(c => c !== 'all')
                  .map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tax Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Country</TableHead>
                  <TableHead>Seller Country</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTaxRecords.map((tax) => (
                  <TableRow key={tax.id}>
                     <TableCell className="font-medium">#{tax.id}</TableCell>
                    <TableCell>{tax.orderId}</TableCell>
                    <TableCell>{tax.customerCountry}</TableCell>
                    <TableCell>{tax.sellerCountry}</TableCell>
                    <TableCell>{tax.taxRate}%</TableCell>
                    <TableCell>${tax.taxAmount.toFixed(2)}</TableCell>
                    <TableCell>${tax.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getTaxStatusColor(tax.status)}>
                        {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{tax.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/tax/${encodeURIComponent(tax.id)}`)}>
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

      {/* Tax Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Compliance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Tax Rates by Region</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>USA - Standard</span>
                  <span>8.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>EU - VAT</span>
                  <span>20%</span>
                </li>
                <li className="flex justify-between">
                  <span>Canada - GST</span>
                  <span>5%</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tax Calculation</h3>
              <p className="text-sm text-gray-500">
                Platform uses customer billing address to determine tax rate. 
                Sellers responsible for tax collection in their region.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}