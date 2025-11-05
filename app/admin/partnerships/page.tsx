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
import { Search, Users, DollarSign, Calendar, TrendingUp, TrendingDown, Eye, FileText, Shield, Clock } from 'lucide-react';

// Mock data for partnerships
const mockPartnerships = [
  { id: '#PART-001', parties: ['Tech Startup', 'Marketing Agency'], type: 'co-founder', status: 'active', startDate: '2023-01-15', endDate: '2024-01-15', equity: 50, revenueShare: 50, totalValue: 125000, lastActivity: '2023-10-20', vestingSchedule: '4 years' },
  { id: '#PART-002', parties: ['Jane Writer', 'Content Co.'], type: 'business', status: 'active', startDate: '2023-03-10', endDate: '2024-03-10', equity: 0, revenueShare: 30, totalValue: 45000, lastActivity: '2023-10-21', vestingSchedule: 'N/A' },
  { id: '#PART-003', parties: ['Design Studio', 'E-commerce Store'], type: 'business', status: 'terminated', startDate: '2023-05-20', endDate: '2023-09-15', equity: 0, revenueShare: 25, totalValue: 32000, lastActivity: '2023-09-15', vestingSchedule: 'N/A' },
  { id: '#PART-004', parties: ['Startup Inc', 'Investor Group'], type: 'investment', status: 'active', startDate: '2023-07-01', endDate: '2025-07-01', equity: 20, revenueShare: 0, totalValue: 500000, lastActivity: '2023-10-18', vestingSchedule: '5 years' },
  { id: '#PART-005', parties: ['Mobile Dev', 'App Co.'], type: 'partnership', status: 'pending', startDate: '2023-10-20', endDate: '2024-10-20', equity: 0, revenueShare: 40, totalValue: 75000, lastActivity: '2023-10-20', vestingSchedule: 'N/A' },
  { id: '#PART-006', parties: ['Consulting Firm', 'Enterprise Client'], type: 'business', status: 'active', startDate: '2023-02-01', endDate: '2024-02-01', equity: 0, revenueShare: 0, totalValue: 200000, lastActivity: '2023-10-22', vestingSchedule: 'N/A' },
];

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState(mockPartnerships);
  const [filteredPartnerships, setFilteredPartnerships] = useState(mockPartnerships);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    let result = partnerships;
    
    if (searchTerm) {
      result = result.filter(partnership => 
        partnership.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partnership.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(partnership => partnership.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(partnership => partnership.type === typeFilter);
    }
    
    setFilteredPartnerships(result);
  }, [searchTerm, statusFilter, typeFilter, partnerships]);

  const getPartnershipStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPartnershipTypeColor = (type: string) => {
    switch (type) {
      case 'co-founder':
        return 'bg-orange-100 text-orange-800';
      case 'business':
        return 'bg-blue-100 text-blue-800';
      case 'investment':
        return 'bg-purple-100 text-purple-800';
      case 'partnership':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activePartnerships = filteredPartnerships.filter(p => p.status === 'active').length;
  const totalValue = filteredPartnerships.reduce((sum, p) => sum + p.totalValue, 0);
  const pendingPartnerships = filteredPartnerships.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Partnership Management</h1>
          <p className="text-gray-500">Manage co-founder matches and business partnerships</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Create Partnership
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePartnerships}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Across all partnerships</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Partnerships</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPartnerships}</div>
            <p className="text-xs text-muted-foreground">Awaiting finalization</p>
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
                  placeholder="Search partnerships..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="co-founder">Co-founder</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Partnerships Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Agreements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partnership ID</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Equity %</TableHead>
                  <TableHead>Revenue Share %</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Vesting</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartnerships.map((partnership) => (
                  <TableRow key={partnership.id}>
                    <TableCell className="font-medium">{partnership.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {partnership.parties.map((party, index) => (
                          <span key={index} className="font-medium">{party}</span>
                        ))}
                      </div>
                    </TableCell>
                     <TableCell>
                       <Badge className={getPartnershipTypeColor(partnership.type)}>
                         {partnership.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
                       </Badge>
                     </TableCell>
                    <TableCell>
                      <Badge className={getPartnershipStatusColor(partnership.status)}>
                        {partnership.status.charAt(0).toUpperCase() + partnership.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{partnership.startDate}</TableCell>
                    <TableCell>{partnership.endDate}</TableCell>
                    <TableCell>{partnership.equity}%</TableCell>
                    <TableCell>{partnership.revenueShare}%</TableCell>
                    <TableCell>${partnership.totalValue.toLocaleString()}</TableCell>
                    <TableCell>{partnership.vestingSchedule}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Contract
                        </Button>
                        <Button variant="outline" size="sm" disabled={partnership.status !== 'active'}>
                          <Shield className="h-4 w-4 mr-1" />
                          Mediate
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Partnership Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'Co-founder', count: partnerships.filter(p => p.type === 'co-founder').length, value: partnerships.filter(p => p.type === 'co-founder').reduce((sum, p) => sum + p.totalValue, 0), color: 'bg-orange-100 text-orange-800' },
              { type: 'Business', count: partnerships.filter(p => p.type === 'business').length, value: partnerships.filter(p => p.type === 'business').reduce((sum, p) => sum + p.totalValue, 0), color: 'bg-blue-100 text-blue-800' },
              { type: 'Investment', count: partnerships.filter(p => p.type === 'investment').length, value: partnerships.filter(p => p.type === 'investment').reduce((sum, p) => sum + p.totalValue, 0), color: 'bg-purple-100 text-purple-800' },
              { type: 'Partnership', count: partnerships.filter(p => p.type === 'partnership').length, value: partnerships.filter(p => p.type === 'partnership').reduce((sum, p) => sum + p.totalValue, 0), color: 'bg-green-100 text-green-800' },
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.type}</h3>
                  <Badge className={item.color}>{item.count}</Badge>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">${(item.value / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-gray-500">Total value</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Partnership Agreement Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Agreement Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Co-founder Agreement</h3>
                <p className="text-sm text-gray-500">Standard template for co-founder arrangements</p>
              </div>
              <Button variant="outline">View Template</Button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Business Partnership</h3>
                <p className="text-sm text-gray-500">Template for business partnerships</p>
              </div>
              <Button variant="outline">View Template</Button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Investment Agreement</h3>
                <p className="text-sm text-gray-500">Template for investment partnerships</p>
              </div>
              <Button variant="outline">View Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}