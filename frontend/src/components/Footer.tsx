import { MapPin, Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Alamat Klinik
            </h3>
            <p className="text-sm leading-relaxed">
              Jl. Prof. Dr. Ir. Sumantri Brojonegoro No.Kel, Gedong Meneng, Kec. Rajabasa, Kota Bandar Lampung, Lampung 35141
            </p>
          </div>

          {/* BPJS Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Layanan Tersedia</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                ✓ Menerima BPJS Kesehatan
              </p>
              <p className="flex items-center gap-2">
                ✓ Pelayanan Umum
              </p>
              <p className="flex items-center gap-2">
                ✓ Konsultasi Dokter
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Hubungi Kami</h3>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <Phone className="w-6 h-6" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Klinik Kampus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
