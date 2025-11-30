import { useState } from 'react';
import { useQueue } from '@/contexts/QueueContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const BookQueueDialog = () => {
  const { user } = useAuth();
  const { doctors, addQueue } = useQueue();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    serviceType: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.serviceType || !formData.date) {
      toast({
        title: 'Error',
        description: 'Mohon lengkapi semua data',
        variant: 'destructive',
      });
      return;
    }

    const doctor = doctors.find(d => d.id === formData.doctorId);
    if (!doctor) return;

    const newQueue = addQueue({
      patientId: user!.id,
      patientName: user!.name,
      patientNim: user!.nim || '-',
      doctorId: formData.doctorId,
      doctorName: doctor.name,
      serviceType: formData.serviceType,
      date: formData.date,
      status: 'waiting',
    });

    toast({
      title: 'Berhasil!',
      description: `Antrian nomor ${newQueue.queueNumber} telah dibuat`,
    });

    setOpen(false);
    setFormData({
      doctorId: '',
      serviceType: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Daftar Antrian
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Daftar Antrian Baru</DialogTitle>
            <DialogDescription>
              Pilih dokter dan layanan yang Anda butuhkan
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal Kunjungan</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Pilih Dokter</Label>
              <Select value={formData.doctorId} onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih dokter" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Jenis Layanan</Label>
              <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih layanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Konsultasi Umum">Konsultasi Umum</SelectItem>
                  <SelectItem value="Pemeriksaan Kesehatan">Pemeriksaan Kesehatan</SelectItem>
                  <SelectItem value="Pemeriksaan Gigi">Pemeriksaan Gigi</SelectItem>
                  <SelectItem value="Pemeriksaan Mata">Pemeriksaan Mata</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Daftar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookQueueDialog;
