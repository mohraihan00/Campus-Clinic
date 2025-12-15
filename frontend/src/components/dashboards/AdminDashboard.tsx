import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQueue } from '@/contexts/QueueContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, LogOut, BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { queues, doctors } = useQueue();
  const navigate = useNavigate();
  const [selectedPeriod] = useState('week');

  const today = new Date().toISOString().split('T')[0];
  const todayQueues = queues.filter(q => q.date === today);
  
  const stats = {
    totalToday: todayQueues.length,
    completed: todayQueues.filter(q => q.status === 'completed').length,
    cancelled: todayQueues.filter(q => q.status === 'cancelled').length,
    totalWeek: queues.length,
    avgWaitTime: '15 menit',
    doctorAvailability: `${doctors.length} aktif`,
  };

  const queuesByDoctor = doctors.map(doctor => ({
    name: doctor.name,
    total: queues.filter(q => q.doctorId === doctor.id).length,
    completed: queues.filter(q => q.doctorId === doctor.id && q.status === 'completed').length,
  }));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">


      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Statistik Layanan Klinik</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Antrian Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalToday}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completed} selesai, {stats.cancelled} dibatalkan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Total Minggu Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalWeek}</div>
              <p className="text-xs text-muted-foreground mt-1">Semua antrian</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Rata-rata Waktu Tunggu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgWaitTime}</div>
              <p className="text-xs text-muted-foreground mt-1">Estimasi</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Per Dokter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {queuesByDoctor.map((doctor, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.completed} dari {doctor.total} antrian selesai
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-primary">{doctor.total}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${doctor.total > 0 ? (doctor.completed / doctor.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status Dokter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doctors.map(doctor => (
                  <div key={doctor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      Aktif
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Layanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Dokter Tersedia</span>
                  <span className="text-lg font-bold">{doctors.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Kapasitas Maksimal/Hari</span>
                  <span className="text-lg font-bold">
                    {doctors.reduce((sum, d) => sum + d.maxPatientsPerDay, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Tingkat Kehadiran</span>
                  <span className="text-lg font-bold text-success">
                    {stats.totalToday > 0 ? Math.round((stats.completed / stats.totalToday) * 100) : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
