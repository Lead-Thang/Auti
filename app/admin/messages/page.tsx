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
import { Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle, User, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';

// Message type definition
interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  status: 'read' | 'unread';
  type: 'job-inquiry' | 'support' | 'report' | 'project' | 'inquiry' | 'dispute';
  flagged: boolean;
}

// Mock data for messages
const mockMessages: Message[] = [
  { id: '#MSG-001', sender: 'John Doe', recipient: 'Tech Startup', subject: 'Project inquiry', content: 'Hi, I\'m interested in your web design project...', date: '2023-10-20', status: 'read', type: 'job-inquiry', flagged: false },
  { id: '#MSG-002', sender: 'Jane Smith', recipient: 'Client Services', subject: 'Order #ORD-001', content: 'Hi, I have a question about my recent order...', date: '2023-10-21', status: 'unread', type: 'support', flagged: false },
  { id: '#MSG-003', sender: 'Robert Johnson', recipient: 'Platform Admin', subject: 'Inappropriate content', content: 'I encountered inappropriate content on your platform...', date: '2023-10-22', status: 'read', type: 'report', flagged: true },
  { id: '#MSG-004', sender: 'Michael Wilson', recipient: 'Jane Writer', subject: 'Re: Content Writing Project', content: 'Thanks for your interest in the content writing project...', date: '2023-10-20', status: 'read', type: 'project', flagged: false },
  { id: '#MSG-005', sender: 'Emily Davis', recipient: 'Client Inquiry', subject: 'Product question', content: 'I have a question about the coffee maker I purchased...', date: '2023-10-19', status: 'unread', type: 'inquiry', flagged: false },
  { id: '#MSG-006', sender: 'Sarah Brown', recipient: 'Platform Admin', subject: 'Escrow dispute', content: 'I need to discuss the disputed escrow payment...', date: '2023-10-22', status: 'read', type: 'dispute', flagged: false },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [filteredMessages, setFilteredMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
   const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
   const [composeData, setComposeData] = useState<{
     type: 'reply' | 'forward';
     originalMessage: Message;
   } | null>(null);

  useEffect(() => {
    let result = messages;
    
    if (searchTerm) {
      result = result.filter(message => 
        message.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(message => message.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(message => message.type === typeFilter);
    }
    
    setFilteredMessages(result);
  }, [searchTerm, statusFilter, typeFilter, messages]);

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'job-inquiry':
        return 'bg-purple-100 text-purple-800';
      case 'support':
        return 'bg-yellow-100 text-yellow-800';
      case 'report':
        return 'bg-red-100 text-red-800';
      case 'project':
        return 'bg-green-100 text-green-800';
      case 'inquiry':
        return 'bg-blue-100 text-blue-800';
      case 'dispute':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatMessageType = (type: string): string => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

   const totalMessages = filteredMessages.length;
   const unreadMessages = filteredMessages.filter(m => m.status === 'unread').length;
   const flaggedMessages = filteredMessages.filter(m => m.flagged).length;

   const handleReply = (message: Message) => {
     setComposeData({ type: 'reply', originalMessage: message });
     setIsComposeModalOpen(true);
   };

   const handleForward = (message: Message) => {
     setComposeData({ type: 'forward', originalMessage: message });
     setIsComposeModalOpen(true);
   };

   const handleMarkAsSafe = async (messageId: string) => {
     try {
       // TODO: Replace with actual API call
       // const response = await fetch(`/api/messages/${messageId}/mark-safe`, {
       //   method: 'PATCH',
       //   headers: { 'Content-Type': 'application/json' },
       //   body: JSON.stringify({ flagged: false })
       // });
       // if (!response.ok) throw new Error('Failed to mark message as safe');

       // Update local state
       setMessages(prev => prev.map(msg =>
         msg.id === messageId ? { ...msg, flagged: false } : msg
       ));
     } catch (error) {
       console.error('Error marking message as safe:', error);
       // TODO: Show error toast
     }
   };

   return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Message Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {/* Handle bulk actions */}}>Bulk Actions</Button>
          <Button onClick={() => {/* Handle settings */}}>Settings</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">+12 from last day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedMessages}</div>
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
                  placeholder="Search messages..."
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
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="job-inquiry">Job Inquiry</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="inquiry">Inquiry</SelectItem>
                <SelectItem value="dispute">Dispute</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message ID</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id} className={message.status === 'unread' ? 'bg-blue-50' : ''}>
                    <TableCell className="font-medium">{message.id}</TableCell>
                    <TableCell>{message.sender}</TableCell>
                    <TableCell>{message.recipient}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
                    <TableCell>
                      <Badge className={getMessageStatusColor(message.status)}>
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </Badge>
                    </TableCell>
                     <TableCell>
                       <Badge className={getMessageTypeColor(message.type)}>
                         {formatMessageType(message.type)}
                       </Badge>
                     </TableCell>
                    <TableCell>{message.date}</TableCell>
                     <TableCell>
                       <div className="flex space-x-2">
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => {
                             setSelectedMessage(message);
                             setIsViewModalOpen(true);
                           }}
                         >
                           <Eye className="h-4 w-4 mr-1" />
                           View
                         </Button>
                         {message.flagged && (
                           <Button
                             variant="outline"
                             size="sm"
                             className="border-red-500 text-red-500"
                             onClick={() => {
                               setSelectedMessage(message);
                               setIsReviewModalOpen(true);
                             }}
                           >
                             <Shield className="h-4 w-4 mr-1" />
                             Review
                           </Button>
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

      {/* Detailed Message Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Message Preview</CardTitle>
        </CardHeader>
        <CardContent>
           {(() => {
             const displayMessage = selectedMessage || filteredMessages[0] || null;
             return displayMessage ? (
               <div className="space-y-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-medium">{displayMessage.subject}</h3>
                     <p className="text-sm text-gray-500 mt-1">{displayMessage.sender} to {displayMessage.recipient}</p>
                   </div>
                   <div className="text-sm text-gray-500">{displayMessage.date}</div>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                   <p>{displayMessage.content}</p>
                 </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleReply(displayMessage)}>Reply</Button>
                    <Button variant="outline" onClick={() => handleForward(displayMessage)}>Forward</Button>
                    <Button
                      variant="outline"
                      disabled={!displayMessage.flagged}
                      onClick={() => handleMarkAsSafe(displayMessage.id)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Mark as Safe
                    </Button>
                  </div>
               </div>
             ) : (
               <p className="text-gray-500 text-center py-8">No messages available</p>
             );
           })()}
        </CardContent>
      </Card>

      {/* View Message Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    From: {selectedMessage.sender} to {selectedMessage.recipient}
                  </p>
                </div>
                <div className="text-sm text-gray-500">{selectedMessage.date}</div>
              </div>
              <div className="flex space-x-2">
                <Badge className={getMessageStatusColor(selectedMessage.status)}>
                  {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                </Badge>
                <Badge className={getMessageTypeColor(selectedMessage.type)}>
                  {selectedMessage.type.replace('-', ' ').charAt(0).toUpperCase() + selectedMessage.type.replace('-', ' ').slice(1)}
                </Badge>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p>{selectedMessage.content}</p>
              </div>
               <div className="flex space-x-2">
                 <Button variant="outline" onClick={() => handleReply(selectedMessage)}>Reply</Button>
                 <Button variant="outline" onClick={() => handleForward(selectedMessage)}>Forward</Button>
                 {selectedMessage.flagged && (
                   <Button
                     variant="outline"
                     className="border-red-500 text-red-500"
                     onClick={() => handleMarkAsSafe(selectedMessage.id)}
                   >
                     <Shield className="h-4 w-4 mr-1" />
                     Mark as Safe
                   </Button>
                 )}
               </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Message Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Flagged Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    From: {selectedMessage.sender} to {selectedMessage.recipient}
                  </p>
                </div>
                <div className="text-sm text-gray-500">{selectedMessage.date}</div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{selectedMessage.content}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Review Actions:</h4>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-green-500 text-green-500">
                    Approve Message
                  </Button>
                  <Button variant="outline" className="border-yellow-500 text-yellow-500">
                    Request Changes
                  </Button>
                  <Button variant="destructive">
                    Reject Message
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
       </Dialog>

       {/* Compose Message Modal */}
       <Dialog open={isComposeModalOpen} onOpenChange={setIsComposeModalOpen}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle>
               {composeData?.type === 'reply' ? 'Reply to Message' : 'Forward Message'}
             </DialogTitle>
           </DialogHeader>
           {composeData && (
             <div className="space-y-4">
               <div className="p-4 bg-gray-50 rounded-lg">
                 <p className="text-sm text-gray-600">Original message:</p>
                 <p className="mt-2">{composeData.originalMessage.content}</p>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">To:</label>
                 <Input
                   value={composeData.type === 'reply' ? composeData.originalMessage.sender : ''}
                   placeholder="Enter recipient"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Subject:</label>
                 <Input
                   value={composeData.type === 'reply' ? `Re: ${composeData.originalMessage.subject}` : `Fwd: ${composeData.originalMessage.subject}`}
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Message:</label>
                 <textarea
                   className="w-full p-2 border rounded-md min-h-[100px]"
                   placeholder="Type your message here..."
                 />
               </div>
               <div className="flex justify-end space-x-2">
                 <Button variant="outline" onClick={() => setIsComposeModalOpen(false)}>
                   Cancel
                 </Button>
                 <Button>Send</Button>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
     </div>
   );
 }