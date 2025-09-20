import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Video, 
  Phone, 
  FileText, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Pill,
  Activity,
  Heart,
  Thermometer,
  Camera,
  Mic,
  MicOff,
  VideoOff
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  complaint: string;
  urgency: 'low' | 'medium' | 'high';
  waitTime: string;
  vitals?: {
    temperature: string;
    bp: string;
    heartRate: string;
    glucose?: string;
  };
  assistedBy?: string;
}

export function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('queue');
  const [currentConsultation, setCurrentConsultation] = useState<Patient | null>(null);
  const [prescription, setPrescription] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const patientQueue: Patient[] = [
    {
      id: '001',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      location: 'Nabha, Punjab',
      complaint: 'Chest pain, difficulty breathing',
      urgency: 'high',
      waitTime: '5 min',
      vitals: {
        temperature: '99.2°F',
        bp: '140/90',
        heartRate: '95 BPM'
      }
    },
    {
      id: '002',
      name: 'Sunita Devi',
      age: 32,
      gender: 'Female',
      location: 'Amloh, Punjab',
      complaint: 'Fever, headache for 3 days',
      urgency: 'medium',
      waitTime: '12 min',
      vitals: {
        temperature: '101.5°F',
        bp: '120/80',
        heartRate: '88 BPM'
      },
      assistedBy: 'Health Worker: Priya Sharma'
    },
    {
      id: '003',
      name: 'Ram Singh',
      age: 28,
      gender: 'Male',
      location: 'Kharar, Punjab',
      complaint: 'Cough and cold symptoms',
      urgency: 'low',
      waitTime: '20 min',
      vitals: {
        temperature: '98.6°F',
        bp: '118/75',
        heartRate: '72 BPM'
      }
    },
    {
      id: '004',
      name: 'Kavita Patel',
      age: 55,
      gender: 'Female',
      location: 'Rajpura, Punjab',
      complaint: 'Diabetes follow-up, high glucose',
      urgency: 'medium',
      waitTime: '8 min',
      vitals: {
        temperature: '98.4°F',
        bp: '125/85',
        heartRate: '78 BPM',
        glucose: '180 mg/dL'
      },
      assistedBy: 'Health Worker: Ravi Kumar'
    }
  ];

  const completedConsultations = [
    { id: '005', name: 'Harpreet Kaur', time: '2:30 PM', diagnosis: 'Hypertension', prescription: 'Amlodipine 5mg' },
    { id: '006', name: 'Gurmeet Singh', time: '1:45 PM', diagnosis: 'Common Cold', prescription: 'Paracetamol, Rest' },
    { id: '007', name: 'Neha Sharma', time: '11:20 AM', diagnosis: 'Migraine', prescription: 'Sumatriptan 50mg' }
  ];

  const startConsultation = (patient: Patient) => {
    setCurrentConsultation(patient);
    setActiveTab('consultation');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Doctor Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl">Dr. Priya Sharma</h1>
              <p className="text-gray-600">General Medicine • Civil Hospital Nabha</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Available
            </Badge>
            <span className="text-sm text-gray-500">Today: 15 Jan 2025</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Patients in Queue</p>
                <p className="text-2xl font-bold">{patientQueue.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold">{completedConsultations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Urgent Cases</p>
                <p className="text-2xl font-bold">{patientQueue.filter(p => p.urgency === 'high').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg. Wait Time</p>
                <p className="text-2xl font-bold">12 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Patient Queue</TabsTrigger>
          <TabsTrigger value="consultation">Active Consultation</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Patient Queue (AI Sorted by Urgency)</span>
                <Badge variant="outline">Auto-Updated</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientQueue.map((patient) => (
                  <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{patient.name}</h3>
                            <Badge className={`text-xs ${getUrgencyColor(patient.urgency)}`}>
                              {patient.urgency.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{patient.age}Y, {patient.gender} • {patient.location}</p>
                          <p className="text-sm mt-1"><strong>Complaint:</strong> {patient.complaint}</p>
                          {patient.assistedBy && (
                            <p className="text-xs text-blue-600 mt-1">🤝 {patient.assistedBy}</p>
                          )}
                          
                          {patient.vitals && (
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                              <span className="flex items-center">
                                <Thermometer className="h-3 w-3 mr-1" />
                                {patient.vitals.temperature}
                              </span>
                              <span className="flex items-center">
                                <Activity className="h-3 w-3 mr-1" />
                                {patient.vitals.bp}
                              </span>
                              <span className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {patient.vitals.heartRate}
                              </span>
                              {patient.vitals.glucose && (
                                <span>🩸 {patient.vitals.glucose}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">Waiting: {patient.waitTime}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => startConsultation(patient)}>
                            <Video className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultation" className="space-y-6">
          {currentConsultation ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Call Area */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Video Consultation - {currentConsultation.name}</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={isVideoOn ? "default" : "destructive"}
                          onClick={() => setIsVideoOn(!isVideoOn)}
                        >
                          {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant={isAudioOn ? "default" : "destructive"}
                          onClick={() => setIsAudioOn(!isAudioOn)}
                        >
                          {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-lg relative flex items-center justify-center">
                      <div className="text-white text-center">
                        <Avatar className="h-24 w-24 mx-auto mb-4">
                          <AvatarFallback className="text-2xl">
                            {currentConsultation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-lg">{currentConsultation.name}</p>
                        <p className="text-sm opacity-75">Connected via video</p>
                        {currentConsultation.assistedBy && (
                          <p className="text-xs mt-2 text-green-400">
                            {currentConsultation.assistedBy}
                          </p>
                        )}
                      </div>
                      
                      {/* Doctor's video preview */}
                      <div className="absolute bottom-4 right-4 w-32 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Dr. Sharma</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-4">
                      <Button variant="destructive">
                        End Consultation
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Patient Info & Notes */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{currentConsultation.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age & Gender</p>
                      <p>{currentConsultation.age} years, {currentConsultation.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p>{currentConsultation.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Chief Complaint</p>
                      <p>{currentConsultation.complaint}</p>
                    </div>
                    
                    {currentConsultation.vitals && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Vitals</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Temperature: {currentConsultation.vitals.temperature}</div>
                          <div>BP: {currentConsultation.vitals.bp}</div>
                          <div>Heart Rate: {currentConsultation.vitals.heartRate}</div>
                          {currentConsultation.vitals.glucose && (
                            <div>Glucose: {currentConsultation.vitals.glucose}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter consultation notes..."
                      value={consultationNotes}
                      onChange={(e) => setConsultationNotes(e.target.value)}
                      className="mb-3"
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generate Prescription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter prescription details..."
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      className="mb-3"
                      rows={4}
                    />
                    <Button className="w-full">
                      <Pill className="h-4 w-4 mr-2" />
                      Generate Digital Prescription
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl mb-2">No Active Consultation</h3>
                <p className="text-gray-600">Select a patient from the queue to start consultation</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Consultations Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{consultation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{consultation.name}</p>
                        <p className="text-sm text-gray-600">Diagnosis: {consultation.diagnosis}</p>
                        <p className="text-xs text-gray-500">Prescription: {consultation.prescription}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{consultation.time}</p>
                      <Badge variant="outline" className="mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Consultations</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Consultation Time</span>
                  <span className="font-medium">18 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient Satisfaction</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Cases</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Diagnoses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Fever/Cold</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={60} className="w-20" />
                    <span className="text-sm">6</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hypertension</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={40} className="w-20" />
                    <span className="text-sm">4</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Diabetes</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={20} className="w-20" />
                    <span className="text-sm">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}