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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { useToast } from '../../../hooks/use-toast';
import { Search, Eye, AlertTriangle, Clock, CheckCircle, XCircle, DollarSign, User, Shield, MessageSquare, Loader2 } from 'lucide-react';

// Mock data for disputes
const mockDisputes = [
  { id: '#DIS-001', type: 'order', relatedId: '#ORD-001', title: 'Product not as described', status: 'in-progress', priority: 'high', submitDate: '2023-10-20', resolutionDate: '2023-10-25', buyer: 'John Doe', seller: 'Tech Store', amount: 124.99, reason: 'Product quality', evidence: 3, assignedTo: 'Mediator Team' },
  { id: '#DIS-002', type: 'freelance', relatedId: '#PROJ-001', title: 'Project not completed on time', status: 'resolved', priority: 'medium', submitDate: '2023-10-21', resolutionDate: '2023-10-22', buyer: 'Tech Startup', seller: 'John Developer', amount: 800, reason: 'Late delivery', evidence: 2, assignedTo: 'Mediator Team' },
  { id: '#DIS-003', type: 'escrow', relatedId: '#ESC-006', title: 'Quality dispute', status: 'open', priority: 'high', submitDate: '2023-10-22', resolutionDate: null, buyer: 'Gadget Company', seller: 'Tom Editor', amount: 400, reason: 'Poor quality', evidence: 5, assignedTo: 'Unassigned' },
  { id: '#DIS-004', type: 'order', relatedId: '#ORD-004', title: 'Item not received', status: 'resolved', priority: 'low', submitDate: '2023-10-19', resolutionDate: '2023-10-20', buyer: 'Emily Davis', seller: 'Fashion Hub', amount: 210.99, reason: 'Shipping issue', evidence: 1, assignedTo: 'Mediator Team' },
  { id: '#DIS-005', type: 'freelance', relatedId: '#PROJ-004', title: 'Scope disagreement', status: 'in-progress', priority: 'medium', submitDate: '2023-10-20', resolutionDate: '2023-10-28', buyer: 'Fintech Company', seller: 'Mike Dev', amount: 1200, reason: 'Scope change', evidence: 4, assignedTo: 'Senior Mediator' },
  { id: '#DIS-006', type: 'order', relatedId: '#ORD-005', title: 'Wrong item delivered', status: 'open', priority: 'medium', submitDate: '2023-10-21', resolutionDate: null, buyer: 'Michael Wilson', seller: 'Home Essentials', amount: 67.50, reason: 'Wrong item', evidence: 2, assignedTo: 'Mediator Team' },
];

