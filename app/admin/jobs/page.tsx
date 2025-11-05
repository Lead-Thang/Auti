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
import { Search, Eye, Edit, FileText, Clock, DollarSign, User, CheckCircle, XCircle } from 'lucide-react';

// Mock data for jobs
const mockJobs = [
  { id: '#JOB-001', title: 'Website Design for E-commerce', category: 'Web Design', budget: 1200, status: 'active', postedDate: '2023-10-20', deadline: '2023-11-15', client: 'Tech Startup', applicants: 12, skills: ['Figma', 'UI/UX', 'React'] },
  { id: '#JOB-002', title: 'Content Writing for Blog', category: 'Content Writing', budget: 300, status: 'active', postedDate: '2023-10-21', deadline: '2023-11-10', client: 'Marketing Agency', applicants: 8, skills: ['SEO', 'Copywriting', 'Blogging'] },
  { id: '#JOB-003', title: 'Logo Design & Brand Identity', category: 'Graphic Design', budget: 500, status: 'completed', postedDate: '2023-10-15', deadline: '2023-10-25', client: 'New Business', applicants: 15, skills: ['Illustrator', 'Photoshop', 'Branding'] },
  { id: '#JOB-004', title: 'Mobile App Development', category: 'App Development', budget: 4500, status: 'in-progress', postedDate: '2023-10-18', deadline: '2023-12-20', client: 'Fintech Company', applicants: 6, skills: ['React Native', 'Node.js', 'MongoDB'] },
  { id: '#JOB-005', title: 'Social Media Marketing', category: 'Digital Marketing', budget: 800, status: 'active', postedDate: '2023-10-22', deadline: '2023-11-30', client: 'E-commerce Store', applicants: 5, skills: ['Instagram', 'Facebook', 'Content Creation'] },
  { id: '#JOB-006', title: 'Video Editing for Product Demo', category: 'Video Editing', budget: 400, status: 'closed', postedDate: '2023-10-10', deadline: '2023-10-20', client: 'Gadget Company', applicants: 18, skills: ['Premiere Pro', 'After Effects', 'Motion Graphics'] },
];

export default function JobsPage() {
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    let result = mockJobs;
    
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(job => job.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
      result = result.filter(job => job.category === categoryFilter);
    }
    
    setFilteredJobs(result);
  }, [searchTerm, statusFilter, categoryFilter]);

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryOptions = () => {
    const categories = [...new Set(mockJobs.map(j => j.category))];
    return ['all', ...categories];
  };

  const totalJobs = filteredJobs.length;
  const totalBudget = filteredJobs.reduce((sum, job) => sum + job.budget, 0);
  const activeJobs = filteredJobs.filter(j => j.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Management</h1>
        <Button>Post New Job</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">Currently open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">For filtered jobs</p>
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
                  placeholder="Search jobs..."
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
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getCategoryOptions()
                  .filter(c => c !== 'all')
                  .map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{job.category}</Badge>
                    </TableCell>
                    <TableCell>{job.client}</TableCell>
                    <TableCell>${job.budget.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getJobStatusColor(job.status)}>
                        {job.status.charAt(0).toUpperCase() + job.status.replace('-', ' ').slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applicants}</TableCell>
                    <TableCell>{job.postedDate}</TableCell>
                    <TableCell>{job.deadline}</TableCell>
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

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Job Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {getCategoryOptions()
               .filter(c => c !== 'all')
               .map((category) => {
                 const count = mockJobs.filter(j => j.category === category).length;
                return (
                  <div key={category} className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-gray-500">{category}</div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}