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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    serviceType: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Filter doctors based on selected service type
  // Assuming serviceType maps to doctor specialty or we just show all if no service selected
  // The user requested: Pick Poli (Service) -> Then Doctor (filtered by Poli)
  
  // Let's normalize the service types to match doctor specialties for filtering
  // Or we can just use the specialty directly as the service type in the UI
  const filteredDoctors = formData.serviceType 
    ? doctors.filter(d => d.specialty === formData.serviceType || formData.serviceType === 'Lainnya')
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.serviceType || !formData.date) {
      toast({
        title: 'Error',
        description: 'Mohon lengkapi semua data',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const doctor = doctors.find(d => d.id === formData.doctorId);
      if (!doctor) throw new Error('Dokter tidak ditemukan');

      const newQueue = await addQueue({
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
    } catch (error) {
      console.error(error);
      toast({
        title: 'Gagal',
        description: 'Gagal membuat antrian. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
              Isi form berikut untuk mendaftar antrian
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* 1. Date Selection */}
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

            {/* 2. Service/Poli Selection */}
            <div className="space-y-2">
              <Label htmlFor="service">Poli / Layanan</Label>
              <Select 
                value={formData.serviceType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value, doctorId: '' }))}
              >
                <SelectTrigger className="text-foreground">
                  <SelectValue placeholder="Pilih layanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Umum">Poli Umum</SelectItem>
                  <SelectItem value="Gigi">Poli Gigi</SelectItem>
                  <SelectItem value="Mata">Poli Mata</SelectItem>
                  <SelectItem value="Kandungan">Poli Kandungan</SelectItem>
                  <SelectItem value="Anak">Poli Anak</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 3. Doctor Selection (Filtered) */}
            <div className="space-y-2">
              <Label htmlFor="doctor">Pilih Dokter</Label>
              <Select 
                value={formData.doctorId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}
                disabled={!formData.serviceType}
              >
                <SelectTrigger className="w-full bg-background text-foreground border-input">
                  <SelectValue placeholder={formData.serviceType ? "Pilih dokter" : "Pilih layanan terlebih dahulu"} />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                      <SelectItem key={doctor.id} value={doctor.id} className="text-foreground focus:bg-accent focus:text-accent-foreground">
                        {doctor.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Tidak ada dokter tersedia untuk layanan ini
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Daftar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookQueueDialog;
