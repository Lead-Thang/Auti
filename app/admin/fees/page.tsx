'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
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
import { Search, Edit, Plus, DollarSign, TrendingUp, TrendingDown, Settings } from 'lucide-react';

// Mock data for fee structures
const mockFeeStructures = [
  { id: 1, name: 'Standard Commission', type: 'percentage', value: 5, appliesTo: 'all-listings', description: 'Default 5% commission on all sales' },
  { id: 2, name: 'Premium Seller', type: 'percentage', value: 3, appliesTo: 'premium-sellers', description: 'Reduced commission for premium sellers' },
   { id: 6, name: 'High-Value Items', type: 'percentage', value: 3, appliesTo: 'high-value', description: 'Reduced commission on items over $500' },
  { id: 3, name: 'Listing Fee', type: 'fixed', value: 2.99, appliesTo: 'new-listings', description: 'Fixed fee for creating new product listings' },
  { id: 4, name: 'Featured Listing', type: 'fixed', value: 9.99, appliesTo: 'featured', description: 'Fee for featuring products in search results' },
  { id: 5, name: 'Escrow Service', type: 'percentage', value: 2, appliesTo: 'freelance', description: 'Fee for using escrow service on freelance projects' },
];

export default function FeesPage() {
  const [feeStructures, setFeeStructures] = useState(mockFeeStructures);
  const [filteredFees, setFilteredFees] = useState(mockFeeStructures);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [appliesToFilter, setAppliesToFilter] = useState('all');
  const [editingFee, setEditingFee] = useState<any>(null);

  useEffect(() => {
    let result = feeStructures;
    
    if (searchTerm) {
      result = result.filter(fee => 
        fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fee.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(fee => fee.type === typeFilter);
    }
    
    if (appliesToFilter !== 'all') {
      result = result.filter(fee => fee.appliesTo === appliesToFilter);
    }
    
    setFilteredFees(result);
  }, [searchTerm, typeFilter, appliesToFilter, feeStructures]);

  const getFeeTypeColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-100 text-blue-800';
      case 'fixed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppliesToColor = (appliesTo: string) => {
    switch (appliesTo) {
      case 'all-listings':
        return 'bg-purple-100 text-purple-800';
      case 'premium-sellers':
        return 'bg-yellow-100 text-yellow-800';
      case 'high-value':
        return 'bg-orange-100 text-orange-800';
      case 'new-listings':
        return 'bg-red-100 text-red-800';
      case 'featured':
        return 'bg-pink-100 text-pink-800';
      case 'freelance':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddFee = () => {
    // In a real app, you would open a form to add a new fee
    console.log("Add new fee");
  };

  const handleEditFee = (fee: any) => {
    setEditingFee(fee);
  };

  const handleSaveFee = () => {
    if (editingFee) {
      setFeeStructures(prev => 
        prev.map(f => f.id === editingFee.id ? editingFee : f)
      );
      setEditingFee(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingFee(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fee Structure</h1>
          <p className="text-gray-500">Manage platform fees and commission rates</p>
        </div>
        <Button onClick={handleAddFee}>
          <Plus className="h-4 w-4 mr-2" />
          Add Fee Structure
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Fee Structures</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeStructures.length}</div>
            <p className="text-xs text-muted-foreground">Currently configured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((feeStructures.filter(f => f.type === 'percentage').reduce((sum, f) => sum + f.value, 0) / 
               feeStructures.filter(f => f.type === 'percentage').length) || 0).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all percentage fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Fee</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">
               ${(() => {
                 const fixedFees = feeStructures.filter(f => f.type === 'fixed').map(f => f.value);
                 return fixedFees.length > 0 ? Math.max(...fixedFees) : 0;
               })().toFixed(2)}
             </div>
             <p className="text-xs text-muted-foreground">Highest fixed fee</p>
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
                  placeholder="Search fee structures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
            <Select value={appliesToFilter} onValueChange={setAppliesToFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="all-listings">All Listings</SelectItem>
                <SelectItem value="premium-sellers">Premium Sellers</SelectItem>
                <SelectItem value="high-value">High Value Items</SelectItem>
                <SelectItem value="new-listings">New Listings</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Structures Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Applies To</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.name}</TableCell>
                    <TableCell>
                      <Badge className={getFeeTypeColor(fee.type)}>
                        {fee.type.charAt(0).toUpperCase() + fee.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {fee.type === 'percentage' ? `${fee.value}%` : `$${fee.value.toFixed(2)}`}
                    </TableCell>
                    <TableCell>
                      <Badge className={getAppliesToColor(fee.appliesTo)}>
                        {fee.appliesTo.replace('-', ' ').charAt(0).toUpperCase() + fee.appliesTo.replace('-', ' ').slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{fee.description}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditFee(fee)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tiered Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tiered Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Free Tier</h3>
                <p className="text-2xl font-bold mt-2">5%</p>
                <p className="text-sm text-gray-500 mt-1">Commission rate</p>
                <p className="text-sm text-gray-500">All sellers</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Premium Tier</h3>
                <p className="text-2xl font-bold mt-2">3%</p>
                <p className="text-sm text-gray-500 mt-1">Commission rate</p>
                <p className="text-sm text-gray-500">Sellers with 100+ sales</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Enterprise Tier</h3>
                <p className="text-2xl font-bold mt-2">2%</p>
                <p className="text-sm text-gray-500 mt-1">Commission rate</p>
                <p className="text-sm text-gray-500">Sellers with 1000+ sales</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editing Modal */}
      {editingFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Edit Fee Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingFee.name}
                  onChange={(e) => setEditingFee({...editingFee, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={editingFee.type} onValueChange={(value) => setEditingFee({...editingFee, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">{editingFee.type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}</Label>
                <Input
                  id="value"
                  type="number"
                  value={editingFee.value}
                  onChange={(e) => setEditingFee({...editingFee, value: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="appliesTo">Applies To</Label>
                <Select value={editingFee.appliesTo} onValueChange={(value) => setEditingFee({...editingFee, appliesTo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-listings">All Listings</SelectItem>
                    <SelectItem value="premium-sellers">Premium Sellers</SelectItem>
                    <SelectItem value="high-value">High Value Items</SelectItem>
                    <SelectItem value="new-listings">New Listings</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editingFee.description}
                  onChange={(e) => setEditingFee({...editingFee, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveFee}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}