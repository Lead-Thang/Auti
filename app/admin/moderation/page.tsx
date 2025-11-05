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
import { Search, Eye, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Image, FileText, User } from 'lucide-react';

// Mock data for moderation queue
const mockModerationQueue = [
  { id: '#MOD-001', contentId: '#PROD-001', type: 'product', user: 'Tech Store', reason: 'Inappropriate images', status: 'pending', date: '2023-10-20', flaggedBy: 'Automated AI', content: 'Wireless Bluetooth Headphones with questionable images' },
  { id: '#MOD-002', contentId: '#USER-002', type: 'profile', user: 'Jane Smith', reason: 'Spam content', status: 'approved', date: '2023-10-21', flaggedBy: 'User report', content: 'Profile bio with excessive links' },
  { id: '#MOD-003', contentId: '#MSG-003', type: 'message', user: 'Robert Johnson', reason: 'Inappropriate language', status: 'rejected', date: '2023-10-22', flaggedBy: 'User report', content: 'Message with offensive content' },
  { id: '#MOD-004', contentId: '#REVIEW-001', type: 'review', user: 'Michael Wilson', reason: 'Fake review', status: 'pending', date: '2023-10-19', flaggedBy: 'Automated AI', content: 'Review with suspicious patterns' },
  { id: '#MOD-005', contentId: '#JOB-004', type: 'job', user: 'Fintech Company', reason: 'Inappropriate content', status: 'pending', date: '2023-10-20', flaggedBy: 'Moderator team', content: 'Job posting with concerning requirements' },
  { id: '#MOD-006', contentId: '#PROFILE-003', type: 'profile', user: 'Sarah Brown', reason: 'Trademark violation', status: 'approved', date: '2023-10-22', flaggedBy: 'Automated AI', content: 'Profile using trademarked logos' },
];

export default function ModerationPage() {
  const [moderationQueue, setModerationQueue] = useState(mockModerationQueue);
  const [filteredQueue, setFilteredQueue] = useState(mockModerationQueue);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    let result = moderationQueue;
    
    if (searchTerm) {
      result = result.filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(item => item.type === typeFilter);
    }
    
    setFilteredQueue(result);
  }, [searchTerm, statusFilter, typeFilter, moderationQueue]);

  const getContentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'profile':
        return 'bg-purple-100 text-purple-800';
      case 'message':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-green-100 text-green-800';
      case 'job':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getModerationReasonColor = (reason: string) => {
    switch (reason) {
      case 'Inappropriate images':
      case 'Inappropriate content':
      case 'Inappropriate language':
        return 'bg-red-100 text-red-800';
      case 'Spam content':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fake review':
        return 'bg-orange-100 text-orange-800';
      case 'Trademark violation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingItems = filteredQueue.filter(i => i.status === 'pending').length;
  const approvedItems = filteredQueue.filter(i => i.status === 'approved').length;
  const rejectedItems = filteredQueue.filter(i => i.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Auto-Moderation</Button>
          <Button>Review Settings</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems}</div>
            <p className="text-xs text-muted-foreground">Awaiting moderation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Content</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedItems}</div>
            <p className="text-xs text-muted-foreground">Passed moderation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Content</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedItems}</div>
            <p className="text-xs text-muted-foreground">Flagged items</p>
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
                  placeholder="Search moderation queue..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="message">Message</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="job">Job</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flag ID</TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Content ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Flagged By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQueue.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <Badge className={getContentTypeColor(item.type)}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.contentId}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.content}</TableCell>
                    <TableCell>
                      <Badge className={getModerationReasonColor(item.reason)}>
                        {item.reason}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getContentStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.flaggedBy}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        {item.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Moderation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Moderation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Content Filters</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Inappropriate Images</span>
                  <Badge variant="secondary">Enabled</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Profanity Detection</span>
                  <Badge variant="secondary">Enabled</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Spam Content</span>
                  <Badge variant="secondary">Enabled</Badge>
                </li>
                <li className="flex justify-between">
                  <span>Trademarks</span>
                  <Badge variant="outline">Disabled</Badge>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Review Settings</h3>
              <p className="text-sm text-gray-500 mb-2">
                Auto-approve content that scores above 85% confidence.
              </p>
              <p className="text-sm text-gray-500">
                Flag content between 60-85% confidence for human review.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}