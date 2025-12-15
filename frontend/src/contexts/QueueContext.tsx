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
  addQueue: (queue: Omit<QueueItem, 'id' | 'queueNumber' | 'createdAt'>) => Promise<QueueItem>;
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

import { useAuth } from './AuthContext';

// ... (imports)

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { user } = useAuth(); // Get user from AuthContext

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // If we want to allow fetching doctors even without login (for public page), we might split this.
        // But for now, the user specifically asked about "register as patient" (booking), which implies logged in.
        // However, the Doctors page is public. 
        // Let's try to fetch doctors regardless of token, but reservations need token.
        
        const { default: api } = await import('@/lib/api');
        
        // Always fetch doctors
        const doctorsRes = await api.get('/doctors');
        const mappedDoctors = doctorsRes.data.map((d: any) => ({
          ...d,
          id: String(d.id),
          schedule: d.schedule || [
            { day: 'Senin', startTime: '09:00', endTime: '15:00', isAvailable: true },
            { day: 'Selasa', startTime: '09:00', endTime: '15:00', isAvailable: true },
            { day: 'Rabu', startTime: '09:00', endTime: '15:00', isAvailable: true },
            { day: 'Kamis', startTime: '09:00', endTime: '15:00', isAvailable: true },
            { day: 'Jumat', startTime: '09:00', endTime: '15:00', isAvailable: true },
          ]
        }));
        setDoctors(mappedDoctors);

        // Only fetch reservations if logged in
        if (token) {
          const queuesRes = await api.get('/reservations');
          const mappedQueues = queuesRes.data.map((q: any) => ({
            id: String(q.id),
            patientId: String(q.user_id),
            patientName: q.user?.name || 'Unknown',
            patientNim: q.user?.nim || '-',
            doctorId: String(q.doctor_id),
            doctorName: q.doctor?.name || 'Unknown',
            serviceType: q.service_type,
            queueNumber: q.queue_number,
            date: q.reservation_date,
            status: q.status,
            createdAt: new Date(q.created_at),
          }));
          setQueues(mappedQueues);
        } else {
            setQueues([]);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [user]); // Re-run when user changes (login/logout)

  const addQueue = async (queueData: Omit<QueueItem, 'id' | 'queueNumber' | 'createdAt'>): Promise<QueueItem> => {
    try {
      const { default: api } = await import('@/lib/api');
      const { data } = await api.post('/reservations', {
        doctor_id: queueData.doctorId,
        service_type: queueData.serviceType,
        reservation_date: queueData.date,
      });

      const newQueue: QueueItem = {
        id: String(data.id),
        patientId: String(data.user_id),
        patientName: queueData.patientName,
        patientNim: queueData.patientNim,
        doctorId: String(data.doctor_id),
        doctorName: queueData.doctorName,
        serviceType: data.service_type,
        queueNumber: data.queue_number,
        date: data.reservation_date,
        status: data.status,
        createdAt: new Date(data.created_at),
      };
      
      setQueues(prev => [...prev, newQueue]);
      return newQueue;
    } catch (error) {
      throw error;
    }
  };

  const updateQueueStatus = async (id: string, status: QueueItem['status']) => {
    try {
      const { default: api } = await import('@/lib/api');
      await api.put(`/reservations/${id}`, { status });
      setQueues(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    } catch (error) {
      console.error('Failed to update status', error);
    }
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
      addQueue: addQueue as any, // Type assertion for now to match interface
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
