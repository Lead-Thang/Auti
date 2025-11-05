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
import { Search, Users, Network, TrendingUp, TrendingDown, Eye, MessageSquare, UserPlus } from 'lucide-react';

// Utility function to generate dates relative to current date
const formatDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Mock data for networking connections
const mockConnections = [
  { id: 1, user1: 'John Doe', user2: 'Jane Smith', type: 'professional', status: 'active', connectionDate: formatDate(20), connections: 12, lastInteraction: formatDate(5), strength: 85 },
  { id: 2, user1: 'Robert Johnson', user2: 'Emily Davis', type: 'business', status: 'active', connectionDate: formatDate(17), connections: 8, lastInteraction: formatDate(4), strength: 92 },
  { id: 3, user1: 'Michael Wilson', user2: 'Sarah Brown', type: 'co-founder', status: 'active', connectionDate: formatDate(25), connections: 15, lastInteraction: formatDate(6), strength: 98 },
  { id: 4, user1: 'Jane Smith', user2: 'Mike Dev', type: 'freelance', status: 'pending', connectionDate: formatDate(15), connections: 5, lastInteraction: formatDate(15), strength: 60 },
  { id: 5, user1: 'Alex Designer', user2: 'Tech Startup', type: 'client', status: 'active', connectionDate: formatDate(23), connections: 22, lastInteraction: formatDate(3), strength: 78 },
  { id: 6, user1: 'Marketing Agency', user2: 'Fintech Company', type: 'partner', status: 'inactive', connectionDate: formatDate(30), connections: 3, lastInteraction: formatDate(27), strength: 45 },
];

// Mock previous month data for growth calculation
const previousMonthActiveConnections = 3; // Simulating 3 active connections last month

// Mock data for partnership requests
const mockPartnershipRequests = [
  { id: 1, requester: 'Tech Startup', receiver: 'Marketing Agency', type: 'co-founder', status: 'pending', requestDate: formatDate(15), message: 'Looking for a co-founder to build our vision', connections: 120 },
  { id: 2, requester: 'Jane Writer', receiver: 'Content Co.', type: 'business', status: 'accepted', requestDate: formatDate(17), message: 'Interested in partnering for content creation', connections: 85 },
  { id: 3, requester: 'Design Studio', receiver: 'E-commerce Store', type: 'business', status: 'rejected', requestDate: formatDate(20), message: 'Proposal for design partnership', connections: 42 },
  { id: 4, requester: 'Startup Inc', receiver: 'Investor Group', type: 'investment', status: 'pending', requestDate: formatDate(14), message: 'Seeking investment for expansion', connections: 210 },
];

