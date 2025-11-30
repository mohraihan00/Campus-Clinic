import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  patientNim: string;
  doctorId: string;
  doctorName: string;
  serviceType: string;
  queueNumber: number;
  date: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  estimatedTime?: string;
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: DoctorSchedule[];
  maxPatientsPerDay: number;
}

export interface DoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface QueueContextType {
  queues: QueueItem[];
  doctors: Doctor[];
  addQueue: (queue: Omit<QueueItem, 'id' | 'queueNumber' | 'createdAt'>) => QueueItem;
  updateQueueStatus: (id: string, status: QueueItem['status']) => void;
  cancelQueue: (id: string) => void;
  getQueuesByDate: (date: string) => QueueItem[];
  getQueuesByDoctor: (doctorId: string, date: string) => QueueItem[];
  getCurrentQueue: (doctorId: string) => QueueItem | null;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

// Mock doctors
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    specialty: 'Umum',
    maxPatientsPerDay: 20,
    schedule: [
      { day: 'Monday', startTime: '08:00', endTime: '14:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '14:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true },
    ],
  },
  {
    id: '2',
    name: 'Dr. Ahmad Ramadhan',
    specialty: 'Gigi',
    maxPatientsPerDay: 15,
    schedule: [
      { day: 'Tuesday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '15:00', isAvailable: true },
    ],
  },
];

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [doctors] = useState<Doctor[]>(mockDoctors);

  const addQueue = (queueData: Omit<QueueItem, 'id' | 'queueNumber' | 'createdAt'>): QueueItem => {
    const todayQueues = queues.filter(q => q.date === queueData.date && q.doctorId === queueData.doctorId);
    const queueNumber = todayQueues.length + 1;
    
    const newQueue: QueueItem = {
      ...queueData,
      id: String(Date.now()),
      queueNumber,
      createdAt: new Date(),
    };
    
    setQueues(prev => [...prev, newQueue]);
    return newQueue;
  };

  const updateQueueStatus = (id: string, status: QueueItem['status']) => {
    setQueues(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const cancelQueue = (id: string) => {
    updateQueueStatus(id, 'cancelled');
  };

  const getQueuesByDate = (date: string) => {
    return queues.filter(q => q.date === date && q.status !== 'cancelled');
  };

  const getQueuesByDoctor = (doctorId: string, date: string) => {
    return queues.filter(q => q.doctorId === doctorId && q.date === date && q.status !== 'cancelled');
  };

  const getCurrentQueue = (doctorId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const doctorQueues = getQueuesByDoctor(doctorId, today);
    return doctorQueues.find(q => q.status === 'in-progress') || null;
  };

  return (
    <QueueContext.Provider value={{
      queues,
      doctors,
      addQueue,
      updateQueueStatus,
      cancelQueue,
      getQueuesByDate,
      getQueuesByDoctor,
      getCurrentQueue,
    }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
