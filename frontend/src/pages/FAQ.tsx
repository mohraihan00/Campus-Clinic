import { Activity, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Bagaimana cara mendaftar antrian online?",
      answer: "Anda perlu membuat akun terlebih dahulu dengan klik 'Daftar Akun Baru' di halaman login. Setelah login, klik tombol 'Daftar Antrian' di dashboard, pilih tanggal, dokter, dan jenis layanan yang diinginkan."
    },
    {
      question: "Apakah klinik menerima BPJS Kesehatan?",
      answer: "Ya, Klinik Kampus menerima pembayaran menggunakan BPJS Kesehatan. Pastikan Anda membawa kartu BPJS dan kartu identitas saat datang ke klinik."
    },
    {
      question: "Berapa lama waktu tunggu rata-rata?",
      answer: "Waktu tunggu bervariasi tergantung jumlah antrian. Anda dapat memantau estimasi waktu tunggu secara real-time di dashboard setelah mendaftar antrian."
    },
    {
      question: "Bagaimana jika saya terlambat datang?",
      answer: "Jika Anda terlambat lebih dari 15 menit dari estimasi waktu yang diberikan, antrian Anda mungkin dilewati. Silakan hubungi petugas klinik untuk pengaturan ulang."
    },
    {
      question: "Bisakah saya membatalkan antrian?",
      answer: "Ya, Anda dapat membatalkan antrian melalui dashboard Anda atau menghubungi petugas klinik. Pembatalan sebaiknya dilakukan minimal 1 jam sebelum waktu kunjungan."
    },
    {
      question: "Apakah saya perlu membawa dokumen tertentu?",
      answer: "Untuk kunjungan pertama, bawa kartu identitas (KTP/KTM), kartu BPJS (jika menggunakan), dan hasil pemeriksaan sebelumnya jika ada."
    },
    {
      question: "Apa saja layanan yang tersedia di klinik?",
      answer: "Klinik menyediakan layanan pemeriksaan umum, konsultasi kesehatan, pengecekan tanda vital, dan penanganan penyakit ringan. Untuk kasus khusus, dokter akan memberikan rujukan."
    },
    {
      question: "Bagaimana cara melihat jadwal dokter?",
      answer: "Jadwal dokter dapat dilihat saat Anda mendaftar antrian. Pilih tanggal yang diinginkan, dan sistem akan menampilkan dokter yang bertugas pada hari tersebut."
    },
    {
      question: "Apakah ada biaya untuk pendaftaran online?",
      answer: "Tidak, pendaftaran antrian online melalui sistem ini tidak dikenakan biaya tambahan. Anda hanya membayar biaya konsultasi sesuai ketentuan yang berlaku."
    },
    {
      question: "Bagaimana jika saya lupa password?",
      answer: "Silakan hubungi petugas klinik melalui WhatsApp atau datang langsung ke klinik untuk bantuan reset password."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Pertanyaan yang sering diajukan tentang layanan Klinik Kampus
            </p>
          </div>

          {/* BPJS Info Card */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Activity className="w-5 h-5" />
                Informasi BPJS Kesehatan
              </CardTitle>
              <CardDescription>
                Klinik Kampus melayani pasien dengan BPJS Kesehatan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Kami menerima pembayaran menggunakan BPJS Kesehatan untuk berbagai layanan kesehatan. 
                Pastikan kartu BPJS Anda masih aktif dan membawa kartu identitas saat berkunjung.
              </p>
              <div className="bg-background p-4 rounded-lg space-y-2 text-sm">
                <p className="font-medium">Dokumen yang diperlukan:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Kartu BPJS Kesehatan yang masih aktif</li>
                  <li>Kartu Identitas (KTP/KTM)</li>
                  <li>Surat rujukan (jika diperlukan)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum</CardTitle>
              <CardDescription>
                Temukan jawaban untuk pertanyaan Anda di bawah ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Button onClick={() => navigate('/')} variant="outline">
              Kembali ke Halaman Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
