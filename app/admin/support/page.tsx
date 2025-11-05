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
import { Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle, User, Mail, Phone, HelpCircle } from 'lucide-react';

// Mock data for support tickets
const mockTickets = [
  { id: '#TICKET-001', subject: 'Order #ORD-001 not delivered', category: 'Order Issue', priority: 'high', status: 'open', date: '2023-10-20', user: 'John Doe', email: 'john@example.com', channel: 'email', assignedTo: 'Sarah Support', lastUpdate: '2023-10-21' },
  { id: '#TICKET-002', subject: 'Payment not processed', category: 'Payment', priority: 'medium', status: 'in-progress', date: '2023-10-21', user: 'Jane Smith', email: 'jane@example.com', channel: 'chat', assignedTo: 'Mike Support', lastUpdate: '2023-10-21' },
  { id: '#TICKET-003', subject: 'Product quality concern', category: 'Product', priority: 'low', status: 'resolved', date: '2023-10-19', user: 'Robert Johnson', email: 'robert@example.com', channel: 'form', assignedTo: 'Alex Support', lastUpdate: '2023-10-20' },
  { id: '#TICKET-004', subject: 'Account access issue', category: 'Account', priority: 'high', status: 'open', date: '2023-10-22', user: 'Emily Davis', email: 'emily@example.com', channel: 'email', assignedTo: 'Unassigned', lastUpdate: '2023-10-22' },
  { id: '#TICKET-005', subject: 'Freelancer dispute', category: 'Freelance', priority: 'high', status: 'in-progress', date: '2023-10-20', user: 'Michael Wilson', email: 'michael@example.com', channel: 'form', assignedTo: 'Emma Support', lastUpdate: '2023-10-21' },
  { id: '#TICKET-006', subject: 'Refund request', category: 'Payment', priority: 'medium', status: 'resolved', date: '2023-10-18', user: 'Sarah Brown', email: 'sarah@example.com', channel: 'chat', assignedTo: 'Chris Support', lastUpdate: '2023-10-19' },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    let result = tickets;
    
    if (searchTerm) {
      result = result.filter(ticket => 
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(ticket => ticket.status === statusFilter);
    }
    
    if (priorityFilter !== 'all') {
      result = result.filter(ticket => ticket.priority === priorityFilter);
    }
    
    if (categoryFilter !== 'all') {
      result = result.filter(ticket => ticket.category === categoryFilter);
    }
    
    setFilteredTickets(result);
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter, tickets]);

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'chat':
        return 'bg-purple-100 text-purple-800';
      case 'form':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSupportCategoryColor = (category: string) => {
    switch (category) {
      case 'Order Issue':
        return 'bg-blue-100 text-blue-800';
      case 'Payment':
        return 'bg-green-100 text-green-800';
      case 'Product':
        return 'bg-yellow-100 text-yellow-800';
      case 'Account':
        return 'bg-purple-100 text-purple-800';
      case 'Freelance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openTickets = filteredTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = filteredTickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = filteredTickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Bulk Actions</Button>
          <Button>Create Ticket</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">Issues resolved</p>
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
                  placeholder="Search tickets..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Order Issue">Order Issue</SelectItem>
                <SelectItem value="Payment">Payment</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Account">Account</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge className={getSupportCategoryColor(ticket.category)}>
                        {ticket.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </Badge>
                    </TableCell>
                     <TableCell>
                       <Badge className={getTicketStatusColor(ticket.status)}>
                         {formatStatus(ticket.status)}
                       </Badge>
                     </TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>
                      <Badge className={getChannelColor(ticket.channel)}>
                        {ticket.channel.charAt(0).toUpperCase() + ticket.channel.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Reply
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

      {/* Support Agent Status */}
      <Card>
        <CardHeader>
          <CardTitle>Support Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Sarah Support', 'Mike Support', 'Alex Support', 'Emma Support'].map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <div className="font-medium">{agent}</div>
                    <div className="text-sm text-gray-500">
                      {index === 0 ? '2 open tickets' : 
                       index === 1 ? '1 open ticket' : 
                       index === 2 ? '1 open ticket' : 
                       '2 open tickets'}
                    </div>
                  </div>
                </div>
                <Badge variant={index === 0 ? 'default' : 'secondary'}>
                  {index === 0 ? 'Active' : 'Available'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}