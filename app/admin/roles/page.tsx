'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
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
import { Search, Shield, Users, Settings, Edit, Plus, Eye } from 'lucide-react';

// Type definitions
interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

// Mock data for roles
const mockRoles = [
  { id: 1, name: 'Super Admin', description: 'Full platform access and admin management', permissions: ['all'], userCount: 2 },
  { id: 2, name: 'Admin', description: 'Standard admin access', permissions: ['user-management', 'content-moderation', 'orders', 'support'], userCount: 5 },
  { id: 3, name: 'Moderator', description: 'Content and user moderation', permissions: ['content-moderation', 'support'], userCount: 8 },
  { id: 4, name: 'Support Agent', description: 'Customer support and ticket management', permissions: ['support', 'messages'], userCount: 12 },
  { id: 5, name: 'Seller', description: 'Standard seller account', permissions: ['create-listings', 'manage-orders', 'payouts'], userCount: 1250 },
  { id: 6, name: 'Buyer', description: 'Standard buyer account', permissions: ['browse', 'purchase', 'reviews'], userCount: 8500 },
  { id: 7, name: 'Freelancer', description: 'Freelancer account', permissions: ['create-projects', 'bid', 'escrow'], userCount: 3200 },
];

// Mock data for permissions
const mockPermissions = [
  { id: 'user-management', name: 'User Management', description: 'View, edit, and manage user accounts' },
  { id: 'content-moderation', name: 'Content Moderation', description: 'Review and moderate user content' },
  { id: 'orders', name: 'Order Management', description: 'View and manage orders' },
  { id: 'support', name: 'Support Tickets', description: 'View and respond to support tickets' },
  { id: 'messages', name: 'Message Center', description: 'View and moderate platform messages' },
  { id: 'products', name: 'Product Management', description: 'View and manage products' },
  { id: 'payouts', name: 'Payouts', description: 'Process and manage payouts' },
  { id: 'create-listings', name: 'Create Listings', description: 'Ability to create new listings' },
  { id: 'manage-orders', name: 'Manage Orders', description: 'Manage own orders' },
  { id: 'browse', name: 'Browse Content', description: 'Browse platform content' },
  { id: 'purchase', name: 'Purchase', description: 'Ability to purchase items' },
  { id: 'reviews', name: 'Reviews', description: 'Create and manage reviews' },
  { id: 'create-projects', name: 'Create Projects', description: 'Create freelance projects' },
  { id: 'bid', name: 'Bid on Projects', description: 'Bid on freelance projects' },
  { id: 'escrow', name: 'Escrow Management', description: 'Manage escrow transactions' },
  { id: 'all', name: 'All Permissions', description: 'All possible permissions' },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(mockRoles);
  const [filteredRoles, setFilteredRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [permissions, setPermissions] = useState(mockPermissions);
   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
   const [editingRole, setEditingRole] = useState<Role | null>(null);
   const [rolePermissions, setRolePermissions] = useState<Permission[]>([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  useEffect(() => {
    let result = roles;
    
    if (searchTerm) {
      result = result.filter(role => 
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRoles(result);
  }, [searchTerm, roles]);

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setRolePermissions(role.permissions.map((permId: string) => 
      permissions.find(p => p.id === permId) || { id: permId, name: permId, description: 'Unknown permission' }
    ));
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
  };

  const handleAddNewRole = () => {
    setEditingRole({
      id: 0, // Using 0 to indicate a new role
      name: '',
      description: '',
      permissions: [],
      userCount: 0
    });
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      // Could show error message to user
      return;
    }
    
    // Check for duplicate names
    if (roles.some(r => r.name.toLowerCase() === newRoleName.trim().toLowerCase())) {
      // Could show error message to user
      return;
    }
    
    const newRole = {
      id: Math.max(...roles.map(r => r.id), 0) + 1,
      name: newRoleName,
      description: newRoleDescription,
      permissions: [],
      userCount: 0
    };
    setRoles([...roles, newRole]);
    setNewRoleName('');
    setNewRoleDescription('');
  };

  const handleSaveRole = () => {
    if (editingRole) {
      if (editingRole.id === 0) { // New role
        // Check for duplicate names
        if (roles.some(r => r.name.toLowerCase() === editingRole.name.toLowerCase())) {
          // Could show error message to user
          return;
        }
        
        const newRoleToSave = {
          ...editingRole,
          id: Math.max(...roles.map(r => r.id), 0) + 1,
        };
        setRoles([...roles, newRoleToSave]);
      } else { // Existing role
        setRoles(prev => 
          prev.map(r => r.id === editingRole.id ? editingRole : r)
        );
      }
      setEditingRole(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
  };

  const togglePermission = (permissionId: string) => {
    if (editingRole) {
      setEditingRole(prev => {
        if (!prev) return null;
        return {
          ...prev,
          permissions: prev.permissions.includes(permissionId)
            ? prev.permissions.filter((p: string) => p !== permissionId)
            : [...prev.permissions, permissionId]
        };
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-gray-500">Manage user roles and permissions</p>
        </div>
        <Button onClick={handleAddNewRole}>
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      {/* Role Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Create Role</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role-name">Role Name</Label>
            <Input
              id="role-name"
              placeholder="Enter role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="role-description">Description</Label>
            <Input
              id="role-description"
              placeholder="Enter role description"
              value={newRoleDescription}
              onChange={(e) => setNewRoleDescription(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button onClick={handleAddRole}>Create Role</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      {role.permissions.length} permissions
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{role.userCount} users</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewRole(role)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
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

       {/* Role Details Modal */}
       <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
         <DialogContent className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle>Role Details: {selectedRole?.name}</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <h3 className="font-medium">Description</h3>
               <p className="text-gray-600">{selectedRole?.description}</p>
             </div>

             <div>
               <h3 className="font-medium mb-2">Permissions</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                 {rolePermissions.map((permission) => (
                   <div key={permission.id} className="flex items-center p-2 bg-gray-50 rounded">
                     <Shield className="h-4 w-4 mr-2 text-blue-500" />
                     <div>
                       <div className="font-medium">{permission.name}</div>
                       <div className="text-sm text-gray-500">{permission.description}</div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </DialogContent>
       </Dialog>

       {/* Edit Role Modal */}
       <Dialog open={!!editingRole} onOpenChange={() => handleCancelEdit()}>
         <DialogContent className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle>{editingRole?.id === 0 ? 'Create New Role' : `Edit Role: ${editingRole?.name}`}</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <Label htmlFor="edit-role-name">Role Name</Label>
               <Input
                 id="edit-role-name"
                 value={editingRole?.name || ''}
                 onChange={(e) => editingRole && setEditingRole({...editingRole, name: e.target.value})}
               />
             </div>

             <div>
               <Label htmlFor="edit-role-description">Description</Label>
               <Input
                 id="edit-role-description"
                 value={editingRole?.description || ''}
                 onChange={(e) => editingRole && setEditingRole({...editingRole, description: e.target.value})}
               />
             </div>

             <div>
               <h3 className="font-medium mb-2">Permissions</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                 {permissions.map((permission) => (
                   <div key={permission.id} className="flex items-center p-2 bg-gray-50 rounded">
                     <input
                       type="checkbox"
                       id={`perm-${permission.id}`}
                       checked={editingRole?.permissions.includes(permission.id) || false}
                       onChange={() => togglePermission(permission.id)}
                       className="mr-2"
                     />
                     <label htmlFor={`perm-${permission.id}`} className="flex-1">
                       <div className="font-medium">{permission.name}</div>
                       <div className="text-sm text-gray-500">{permission.description}</div>
                     </label>
                   </div>
                 ))}
               </div>
             </div>

             <div className="flex justify-end space-x-2">
               <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
               <Button onClick={handleSaveRole}>Save Changes</Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>

      {/* Permission Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">User Management</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Permissions related to user accounts</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Content & Orders</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Permissions for content and order management</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="font-medium">Advanced</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">High-level admin permissions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}