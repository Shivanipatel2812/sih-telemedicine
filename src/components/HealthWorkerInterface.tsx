import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  UserPlus, 
  Search, 
  Camera, 
  Activity, 
  Heart, 
  Thermometer,
  BarChart3,
  Upload,
  Phone,
  Video,
  MapPin,
  Languages,
  Stethoscope,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  aadhaar?: string;
  lastVisit?: string;
  conditions?: string[];
}

interface VitalReading {
  type: string;
  value: string;
  unit: string;
  timestamp: string;
  normal: boolean;
}

export function HealthWorkerInterface() {
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [vitals, setVitals] = useState<VitalReading[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisteringNew, setIsRegisteringNew] = useState(false);
  const [consultationLanguage, setConsultationLanguage] = useState('punjabi');

  const [newPatientData, setNewPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    aadhaar: ''
  });

  const existingPatients: PatientRecord[] = [
    {
      id: '001',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 98765 43210',
      address: 'Village Nabha, Punjab',
      aadhaar: '1234 5678 9012',
      lastVisit: '10 Jan 2025',
      conditions: ['Hypertension', 'Diabetes']
    },
    {
      id: '002',
      name: 'Sunita Devi',
      age: 32,
      gender: 'Female',
      phone: '+91 87654 32109',
      address: 'Amloh, Punjab',
      lastVisit: '5 Jan 2025',
      conditions: ['Anemia']
    },
    {
      id: '003',
      name: 'Kavita Patel',
      age: 55,
      gender: 'Female',
      phone: '+91 76543 21098',
      address: 'Rajpura, Punjab',
      lastVisit: '15 Dec 2024',
      conditions: ['Diabetes Type 2']
    }
  ];

  const currentVitals: VitalReading[] = [
    { type: 'Temperature', value: '101.5', unit: '°F', timestamp: '10:30 AM', normal: false },
    { type: 'Blood Pressure', value: '120/80', unit: 'mmHg', timestamp: '10:28 AM', normal: true },
    { type: 'Heart Rate', value: '88', unit: 'BPM', timestamp: '10:28 AM', normal: true },
    { type: 'Blood Glucose', value: '95', unit: 'mg/dL', timestamp: '10:25 AM', normal: true }
  ];

  const handleVitalUpload = (type: string, value: string, unit: string) => {
    const newVital: VitalReading = {
      type,
      value,
      unit,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      normal: true // You'd implement proper validation logic here
    };
    setVitals([...vitals, newVital]);
  };

  const handlePatientRegistration = () => {
    if (newPatientData.name && newPatientData.age && newPatientData.phone) {
      const newPatient: PatientRecord = {
        id: Date.now().toString(),
        name: newPatientData.name,
        age: parseInt(newPatientData.age),
        gender: newPatientData.gender,
        phone: newPatientData.phone,
        address: newPatientData.address,
        aadhaar: newPatientData.aadhaar
      };
      
      // In real app, you'd save to database
      setIsRegisteringNew(false);
      setNewPatientData({ name: '', age: '', gender: '', phone: '', address: '', aadhaar: '' });
      setSelectedPatient(newPatient);
    }
  };

  const filteredPatients = existingPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Health Worker Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl">Priya Sharma</h1>
              <p className="text-gray-600">Community Health Worker • Nabha PHC</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="bg-purple-100 text-purple-800">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              On Duty
            </Badge>
            <span className="text-sm text-gray-500">Shift: 9 AM - 5 PM</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Patients Assisted Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Vitals Recorded</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Consultations Facilitated</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Languages className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Translation Sessions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patients">Patient Management</TabsTrigger>
          <TabsTrigger value="assistance">Consultation Assistance</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Recording</TabsTrigger>
          <TabsTrigger value="reports">Daily Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Search/Register */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Lookup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setIsRegisteringNew(true)}
                    variant="outline"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register New Patient
                  </Button>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedPatient?.id === patient.id ? 'border-purple-500 bg-purple-50' : ''
                        }`}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.age}Y, {patient.gender}</p>
                        <p className="text-xs text-gray-500">{patient.phone}</p>
                        {patient.lastVisit && (
                          <p className="text-xs text-gray-400">Last visit: {patient.lastVisit}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Patient Details / Registration Form */}
            <div className="lg:col-span-2">
              {isRegisteringNew ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Register New Patient</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name *</label>
                        <Input
                          value={newPatientData.name}
                          onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Age *</label>
                        <Input
                          type="number"
                          value={newPatientData.age}
                          onChange={(e) => setNewPatientData({...newPatientData, age: e.target.value})}
                          placeholder="Enter age"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Gender *</label>
                        <Select value={newPatientData.gender} onValueChange={(value) => setNewPatientData({...newPatientData, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone Number *</label>
                        <Input
                          value={newPatientData.phone}
                          onChange={(e) => setNewPatientData({...newPatientData, phone: e.target.value})}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Address</label>
                      <Textarea
                        value={newPatientData.address}
                        onChange={(e) => setNewPatientData({...newPatientData, address: e.target.value})}
                        placeholder="Enter complete address"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Aadhaar Number (Optional)</label>
                      <Input
                        value={newPatientData.aadhaar}
                        onChange={(e) => setNewPatientData({...newPatientData, aadhaar: e.target.value})}
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button onClick={handlePatientRegistration} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Register Patient
                      </Button>
                      <Button variant="outline" onClick={() => setIsRegisteringNew(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : selectedPatient ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Patient Details
                      <Badge variant="outline">ID: {selectedPatient.id}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{selectedPatient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Age & Gender</p>
                        <p>{selectedPatient.age} years, {selectedPatient.gender}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p>{selectedPatient.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p>{selectedPatient.address}</p>
                    </div>
                    
                    {selectedPatient.aadhaar && (
                      <div>
                        <p className="text-sm text-gray-600">Aadhaar</p>
                        <p>{selectedPatient.aadhaar}</p>
                      </div>
                    )}
                    
                    {selectedPatient.conditions && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Known Conditions</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.conditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">{condition}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1" onClick={() => setActiveTab('vitals')}>
                        <Activity className="h-4 w-4 mr-2" />
                        Record Vitals
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setActiveTab('assistance')}>
                        <Stethoscope className="h-4 w-4 mr-2" />
                        Assist Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No Patient Selected</h3>
                    <p className="text-gray-600">Search for an existing patient or register a new one</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assistance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Consultation Language</label>
                  <Select value={consultationLanguage} onValueChange={setConsultationLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Common Phrases</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>How are you feeling?</span>
                      <span className="text-blue-600">ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Where is the pain?</span>
                      <span className="text-blue-600">ਦਰਦ ਕਿੱਥੇ ਹੈ?</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Take this medicine</span>
                      <span className="text-blue-600">ਇਹ ਦਵਾਈ ਲਓ</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Consultation Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPatient ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarFallback>{selectedPatient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedPatient.name}</p>
                        <p className="text-sm text-gray-600">Assistance Mode</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Start Video Call with Doctor
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Audio Call Only
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Patient Photo
                      </Button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        💡 <strong>Tip:</strong> Help patient describe symptoms clearly. Use local language for better communication.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select a patient to start consultation assistance</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Record Patient Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPatient ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarFallback>{selectedPatient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedPatient.name}</p>
                        <p className="text-sm text-gray-600">Age: {selectedPatient.age}, {selectedPatient.gender}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Temperature (°F)</label>
                        <div className="flex space-x-2">
                          <Input placeholder="98.6" />
                          <Button size="sm">
                            <Thermometer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Blood Pressure</label>
                        <div className="flex space-x-2">
                          <Input placeholder="120/80" />
                          <Button size="sm">
                            <Activity className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Heart Rate (BPM)</label>
                        <div className="flex space-x-2">
                          <Input placeholder="72" />
                          <Button size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Blood Glucose (mg/dL)</label>
                        <div className="flex space-x-2">
                          <Input placeholder="95" />
                          <Button size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload All Vitals
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select a patient to record vitals</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentVitals.map((vital, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{vital.type}</p>
                        <p className="text-sm text-gray-600">{vital.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{vital.value} {vital.unit}</p>
                        <Badge variant={vital.normal ? "default" : "destructive"}>
                          {vital.normal ? "Normal" : "Abnormal"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Patients Assisted</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>New Registrations</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultations Facilitated</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Vitals Recorded</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Cases</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Punjabi</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hindi</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">15%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>English</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Patients Assisted</span>
                    <span className="text-sm">40/50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">New Registrations</span>
                    <span className="text-sm">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Training Hours</span>
                    <span className="text-sm">3/4</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit Daily Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter any observations, challenges, or notes from today's work..."
                rows={4}
              />
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}