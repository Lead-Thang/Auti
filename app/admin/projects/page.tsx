'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { Search, Eye, Edit, FileText, Clock, DollarSign, User, TrendingUp, TrendingDown } from 'lucide-react';

// Mock data for projects
const mockProjects: Project[] = [
  { id: '#PROJ-001', title: 'Website Redesign', job: '#JOB-001', client: 'Tech Startup', freelancer: 'John Developer', budget: 1200, status: 'in-progress', startDate: '2025-10-20', deadline: '2025-12-01', progress: 65, milestone: 'Design Phase' },
  { id: '#PROJ-002', title: 'Blog Content Creation', job: '#JOB-002', client: 'Marketing Agency', freelancer: 'Jane Writer', budget: 300, status: 'in-progress', startDate: '2025-10-21', deadline: '2025-11-24', progress: 30, milestone: 'Research Phase' },
  { id: '#PROJ-003', title: 'Brand Identity', job: '#JOB-003', client: 'New Business', freelancer: 'Alex Designer', budget: 500, status: 'completed', startDate: '2025-10-15', deadline: '2025-10-25', progress: 100, milestone: 'Final Delivery' },
  { id: '#PROJ-004', title: 'Mobile App Development', job: '#JOB-004', client: 'Fintech Company', freelancer: 'Mike Dev', budget: 4500, status: 'in-progress', startDate: '2025-10-18', deadline: '2026-01-08', progress: 25, milestone: 'Backend Setup' },
  { id: '#PROJ-005', title: 'Social Media Campaign', job: '#JOB-005', client: 'E-commerce Store', freelancer: 'Sarah Marketer', budget: 800, status: 'not-started', startDate: '2025-10-22', deadline: '2025-12-16', progress: 0, milestone: 'Kickoff Meeting' },
  { id: '#PROJ-006', title: 'Product Demo Video', job: '#JOB-006', client: 'Gadget Company', freelancer: 'Tom Editor', budget: 400, status: 'on-hold', startDate: '2025-10-10', deadline: '2025-10-30', progress: 40, milestone: 'Rough Cut' },
];

interface Project {
  id: string;
  title: string;
  job: string;
  client: string;
  freelancer: string;
  budget: number;
  status: string;
  startDate: string;
  deadline: string;
  progress: number;
  milestone: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [freelancerFilter, setFreelancerFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0); // Reset time to start of day
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    let result = projects;
    
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.freelancer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    if (freelancerFilter !== 'all') {
      result = result.filter(project => project.freelancer === freelancerFilter);
    }
    
    setFilteredProjects(result);
  }, [searchTerm, statusFilter, freelancerFilter, projects]);

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'not-started':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFreelancerOptions = () => {
    const freelancers = [...new Set(mockProjects.map(p => p.freelancer))];
    return ['all', ...freelancers];
  };

  const handleAssignClick = useCallback(() => {
    // Open assign modal or navigate to assignment route
    setShowAssignModal(true);
    // Could also navigate to assignment page: router.push('/admin/projects/assign')
  }, []);

  const totalProjects = filteredProjects.length;
  const totalBudget = filteredProjects.reduce((sum, project) => sum + project.budget, 0);
  const inProgressProjects = filteredProjects.filter(p => p.status === 'in-progress').length;
  const completedProjects = filteredProjects.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <Button onClick={handleAssignClick}>Assign Project</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressProjects}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
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
                  placeholder="Search projects..."
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
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={freelancerFilter} onValueChange={setFreelancerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by freelancer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Freelancers</SelectItem>
                {getFreelancerOptions()
                  .filter(f => f !== 'all')
                  .map((freelancer) => (
                    <SelectItem key={freelancer} value={freelancer}>{freelancer}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Freelancer</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {filteredProjects.map((project) => {
                   const daysLeft = calculateDaysLeft(project.deadline);
                   return (
                   <TableRow key={project.id}>
                     <TableCell className="font-medium">{project.id}</TableCell>
                     <TableCell className="font-medium">{project.title}</TableCell>
                     <TableCell>{project.client}</TableCell>
                     <TableCell className="flex items-center">
                       <User className="h-4 w-4 mr-2 text-gray-500" />
                       {project.freelancer}
                     </TableCell>
                     <TableCell>{project.job}</TableCell>
                     <TableCell>${project.budget.toLocaleString()}</TableCell>
                     <TableCell>
                       <Badge className={getProjectStatusColor(project.status)}>
                         {project.status.charAt(0).toUpperCase() + project.status.replace('-', ' ').slice(1)}
                       </Badge>
                     </TableCell>
                     <TableCell>
                       <div className="flex items-center">
                         <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                           <div
                             className="bg-blue-600 h-2 rounded-full"
                             style={{ width: `${project.progress}%` }}
                           ></div>
                         </div>
                         <span>{project.progress}%</span>
                       </div>
                     </TableCell>
                     <TableCell>{project.milestone}</TableCell>
                      <TableCell>
                        <span className={daysLeft < 0 ? 'text-red-500' : daysLeft < 5 ? 'text-yellow-500' : 'text-green-500'}>
                          {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                        </span>
                      </TableCell>
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
                   );
                 })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects
              .filter(p => p.status !== 'completed' && p.status !== 'cancelled')
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
              .map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{project.title} ({project.id})</div>
                    <div className="text-sm text-gray-500">{project.client} • {project.milestone}</div>
                  </div>
                   <div className="text-right">
                     <div className="font-medium">
                       <span className={calculateDaysLeft(project.deadline) < 0 ? 'text-red-500' : calculateDaysLeft(project.deadline) < 5 ? 'text-yellow-500' : 'text-green-500'}>
                         {calculateDaysLeft(project.deadline) < 0 ? `${Math.abs(calculateDaysLeft(project.deadline))} days overdue` : `${calculateDaysLeft(project.deadline)} days left`}
                       </span>
                     </div>
                     <div className="text-sm text-gray-500">Deadline: {project.deadline}</div>
                   </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}