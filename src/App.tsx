import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { PatientApp } from './components/PatientApp';
import { DoctorDashboard } from './components/DoctorDashboard';
import { HealthWorkerInterface } from './components/HealthWorkerInterface';
import { AdminDashboard } from './components/AdminDashboard';
import { Stethoscope, Users, Heart, Shield, Smartphone } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'select' | 'patient' | 'doctor' | 'health-worker' | 'admin'>('select');

  if (currentRole === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-green-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">TeleMed Rural</h1>
            </div>
            <p className="text-xl text-gray-600 mb-2">स्वास्थ्य सेवा सबके लिए | Healthcare for All</p>
            <p className="text-lg text-gray-500">Telemedicine Platform for Rural India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500" onClick={() => setCurrentRole('patient')}>
              <div className="text-center">
                <Smartphone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Patient App</h3>
                <p className="text-gray-600 mb-4">मरीज़ ऐप</p>
                <p className="text-sm text-gray-500">Consult doctors, check symptoms, book appointments</p>
                <Button className="w-full mt-4">Access Patient App</Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500" onClick={() => setCurrentRole('doctor')}>
              <div className="text-center">
                <Stethoscope className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Doctor Portal</h3>
                <p className="text-gray-600 mb-4">डॉक्टर पोर्टल</p>
                <p className="text-sm text-gray-500">Manage patients, consultations, prescriptions</p>
                <Button className="w-full mt-4">Doctor Login</Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500" onClick={() => setCurrentRole('health-worker')}>
              <div className="text-center">
                <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Health Worker</h3>
                <p className="text-gray-600 mb-4">स्वास्थ्य कार्यकर्ता</p>
                <p className="text-sm text-gray-500">Assist patients, upload vitals, local support</p>
                <Button className="w-full mt-4">Health Worker Access</Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-red-500" onClick={() => setCurrentRole('admin')}>
              <div className="text-center">
                <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Admin Dashboard</h3>
                <p className="text-gray-600 mb-4">प्रशासन डैशबोर्ड</p>
                <p className="text-sm text-gray-500">Analytics, management, system overview</p>
                <Button className="w-full mt-4">Admin Access</Button>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Prototype for Smart India Hackathon 2025 - Problem Statement SIH25018</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>🌐 Offline-First</span>
              <span>🗣️ Voice Assistant</span>
              <span>🏥 AI Triage</span>
              <span>📱 Mobile Optimized</span>
              <span>🚑 Emergency Support</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">TeleMed Rural</h1>
            </div>
            <Button variant="outline" onClick={() => setCurrentRole('select')}>
              Switch Role
            </Button>
          </div>
        </div>
      </div>

      {currentRole === 'patient' && <PatientApp />}
      {currentRole === 'doctor' && <DoctorDashboard />}
      {currentRole === 'health-worker' && <HealthWorkerInterface />}
      {currentRole === 'admin' && <AdminDashboard />}
    </div>
  );
}