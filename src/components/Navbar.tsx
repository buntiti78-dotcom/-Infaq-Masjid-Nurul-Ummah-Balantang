import React from 'react';
import { Lock, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  onOpenInfaq: () => void;
  onOpenAdmin: () => void;
  onOpenZakat: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInfaq,
  onOpenAdmin,
  onOpenZakat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
          >
            Masjid Nurul Ummah Balantang
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a
              href="#program-infaq"
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              Program Infaq
            </a>
            <a
              href="#transparansi-kas"
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              Kas Transparan
            </a>
            <a
              href="#dinding-doa"
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              Doa Jamaah
            </a>
            <button
              onClick={onOpenZakat}
              className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 text-left"
            >
              Kalkulator Zakat
            </button>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 text-stone-500 transition-colors whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Akses DKM</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenInfaq}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 transition-colors rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-300" />
              <span>Salurkan Infaq</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
