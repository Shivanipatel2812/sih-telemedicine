import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  MessageCircle, 
  Video, 
  Phone, 
  Calendar, 
  Pill, 
  AlertTriangle, 
  Mic, 
  MicOff,
  Send,
  MapPin,
  Clock,
  Star,
  Heart,
  Thermometer,
  Activity
} from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
  urgency?: 'low' | 'medium' | 'high';
}

export function PatientApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      message: 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। आप कैसा महसूस कर रहे हैं? / Hello! I am your health assistant. How are you feeling?',
      timestamp: '10:30 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [consultationStep, setConsultationStep] = useState(0);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      let urgency: 'low' | 'medium' | 'high' = 'low';

      if (newMessage.toLowerCase().includes('fever') || newMessage.toLowerCase().includes('बुखार')) {
        aiResponse = 'मुझे समझ आया कि आपको बुखार है। कृपया बताएं कि आपका तापमान कितना है? / I understand you have fever. Please tell me what is your temperature?';
        urgency = 'medium';
      } else if (newMessage.toLowerCase().includes('chest pain') || newMessage.toLowerCase().includes('सीने में दर्द')) {
        aiResponse = '⚠️ सीने में दर्द गंभीर हो सकता है। तुरंत डॉक्टर से मिलें। मैं आपके लिए तत्काल परामर्श बुक कर रहा हूं। / Chest pain can be serious. Please see a doctor immediately. I am booking urgent consultation for you.';
        urgency = 'high';
      } else {
        aiResponse = 'धन्यवाद। कृपया अपने लक्षणों के बारे में और बताएं। / Thank you. Please tell me more about your symptoms.';
      }

      const aiMessage: ChatMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        urgency
      };

      setChatMessages(prev => [...prev, aiMessage]);
    }, 1500);

    setNewMessage('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setNewMessage('मुझे सिरदर्द है / I have headache');
        setIsListening(false);
      }, 2000);
    }
  };

  const mockDoctors = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Medicine', rating: 4.8, experience: '8 years', available: true, fee: '₹200', language: 'Hindi, English' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Pediatrics', rating: 4.7, experience: '12 years', available: true, fee: '₹250', language: 'Punjabi, Hindi' },
    { id: 3, name: 'Dr. Anjali Patel', specialty: 'Gynecology', rating: 4.9, experience: '10 years', available: false, fee: '₹300', language: 'Hindi, English' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Mobile App Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl">स्वागतम् राजू</h1>
            <p className="text-sm opacity-90">Welcome Raju</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Village: Nabha, Punjab</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs">Online</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 m-2">
          <TabsTrigger value="home" className="text-xs">
            <Heart className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="text-xs">
            <MessageCircle className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="consult" className="text-xs">
            <Video className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="text-xs">
            <Pill className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="emergency" className="text-xs">
            <AlertTriangle className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Quick Health Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Thermometer className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm">Temperature</p>
                  <p className="font-semibold">98.6°F</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm">Heart Rate</p>
                  <p className="font-semibold">72 BPM</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => setActiveTab('symptoms')}>
                Start Symptom Check / लक्षण जांच शुरू करें
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">Consultation with Dr. Sharma</span>
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Pill className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Prescription received</span>
                  </div>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="h-[calc(100vh-140px)] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg">AI Health Assistant</h2>
            <p className="text-sm text-gray-600">एआई स्वास्थ्य सहायक</p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : `${message.urgency === 'high' ? 'bg-red-50 border border-red-200' : 'bg-gray-100'}`
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                    {message.urgency && (
                      <Badge variant={message.urgency === 'high' ? 'destructive' : message.urgency === 'medium' ? 'default' : 'secondary'}>
                        {message.urgency} priority
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="अपने लक्षण बताएं / Describe your symptoms..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                size="sm"
                variant={isListening ? "destructive" : "outline"}
                onClick={toggleListening}
                className="px-3"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button size="sm" onClick={handleSendMessage} className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isListening && (
              <div className="mt-2 text-center">
                <p className="text-sm text-red-600">🎙️ Listening... बोलिए</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="consult" className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Consultation</CardTitle>
              <p className="text-sm text-gray-600">परामर्श बुक करें</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Direct Video Consultation</p>
                    <p className="text-sm text-gray-600">Consult directly with doctor</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👨‍⚕️</span>
                  </div>
                  <div>
                    <p className="font-medium">Health Worker Assisted</p>
                    <p className="text-sm text-gray-600">Local health worker will help</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-medium">Available Doctors</h3>
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">{doctor.rating}</span>
                          <span className="text-xs text-gray-500 ml-2">{doctor.experience}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Languages: {doctor.language}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{doctor.fee}</p>
                      <Badge variant={doctor.available ? "default" : "secondary"} className="mt-1">
                        {doctor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  {doctor.available && (
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="flex-1">
                        <Video className="h-4 w-4 mr-1" />
                        Video Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
              <p className="text-sm text-gray-600">वर्तमान नुस्खे</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">Dr. Priya Sharma</p>
                    <p className="text-sm text-gray-600">General Medicine</p>
                    <p className="text-xs text-gray-500">Prescribed on: 15 Jan 2025</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Paracetamol 500mg</span>
                    <span className="text-sm text-gray-600">3 times daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Crocin Advance</span>
                    <span className="text-sm text-gray-600">After meals</span>
                  </div>
                </div>
                <Button className="w-full mt-3" variant="outline">
                  <Pill className="h-4 w-4 mr-2" />
                  Order from Pharmacy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Local Pharmacy</CardTitle>
              <p className="text-sm text-gray-600">स्थानीय दवाखाना</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Pill className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sharma Medical Store</p>
                      <p className="text-sm text-gray-600">0.5 km away</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="p-4 space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Services
              </CardTitle>
              <p className="text-sm text-red-600">आपातकालीन सेवाएं</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
                🚑 Call Ambulance / एम्बुलेंस बुलाएं
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-red-200">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 108
                </Button>
                <Button variant="outline" className="border-red-200">
                  <MapPin className="h-4 w-4 mr-2" />
                  Share Location
                </Button>
              </div>
              
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-medium mb-2">Nearest Hospitals</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Civil Hospital Nabha</span>
                    <span className="text-gray-600">2.1 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Max Hospital Patiala</span>
                    <span className="text-gray-600">25 km</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Emergency Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                Heart Attack / दिल का दौरा
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2 text-blue-500" />
                Breathing Problem / सांस लेने में तकलीफ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                Accident / दुर्घटना
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}