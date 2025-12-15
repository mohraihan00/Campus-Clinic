import { useAuth } from '@/contexts/AuthContext';
import { useQueue } from '@/contexts/QueueContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookQueueDialog from '@/components/queue/BookQueueDialog';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const { queues } = useQueue();
  const navigate = useNavigate();

  const myQueues = queues.filter(q => q.patientId === String(user?.id));
  const activeQueues = myQueues.filter(q => q.status === 'waiting' || q.status === 'in-progress');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">


      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Antrian Saya</h2>
          <BookQueueDialog />
        </div>

        {activeQueues.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Anda belum memiliki antrian aktif</p>
              <p className="text-sm text-muted-foreground mt-2">Klik "Daftar Antrian" untuk membuat antrian baru</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {activeQueues.map(queue => (
              <Card key={queue.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Antrian No. {queue.queueNumber}</CardTitle>
                      <CardDescription>{queue.serviceType}</CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      queue.status === 'waiting' ? 'bg-warning/10 text-warning' :
                      queue.status === 'in-progress' ? 'bg-success/10 text-success' : ''
                    }`}>
                      {queue.status === 'waiting' ? 'Menunggu' : 'Sedang Dilayani'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{queue.doctorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(queue.date).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  {queue.estimatedTime && (
                    <p className="text-sm text-muted-foreground">Estimasi: {queue.estimatedTime}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Antrian</CardTitle>
          </CardHeader>
          <CardContent>
            {myQueues.filter(q => q.status === 'completed' || q.status === 'cancelled').length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Belum ada riwayat</p>
            ) : (
              <div className="space-y-2">
                {myQueues
                  .filter(q => q.status === 'completed' || q.status === 'cancelled')
                  .map(queue => (
                    <div key={queue.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Antrian #{queue.queueNumber} - {queue.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{new Date(queue.date).toLocaleDateString('id-ID')}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        queue.status === 'completed' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {queue.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PatientDashboard;