export default function DisputesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [disputes, setDisputes] = useState(mockDisputes);
  const [filteredDisputes, setFilteredDisputes] = useState(mockDisputes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showMediationModal, setShowMediationModal] = useState(false);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
   const [escalatingDisputes, setEscalatingDisputes] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    let result = disputes;
    
    if (searchTerm) {
      result = result.filter(dispute => 
        dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(dispute => dispute.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(dispute => dispute.type === typeFilter);
    }
    
    if (priorityFilter !== 'all') {
      result = result.filter(dispute => dispute.priority === priorityFilter);
    }
    
    setFilteredDisputes(result);
  }, [searchTerm, statusFilter, typeFilter, priorityFilter, disputes]);

  const getDisputeStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'escalated':
        return 'bg-orange-100 text-orange-800';
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

  const handleMediationTools = (disputeId: string) => {
    setSelectedDisputeId(disputeId);
    setShowMediationModal(true);
  };

  const handleEscalateDispute = async (disputeId: string) => {
    setEscalatingDisputes(prev => new Map(prev.set(disputeId, true)));
    try {
      const response = await fetch(`/api/dispute/${disputeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'escalate' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to escalate dispute');
      }

      // Update local state
      setDisputes(prev => prev.map(dispute =>
        dispute.id === disputeId
          ? { ...dispute, status: 'escalated' }
          : dispute
      ));

      toast({
        title: "Dispute Escalated",
        description: "The dispute has been successfully escalated to senior mediation.",
      });
    } catch (error) {
      console.error('Error escalating dispute:', error);
      toast({
        title: "Escalation Failed",
        description: error instanceof Error ? error.message : "Failed to escalate the dispute. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEscalatingDisputes(prev => {
        const newMap = new Map(prev);
        newMap.delete(disputeId);
        return newMap;
      });
    }
  };

  const handleStartChatMediation = () => {
    if (!selectedDisputeId) return;

    // Close mediation modal
    setShowMediationModal(false);

    // Navigate to chat mediation page with dispute context
    router.push(`/admin/disputes/${selectedDisputeId}/chat-mediation`);

    toast({
      title: "Starting Chat Mediation",
      description: `Opening chat mediation for dispute ${selectedDisputeId}`,
    });
  };

  const handleReviewEvidence = () => {
    if (!selectedDisputeId) return;

    // Close mediation modal
    setShowMediationModal(false);

    // Navigate to evidence review page
    router.push(`/admin/disputes/${selectedDisputeId}/evidence`);

    toast({
      title: "Reviewing Evidence",
      description: `Opening evidence review for dispute ${selectedDisputeId}`,
    });
  };

  const handleContactParties = () => {
    if (!selectedDisputeId) return;

    // Close mediation modal
    setShowMediationModal(false);

    // Navigate to contact parties page
    router.push(`/admin/disputes/${selectedDisputeId}/contact`);

    toast({
      title: "Contacting Parties",
      description: `Opening contact interface for dispute ${selectedDisputeId}`,
    });
  };

  const handleProposeResolution = () => {
    if (!selectedDisputeId) return;

    // Close mediation modal
    setShowMediationModal(false);

    // Navigate to resolution proposal page
    router.push(`/admin/disputes/${selectedDisputeId}/resolution`);

    toast({
      title: "Proposing Resolution",
      description: `Opening resolution proposal for dispute ${selectedDisputeId}`,
    });
  };

  const getDisputeTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-800';
      case 'freelance':
        return 'bg-purple-100 text-purple-800';
      case 'escrow':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openDisputes = filteredDisputes.filter(d => d.status === 'open').length;
  const inProgressDisputes = filteredDisputes.filter(d => d.status === 'in-progress').length;
  const resolvedDisputes = filteredDisputes.filter(d => d.status === 'resolved').length;
  const totalAmountInDisputes = filteredDisputes.filter(d => d.status !== 'resolved').reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dispute Resolution</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openDisputes}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressDisputes}</div>
            <p className="text-xs text-muted-foreground">Being mediated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedDisputes}</div>
            <p className="text-xs text-muted-foreground">Closed cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount in Dispute</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmountInDisputes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Funds on hold</p>
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
                  placeholder="Search disputes..."
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
                 <SelectItem value="escalated">Escalated</SelectItem>
                 <SelectItem value="resolved">Resolved</SelectItem>
                 <SelectItem value="closed">Closed</SelectItem>
               </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="order">Order</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="escrow">Escrow</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dispute Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Related ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-medium">{dispute.id}</TableCell>
                    <TableCell>
                      <Badge className={getDisputeTypeColor(dispute.type)}>
                        {dispute.type.charAt(0).toUpperCase() + dispute.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{dispute.relatedId}</TableCell>
                    <TableCell className="max-w-xs truncate">{dispute.title}</TableCell>
                    <TableCell>
                      <Badge className={getDisputeStatusColor(dispute.status)}>
                        {dispute.status.charAt(0).toUpperCase() + dispute.status.replace('-', ' ').slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(dispute.priority)}>
                        {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{dispute.buyer}</TableCell>
                    <TableCell>{dispute.seller}</TableCell>
                    <TableCell>${dispute.amount.toFixed(2)}</TableCell>
                    <TableCell>{dispute.submitDate}</TableCell>
                    <TableCell>{dispute.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleMediationTools(dispute.id)}>
                            <Shield className="h-4 w-4 mr-1" />
                            Mediation Tools
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEscalateDispute(dispute.id)}
                            disabled={escalatingDisputes.get(dispute.id) || dispute.status === 'escalated'}
                          >
                            {escalatingDisputes.get(dispute.id) && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Escalate
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

      {/* Dispute Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Dispute Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'Product Quality', count: disputes.filter(d => d.reason === 'Product quality').length, color: 'bg-red-100 text-red-800' },
              { category: 'Shipping Issues', count: disputes.filter(d => d.reason === 'Shipping issue').length, color: 'bg-yellow-100 text-yellow-800' },
              { category: 'Late Delivery', count: disputes.filter(d => d.reason === 'Late delivery').length, color: 'bg-orange-100 text-orange-800' },
              { category: 'Scope Disagreement', count: disputes.filter(d => d.reason === 'Scope change').length, color: 'bg-purple-100 text-purple-800' },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className={`text-2xl font-bold ${item.color.split(' ')[0]} rounded-full h-16 w-16 flex items-center justify-center mx-auto`}>{item.count}</div>
                <div className="text-sm mt-2">{item.category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mediation Tools Modal */}
      <Dialog open={showMediationModal} onOpenChange={(open) => {
        setShowMediationModal(open);
        if (!open) setSelectedDisputeId(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mediation Tools</DialogTitle>
            <DialogDescription>
              Use these tools to facilitate dispute resolution between parties.
              {selectedDisputeId && <span className="block mt-1 font-medium">Dispute ID: {selectedDisputeId}</span>}
            </DialogDescription>
          </DialogHeader>
          {!selectedDisputeId ? (
            <div className="text-center py-4">
              <p className="text-red-600">No dispute selected. Please select a dispute first.</p>
            </div>
          ) : (
            <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Button
                 variant="outline"
                 className="h-20 flex flex-col items-center justify-center"
                 onClick={handleStartChatMediation}
                 aria-label={`Start chat mediation for dispute ${selectedDisputeId}`}
               >
                 <MessageSquare className="h-6 w-6 mb-2" />
                 <span>Start Chat Mediation</span>
               </Button>
               <Button
                 variant="outline"
                 className="h-20 flex flex-col items-center justify-center"
                 onClick={handleReviewEvidence}
                 aria-label={`Review evidence for dispute ${selectedDisputeId}`}
               >
                 <Shield className="h-6 w-6 mb-2" />
                 <span>Review Evidence</span>
               </Button>
               <Button
                 variant="outline"
                 className="h-20 flex flex-col items-center justify-center"
                 onClick={handleContactParties}
                 aria-label={`Contact parties for dispute ${selectedDisputeId}`}
               >
                 <User className="h-6 w-6 mb-2" />
                 <span>Contact Parties</span>
               </Button>
               <Button
                 variant="outline"
                 className="h-20 flex flex-col items-center justify-center"
                 onClick={handleProposeResolution}
                 aria-label={`Propose resolution for dispute ${selectedDisputeId}`}
               >
                 <CheckCircle className="h-6 w-6 mb-2" />
                 <span>Propose Resolution</span>
               </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowMediationModal(false)}>
                Close
              </Button>
            </div>
          </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}