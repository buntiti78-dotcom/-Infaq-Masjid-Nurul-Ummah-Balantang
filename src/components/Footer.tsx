import React from 'react';
import { MOSQUE_PROFILE, BANK_ACCOUNTS } from '../data/initialData.ts';
import { MapPin, Phone, Building2, HeartHandshake, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenInfaq: () => void;
  onOpenZakat: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInfaq,
  onOpenZakat,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Mosque Info */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-bold text-white tracking-tight block">
              {MOSQUE_PROFILE.name}
            </span>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              Pusat ibadah, dakwah, dan pembinaan ukhuwah islamiyah masyarakat Balantang dan Malili, Luwu Timur. Dikelola dengan prinsip amanah, transparan, dan profesional.
            </p>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{MOSQUE_PROFILE.address}, {MOSQUE_PROFILE.district}, {MOSQUE_PROFILE.regency}, {MOSQUE_PROFILE.province} {MOSQUE_PROFILE.postalCode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Layanan DKM & Konfirmasi: {MOSQUE_PROFILE.phone}</span>
              </div>
            </div>
          </div>

          {/* Bank Accounts */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Rekening Resmi Infaq DKM
            </h4>
            <div className="space-y-2 text-xs">
              {BANK_ACCOUNTS.map((bank) => (
                <div key={bank.id} className="p-2.5 rounded bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-200 block">{bank.bankName}</span>
                    <span className="font-mono text-emerald-400 font-bold">{bank.accountNumber}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">a.n. DKM</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & Service */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Layanan Digital
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenInfaq}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Salurkan Infaq & Sedekah QRIS
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenZakat}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Kalkulator Zakat & Fidyah
                </button>
              </li>
              <li>
                <a
                  href="#transparansi-kas"
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Laporan Buku Kas Terbuka
                </a>
              </li>
              <li>
                <a
                  href="#dinding-doa"
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Dinding Doa Jamaah
                </a>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white text-stone-400 transition-colors cursor-pointer"
                >
                  Login Pengurus / Bendahara
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} DKM Masjid Nurul Ummah Balantang, Luwu Timur. Hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sistem Informasi Kas Terbuka Berbasis Amanah & Akuntabilitas</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
