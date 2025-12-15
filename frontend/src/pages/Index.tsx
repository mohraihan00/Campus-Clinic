import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Search, Calendar, User, CheckCircle2, MapPin, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary px-4 pt-12 pb-24 md:px-8 md:pt-20 md:pb-32 rounded-b-[3rem] md:rounded-b-[5rem] shadow-xl shadow-primary/20 mx-2 md:mx-4 mt-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              Klinik Kampus
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-lg leading-relaxed">
              Melayani Pasien BPJS & Umum. Layanan kesehatan terpercaya untuk civitas akademika dan masyarakat umum dengan fasilitas lengkap dan tenaga medis profesional.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="rounded-full px-8 text-primary font-bold h-14 shadow-lg hover:shadow-xl transition-all">
                  Daftar Antrian <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://maps.app.goo.gl/7wHntg7aDNkw5t6aA" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent text-white border-white/40 hover:bg-white/10 h-14 backdrop-blur-sm">
                  <MapPin className="mr-2 h-5 w-5" /> Lokasi
                </Button>
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-5 bg-white/10 backdrop-blur-md p-5 rounded-2xl w-fit border border-white/10">
              <div className="text-5xl font-bold tracking-tighter">4.5</div>
              <div className="flex flex-col gap-1">
                <div className="flex text-yellow-400 gap-0.5">
                  <Star className="fill-current h-4 w-4" />
                  <Star className="fill-current h-4 w-4" />
                  <Star className="fill-current h-4 w-4" />
                  <Star className="fill-current h-4 w-4" />
                  <Star className="fill-current h-4 w-4 text-white/30" />
                </div>
                <span className="text-sm font-medium text-white/80">Rating di Google Maps</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block h-full min-h-[500px]">
             {/* Decorative elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
             <div className="absolute bottom-0 left-10 w-48 h-48 bg-indigo-400/30 rounded-full blur-3xl translate-y-12"></div>
             
             <img 
               src="/clinic-building.jpg" 
               alt="Klinik Kampus" 
               className="relative z-10 rounded-[2.5rem] shadow-2xl object-cover h-[500px] w-full"
               style={{ borderRadius: "2.5rem 2.5rem 12rem 2.5rem" }}
             />
             
             {/* Floating badge */}
             <div className="absolute bottom-20 -left-12 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce duration-[3000ms]">
                <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Jam Buka</p>
                  <p className="text-lg font-bold text-foreground">08.00 - 16.00 WIB</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Layanan Kami — <br/>Kesehatan Anda Prioritas Kami</h2>
            <Link to="/services">
              <Button variant="link" className="text-primary font-bold text-lg">Lihat semua layanan <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="border-none shadow-sm bg-secondary/50 hover:shadow-lg transition-all duration-300 overflow-hidden group rounded-[2rem]">
            <CardContent className="p-8 flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-bl-[4rem] transition-all group-hover:scale-110"></div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Poli Umum & Gigi</h3>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">Pemeriksaan dan pengobatan umum serta perawatan kesehatan gigi dan mulut oleh dokter profesional.</p>
              <div className="mt-auto flex justify-between items-end">
                <Link to="/services">
                  <Button variant="link" className="p-0 h-auto font-bold text-primary">Selengkapnya</Button>
                </Link>
                <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                   <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                     <User className="h-5 w-5" />
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Blue */}
          <Card className="border-none shadow-lg shadow-primary/20 bg-primary text-white hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-[2rem] transform md:-translate-y-4">
            <CardContent className="p-8 flex flex-col h-full relative">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-[5rem] transition-all group-hover:scale-110"></div>
              <h3 className="text-2xl font-bold mb-3">Layanan BPJS</h3>
              <p className="text-primary-foreground/90 mb-10 text-lg leading-relaxed">Kami melayani peserta BPJS Kesehatan untuk berbagai layanan medis dasar tanpa biaya tambahan sesuai ketentuan.</p>
              <div className="mt-auto flex justify-between items-end">
                <Link to="/services">
                  <Button variant="secondary" className="rounded-full px-6 font-bold shadow-lg">Detail</Button>
                </Link>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                   <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

           {/* Card 3 */}
           <Card className="border-none shadow-sm bg-secondary/50 hover:shadow-lg transition-all duration-300 overflow-hidden group rounded-[2rem]">
            <CardContent className="p-8 flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-bl-[4rem] transition-all group-hover:scale-110"></div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Laboratorium & KIA</h3>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">Pemeriksaan laboratorium lengkap, layanan Ibu dan Anak (KIA), serta Keluarga Berencana (KB).</p>
              <div className="mt-auto flex justify-between items-end">
                <Link to="/services">
                  <Button variant="link" className="p-0 h-auto font-bold text-primary">Selengkapnya</Button>
                </Link>
                 <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                   <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                     <Search className="h-5 w-5" />
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="container mx-auto py-12 px-4 mb-12">
         <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">Jadwal Pelayanan Klinik</h2>
               <div className="bg-primary text-white p-8 md:p-10 rounded-[2.5rem] mb-6 shadow-xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                     <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Jam Operasional</h3>
                  <ul className="space-y-3 opacity-90 text-lg leading-relaxed">
                    <li className="flex justify-between"><span>Senin - Kamis</span> <span>08.00 - 16.00 WIB</span></li>
                    <li className="flex justify-between"><span>Jumat</span> <span>08.00 - 16.30 WIB</span></li>
                    <li className="flex justify-between"><span>Sabtu</span> <span>08.30 - 12.00 WIB</span></li>
                    <li className="flex justify-between text-red-200 font-semibold"><span>Minggu</span> <span>Tutup</span></li>
                  </ul>
               </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.247833663678!2d105.2552663749839!3d-5.379054994600262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40db224263001d%3A0x6e7885232380590!2sKlinik%20Universitas%20Lampung!5e0!3m2!1sen!2sid!4v1701490000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Index;