export default function NetworkPage() {
  const [connections, setConnections] = useState(mockConnections);
  const [partnershipRequests, setPartnershipRequests] = useState(mockPartnershipRequests);
  const [filteredConnections, setFilteredConnections] = useState(mockConnections);
  const [filteredRequests, setFilteredRequests] = useState(mockPartnershipRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('connections');
  const router = useRouter();

  const handleReview = (id: number) => {
    router.push(`/admin/network/${id}/review`);
  };

  const handleContact = (id: number) => {
    // TODO: Implement contact modal or email flow
    console.log(`Contact network ${id}`);
  };

  const handleViewConnection = (id: number) => {
    router.push(`/admin/network/${id}`);
  };

  const handleMessageConnection = (id: number) => {
    router.push('/admin/messages');
  };

  useEffect(() => {
    let result = connections;
    let requestResult = partnershipRequests;
    
    if (searchTerm) {
      result = result.filter(conn => 
        conn.user1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conn.user2.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      requestResult = requestResult.filter(req => 
        req.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.receiver.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(conn => conn.status === statusFilter);
      requestResult = requestResult.filter(req => req.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(conn => conn.type === typeFilter);
      requestResult = requestResult.filter(req => req.type === typeFilter);
    }
    
    setFilteredConnections(result);
    setFilteredRequests(requestResult);
  }, [searchTerm, statusFilter, typeFilter, connections, partnershipRequests]);

  const getConnectionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'business':
        return 'bg-purple-100 text-purple-800';
      case 'co-founder':
        return 'bg-orange-100 text-orange-800';
      case 'freelance':
        return 'bg-green-100 text-green-800';
      case 'client':
        return 'bg-teal-100 text-teal-800';
      case 'partner':
        return 'bg-indigo-100 text-indigo-800';
      case 'investment':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalConnections = connections.filter(c => c.status === 'active').length;
  const pendingConnections = connections.filter(c => c.status === 'pending').length;
  const partnershipRequestsCount = partnershipRequests.filter(r => r.status === 'pending').length;

  // Calculate growth metric
  const getGrowthMetric = () => {
    if (previousMonthActiveConnections === null || previousMonthActiveConnections === undefined) {
      return null; // No historical data available
    }

    const difference = totalConnections - previousMonthActiveConnections;
    const percentage = previousMonthActiveConnections > 0 ? Math.round((difference / previousMonthActiveConnections) * 100) : 0;

    const sign = difference >= 0 ? '+' : '';
    const colorClass = difference >= 0 ? 'text-green-600' : 'text-red-600';

    return {
      text: `${sign}${difference} from last month (${sign}${percentage}%)`,
      colorClass
    };
  };

  const growthMetric = getGrowthMetric();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Network Management</h1>
          <p className="text-gray-500">Manage connections and partnership requests</p>
        </div>
        <Button disabled={true} aria-disabled={true}>
           <UserPlus className="h-4 w-4 mr-2" />
           Generate Matches
           {/* TODO: Implement match generation API call and modal */}
         </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalConnections}</div>
             {growthMetric && (
               <p className={`text-xs ${growthMetric.colorClass}`}>
                 {growthMetric.text}
               </p>
             )}
           </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingConnections}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partnership Requests</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnershipRequestsCount}</div>
            <p className="text-xs text-muted-foreground">New opportunities</p>
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
                  placeholder="Search connections..."
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
                 <SelectItem value="accepted">Accepted</SelectItem>
                 <SelectItem value="rejected">Rejected</SelectItem>
                 <SelectItem value="inactive">Inactive</SelectItem>
               </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Types</SelectItem>
                 <SelectItem value="professional">Professional</SelectItem>
                 <SelectItem value="business">Business</SelectItem>
                 <SelectItem value="co-founder">Co-founder</SelectItem>
                 <SelectItem value="freelance">Freelance</SelectItem>
                 <SelectItem value="client">Client</SelectItem>
                 <SelectItem value="partner">Partner</SelectItem>
                 <SelectItem value="investment">Investment</SelectItem>
               </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for connections and partnership requests */}
      <div className="flex space-x-4 border-b">
        <button 
          className={`pb-2 px-4 ${activeTab === 'connections' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('connections')}
        >
          Connections
        </button>
        <button 
          className={`pb-2 px-4 ${activeTab === 'requests' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('requests')}
        >
          Partnership Requests
        </button>
      </div>

      {/* Connections Table */}
      {activeTab === 'connections' && (
        <Card>
          <CardHeader>
            <CardTitle>Network Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Users</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Connection Date</TableHead>
                    <TableHead>Shared Connections</TableHead>
                    <TableHead>Last Interaction</TableHead>
                    <TableHead>Strength</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConnections.map((conn) => (
                    <TableRow key={conn.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 mr-2" />
                          {conn.user1} ↔ {conn.user2}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConnectionTypeColor(conn.type)}>
                          {conn.type.charAt(0).toUpperCase() + conn.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConnectionStatusColor(conn.status)}>
                          {conn.status.charAt(0).toUpperCase() + conn.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{conn.connectionDate}</TableCell>
                      <TableCell>{conn.connections}</TableCell>
                      <TableCell>{conn.lastInteraction}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${conn.strength > 80 ? 'bg-green-600' : conn.strength > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${conn.strength}%` }}
                            ></div>
                          </div>
                          <span>{conn.strength}%</span>
                        </div>
                      </TableCell>
                       <TableCell>
                         <div className="flex space-x-2">
                           <Button variant="ghost" size="sm" onClick={() => handleViewConnection(conn.id)}>
                             <Eye className="h-4 w-4 mr-1" />
                             View
                           </Button>
                           <Button variant="ghost" size="sm" onClick={() => handleMessageConnection(conn.id)}>
                             <MessageSquare className="h-4 w-4 mr-1" />
                             Message
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
      )}

      {/* Partnership Requests Table */}
      {activeTab === 'requests' && (
        <Card>
          <CardHeader>
            <CardTitle>Partnership Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requester</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Network Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.requester}</TableCell>
                      <TableCell className="font-medium">{request.receiver}</TableCell>
                      <TableCell>
                        <Badge className={getConnectionTypeColor(request.type)}>
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConnectionStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.message}</TableCell>
                      <TableCell>{request.connections}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => handleReview(request.id)}
                             aria-label={`Review partnership request from ${request.requester}`}
                           >
                             <Eye className="h-4 w-4 mr-1" />
                             Review
                           </Button>
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => handleContact(request.id)}
                             aria-label={`Contact ${request.requester} regarding partnership request`}
                           >
                             <MessageSquare className="h-4 w-4 mr-1" />
                             Contact
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
      )}

      {/* Connection Graph Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Network Graph Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border">
            <div className="text-center">
              <Network className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive network visualization</p>
              <p className="text-sm text-gray-400 mt-1">Shows connections between users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}