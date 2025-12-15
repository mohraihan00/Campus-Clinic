import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQueue } from '@/contexts/QueueContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, LogOut, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const { queues, doctors, updateQueueStatus } = useQueue();
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  const doctor = doctors.find(d => d.name === user?.name);
  const todayQueues = queues.filter(q => 
    q.doctorId === doctor?.id && 
    q.date === selectedDate &&
    q.status !== 'cancelled'
  );
  const waitingQueues = todayQueues.filter(q => q.status === 'waiting');
  const currentQueue = todayQueues.find(q => q.status === 'in-progress');
  const completedQueues = todayQueues.filter(q => q.status === 'completed');

  const handleCallNext = () => {
    if (currentQueue) {
      updateQueueStatus(currentQueue.id, 'completed');
    }
    if (waitingQueues.length > 0) {
      updateQueueStatus(waitingQueues[0].id, 'in-progress');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">


      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{waitingQueues.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Sedang Dilayani</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info">{currentQueue ? 1 : 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Selesai Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{completedQueues.length}</div>
            </CardContent>
          </Card>
        </div>

        {currentQueue && (
          <Card className="border-l-4 border-l-success">
            <CardHeader>
              <CardTitle>Pasien Saat Ini</CardTitle>
              <CardDescription>Antrian No. {currentQueue.queueNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{currentQueue.patientName}</span>
                </div>
                <p className="text-sm text-muted-foreground">NIM: {currentQueue.patientNim}</p>
                <p className="text-sm text-muted-foreground">Layanan: {currentQueue.serviceType}</p>
              </div>
              <Button onClick={handleCallNext} className="w-full">
                Selesai & Panggil Berikutnya
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Antrian Menunggu</CardTitle>
              {!currentQueue && waitingQueues.length > 0 && (
                <Button onClick={handleCallNext}>
                  Panggil Pasien
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {waitingQueues.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Tidak ada antrian menunggu</p>
            ) : (
              <div className="space-y-2">
                {waitingQueues.map(queue => (
                  <div key={queue.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">#{queue.queueNumber} - {queue.patientName}</p>
                      <p className="text-sm text-muted-foreground">{queue.serviceType}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">NIM: {queue.patientNim}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Praktik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {doctor?.schedule?.filter(s => s.isAvailable).map((schedule, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{schedule.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorDashboard;
