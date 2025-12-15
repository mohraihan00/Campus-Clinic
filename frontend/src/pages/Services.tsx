import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, HeartPulse, Stethoscope, Syringe, Baby, Activity } from "lucide-react";

const services = [
  {
    title: "Poli Umum",
    description: "Pemeriksaan kesehatan umum, diagnosa penyakit, dan pengobatan dasar.",
    icon: Stethoscope,
    price: "Gratis (Mahasiswa/BPJS)",
  },
  {
    title: "Poli Gigi",
    description: "Pemeriksaan gigi, tambal gigi, cabut gigi, dan pembersihan karang gigi.",
    icon: Activity,
    price: "Mulai Rp 50.000",
  },
  {
    title: "Kesehatan Ibu & Anak (KIA)",
    description: "Pemeriksaan kehamilan, imunisasi anak, dan konsultasi tumbuh kembang.",
    icon: Baby,
    price: "Gratis (BPJS)",
  },
  {
    title: "Laboratorium",
    description: "Cek darah lengkap, gula darah, kolesterol, dan asam urat.",
    icon: Syringe,
    price: "Mulai Rp 25.000",
  },
  {
    title: "Konsultasi Gizi",
    description: "Konsultasi pola makan sehat dan diet khusus untuk kondisi medis tertentu.",
    icon: HeartPulse,
    price: "Gratis (Mahasiswa)",
  },
  {
    title: "Surat Keterangan Sehat",
    description: "Pemeriksaan fisik untuk keperluan administrasi akademik atau pekerjaan.",
    icon: CheckCircle2,
    price: "Rp 10.000",
  },
];

const Services = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Layanan Kami</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Klinik Kampus menyediakan berbagai layanan kesehatan komprehensif untuk mendukung kesehatan civitas akademika dan masyarakat umum.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <service.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                {service.description}
              </CardDescription>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="font-semibold text-primary">{service.price}</span>
                <Button variant="outline" size="sm" className="rounded-full">Detail</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
