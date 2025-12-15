import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQueue } from '@/contexts/QueueContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Activity, LogOut, Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const { queues, updateQueueStatus, cancelQueue } = useQueue();
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const todayQueues = queues.filter(q => q.date === selectedDate);
  const activeQueues = todayQueues.filter(q => q.status !== 'cancelled' && q.status !== 'completed');
  
  const filteredQueues = activeQueues.filter(q => 
    q.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.patientNim.includes(searchTerm) ||
    q.queueNumber.toString().includes(searchTerm)
  );

  const handleCancelQueue = (id: string) => {
    cancelQueue(id);
    toast({ title: 'Antrian dibatalkan', description: 'Antrian telah dibatalkan' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">


      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Antrian Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayQueues.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {todayQueues.filter(q => q.status === 'waiting').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Sedang Dilayani</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-info">
                {todayQueues.filter(q => q.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {todayQueues.filter(q => q.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Manajemen Antrian</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama, NIM, atau nomor antrian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredQueues.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Tidak ada antrian aktif</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQueues.map(queue => (
                  <div key={queue.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-primary">#{queue.queueNumber}</span>
                        <div>
                          <p className="font-medium">{queue.patientName}</p>
                          <p className="text-sm text-muted-foreground">NIM: {queue.patientNim}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>Dokter: {queue.doctorName}</span>
                        <span>•</span>
                        <span>{queue.serviceType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        queue.status === 'waiting' ? 'bg-warning/10 text-warning' :
                        queue.status === 'in-progress' ? 'bg-success/10 text-success' : ''
                      }`}>
                        {queue.status === 'waiting' ? 'Menunggu' : 'Sedang Dilayani'}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelQueue(queue.id)}
                      >
                        Batalkan
                      </Button>
                    </div>
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

export default StaffDashboard;
