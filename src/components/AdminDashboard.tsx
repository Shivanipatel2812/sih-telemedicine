import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  Activity, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  Stethoscope,
  UserCheck,
  Calendar,
  Clock,
  Heart,
  Pill,
  PhoneCall,
  VideoIcon,
  FileText,
  Download,
  Filter,
  Search,
  Shield,
  CheckCircle
} from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Mock data for analytics
  const consultationData = [
    { name: 'Mon', consultations: 45, emergencies: 3 },
    { name: 'Tue', consultations: 52, emergencies: 1 },
    { name: 'Wed', consultations: 48, emergencies: 4 },
    { name: 'Thu', consultations: 61, emergencies: 2 },
    { name: 'Fri', consultations: 55, emergencies: 1 },
    { name: 'Sat', consultations: 38, emergencies: 5 },
    { name: 'Sun', consultations: 42, emergencies: 2 }
  ];

  const diseaseData = [
    { name: 'Fever/Cold', value: 35, color: '#8884d8' },
    { name: 'Hypertension', value: 25, color: '#82ca9d' },
    { name: 'Diabetes', value: 20, color: '#ffc658' },
    { name: 'Respiratory Issues', value: 15, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#00ff88' }
  ];

  const districtStats = [
    { district: 'Nabha', population: 150000, registered: 12500, consultations: 1250, healthWorkers: 8, doctors: 3 },
    { district: 'Amloh', population: 75000, registered: 6200, consultations: 620, healthWorkers: 5, doctors: 2 },
    { district: 'Kharar', population: 120000, registered: 9800, consultations: 980, healthWorkers: 6, doctors: 2 },
    { district: 'Rajpura', population: 95000, registered: 7800, consultations: 780, healthWorkers: 4, doctors: 2 }
  ];

  const mockDoctors = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Medicine', patients: 45, rating: 4.8, status: 'Active' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Pediatrics', patients: 32, rating: 4.7, status: 'Active' },
    { id: 3, name: 'Dr. Anjali Patel', specialty: 'Gynecology', patients: 28, rating: 4.9, status: 'Active' },
    { id: 4, name: 'Dr. Harpreet Singh', specialty: 'Cardiology', patients: 18, rating: 4.6, status: 'Busy' }
  ];

  const mockHealthWorkers = [
    { id: 1, name: 'Priya Sharma', location: 'Nabha PHC', patientsToday: 8, totalPatients: 145, status: 'Active' },
    { id: 2, name: 'Ravi Kumar', location: 'Amloh CHC', patientsToday: 6, totalPatients: 98, status: 'Active' },
    { id: 3, name: 'Sunita Devi', location: 'Kharar PHC', patientsToday: 12, totalPatients: 178, status: 'Active' },
    { id: 4, name: 'Manjeet Kaur', location: 'Rajpura CHC', patientsToday: 4, totalPatients: 89, status: 'Off Duty' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Admin Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl">Admin Dashboard</h1>
              <p className="text-gray-600">TeleMed Rural Platform • Punjab Health Department</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">Last 24h</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="default" className="bg-green-100 text-green-800">
              System Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Registered Patients</p>
                <p className="text-2xl font-bold">36,300</p>
                <p className="text-xs text-green-600">↑ 12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Consultations This Week</p>
                <p className="text-2xl font-bold">1,341</p>
                <p className="text-xs text-green-600">↑ 8% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Healthcare Workers</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-gray-500">9 Doctors, 14 Health Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Emergency Cases</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-red-600">↑ 2 from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="districts">Districts</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Consultation Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Consultation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={consultationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="consultations" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="emergencies" stroke="#ff0000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Common Diseases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Health Issues (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={diseaseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {diseaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Real-time System Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Server Uptime</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">99.9%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Connections</span>
                  <span className="font-medium">342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>API Response Time</span>
                  <span className="font-medium">120ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PhoneCall className="h-5 w-5 mr-2 text-blue-500" />
                  Today's Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Video Consultations</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Consultations</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Text Consultations</span>
                  <span className="font-medium">67</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Calls</span>
                  <span className="font-medium text-red-600">4</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Avg. Travel Time Saved</span>
                  <span className="font-medium text-green-600">2.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings per Patient</span>
                  <span className="font-medium text-green-600">₹450</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient Satisfaction</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Follow-up Compliance</span>
                  <span className="font-medium">78%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Consultation Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={consultationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consultations" fill="#8884d8" />
                    <Bar dataKey="emergencies" fill="#ff0000" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Heat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">Consultation density by region (per 1000 population)</div>
                  {districtStats.map((district) => (
                    <div key={district.district} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-medium">{district.district}</p>
                          <p className="text-sm text-gray-600">Pop: {district.population.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{((district.consultations / district.population) * 1000).toFixed(1)}</p>
                        <p className="text-xs text-gray-500">{district.consultations} consultations</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Mobile App</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Health Worker Assisted</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Direct Web Access</span>
                    <span className="text-sm">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Punjabi</span>
                    <span className="text-sm">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Hindi</span>
                    <span className="text-sm">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">English</span>
                    <span className="text-sm">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Resolved Remotely</span>
                  <span className="text-sm font-medium text-green-600">72%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Referred to Hospital</span>
                  <span className="text-sm font-medium text-yellow-600">18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Emergency Transfers</span>
                  <span className="text-sm font-medium text-red-600">5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Follow-up Required</span>
                  <span className="text-sm font-medium text-blue-600">25%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="districts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                District-wise Overview
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="nabha">Nabha</SelectItem>
                    <SelectItem value="amloh">Amloh</SelectItem>
                    <SelectItem value="kharar">Kharar</SelectItem>
                    <SelectItem value="rajpura">Rajpura</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtStats.map((district) => (
                  <div key={district.district} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-medium">{district.district}</h3>
                          <p className="text-sm text-gray-600">Population: {district.population.toLocaleString()}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {((district.registered / district.population) * 100).toFixed(1)}% Registered
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Registered</p>
                        <p className="font-bold">{district.registered.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Consultations</p>
                        <p className="font-bold">{district.consultations}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <UserCheck className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Health Workers</p>
                        <p className="font-bold">{district.healthWorkers}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Stethoscope className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Doctors</p>
                        <p className="font-bold">{district.doctors}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDoctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">{doctor.patients} patients</span>
                            <span className="text-xs">⭐ {doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={doctor.status === 'Active' ? 'default' : 'secondary'}>
                        {doctor.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHealthWorkers.map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{worker.name}</p>
                          <p className="text-sm text-gray-600">{worker.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">Today: {worker.patientsToday}</span>
                            <span className="text-xs text-gray-500">Total: {worker.totalPatients}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>
                        {worker.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Add New Health Worker
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation Summary</SelectItem>
                      <SelectItem value="disease">Disease Prevalence</SelectItem>
                      <SelectItem value="utilization">Platform Utilization</SelectItem>
                      <SelectItem value="staff">Staff Performance</SelectItem>
                      <SelectItem value="financial">Cost Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Period</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">District Filter</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      <SelectItem value="nabha">Nabha</SelectItem>
                      <SelectItem value="amloh">Amloh</SelectItem>
                      <SelectItem value="kharar">Kharar</SelectItem>
                      <SelectItem value="rajpura">Rajpura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">Monthly Health Report</p>
                        <p className="text-xs text-gray-600">Generated on 14 Jan 2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Disease Prevalence Analysis</p>
                        <p className="text-xs text-gray-600">Generated on 10 Jan 2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">Staff Performance Review</p>
                        <p className="text-xs text-gray-600">Generated on 5 Jan 2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Platform Adoption</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-gray-500">Target population reached</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-blue-600">4.2 min</p>
                  <p className="text-xs text-gray-500">From symptom check to doctor</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Patient Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">4.7/5</p>
                  <p className="text-xs text-gray-500">Based on 2,340 reviews</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Pill className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Treatment Compliance</p>
                  <p className="text-2xl font-bold text-orange-600">78%</p>
                  <p className="text-xs text-gray-500">Patients following prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}