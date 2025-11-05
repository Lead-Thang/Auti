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
import { Search, Eye, Edit, DollarSign, Shield, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Mock data for escrow
const mockEscrow = [
  { id: '#ESC-001', projectId: '#PROJ-001', client: 'Tech Startup', freelancer: 'John Developer', amount: 1200, status: 'held', milestone: 'Design Phase', releaseDate: '2023-11-15', startDate: '2023-10-20', endDate: '2023-11-15', reason: 'Milestone completion' },
  { id: '#ESC-002', projectId: '#PROJ-002', client: 'Marketing Agency', freelancer: 'Jane Writer', amount: 300, status: 'released', milestone: 'Content Delivered', releaseDate: '2023-11-05', startDate: '2023-10-21', endDate: '2023-11-05', reason: 'Project completion' },
  { id: '#ESC-003', projectId: '#PROJ-003', client: 'New Business', freelancer: 'Alex Designer', amount: 500, status: 'released', milestone: 'Final Delivery', releaseDate: '2023-10-25', startDate: '2023-10-15', endDate: '2023-10-25', reason: 'Project completion' },
  { id: '#ESC-004', projectId: '#PROJ-004', client: 'Fintech Company', freelancer: 'Mike Dev', amount: 1125, status: 'held', milestone: 'Backend Setup', releaseDate: '2023-12-01', startDate: '2023-10-18', endDate: '2023-12-01', reason: 'Milestone completion' },
  { id: '#ESC-005', projectId: '#PROJ-005', client: 'E-commerce Store', freelancer: 'Sarah Marketer', amount: 800, status: 'pending', milestone: 'Kickoff Meeting', releaseDate: '2023-11-10', startDate: '2023-10-22', endDate: '2023-11-10', reason: 'Project start' },
  { id: '#ESC-006', projectId: '#PROJ-006', client: 'Gadget Company', freelancer: 'Tom Editor', amount: 400, status: 'disputed', milestone: 'Rough Cut', releaseDate: '2023-10-20', startDate: '2023-10-10', endDate: '2023-10-20', reason: 'Quality dispute' },
];

export default function EscrowPage() {
  const [escrow, setEscrow] = useState(mockEscrow);
  const [filteredEscrow, setFilteredEscrow] = useState(mockEscrow);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');

  useEffect(() => {
    let result = escrow;
    
    if (searchTerm) {
      result = result.filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.freelancer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }
    
    if (clientFilter !== 'all') {
      result = result.filter(item => item.client === clientFilter);
    }
    
    setFilteredEscrow(result);
  }, [searchTerm, statusFilter, clientFilter, escrow]);

  const getEscrowStatusColor = (status: string) => {
    switch (status) {
      case 'held':
        return 'bg-blue-100 text-blue-800';
      case 'released':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientOptions = () => {
    const clients = [...new Set(mockEscrow.map(e => e.client))];
    return ['all', ...clients];
  };

  const totalHeld = filteredEscrow.filter(e => e.status === 'held' || e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
  const totalReleased = filteredEscrow.filter(e => e.status === 'released').reduce((sum, e) => sum + e.amount, 0);
  const totalDisputed = filteredEscrow.filter(e => e.status === 'disputed').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Escrow Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Release Funds</Button>
          <Button>Dispute Resolution</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Held</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalHeld.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">In escrow accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Released</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalReleased.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Distributed to freelancers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disputed Amount</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDisputed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Under review</p>
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
                  placeholder="Search escrow..."
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
                <SelectItem value="held">Held</SelectItem>
                <SelectItem value="released">Released</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {getClientOptions()
                  .filter(c => c !== 'all')
                  .map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Escrow Table */}
      <Card>
        <CardHeader>
          <CardTitle>Escrow Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Escrow ID</TableHead>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Freelancer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEscrow.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.projectId}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{item.freelancer}</TableCell>
                    <TableCell>${item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getEscrowStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.milestone}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.releaseDate}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
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

      {/* Disputed Escrow */}
      <Card>
        <CardHeader>
          <CardTitle>Disputed Escrow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEscrow.filter(e => e.status === 'disputed').map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <div className="font-medium">{item.id} - {item.milestone}</div>
                  <div className="text-sm text-gray-500">{item.client} • {item.freelancer}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Disputed: {item.reason}</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Review</Button>
                  <Button size="sm">Mediate</Button>
                </div>
              </div>
            ))}
            {filteredEscrow.filter(e => e.status === 'disputed').length === 0 && (
              <p className="text-gray-500 text-center py-4">No disputed escrow items</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}