import React, { useState } from 'react';
import { InfaqProgram } from '../types/masjid.ts';
import { formatRupiah } from '../utils/formatters.ts';
import { HeartHandshake, Users, Sparkles } from 'lucide-react';

interface ProgramsListProps {
  programs: InfaqProgram[];
  onSelectProgram: (program: InfaqProgram) => void;
}

export const ProgramsList: React.FC<ProgramsListProps> = ({ programs, onSelectProgram }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Program' },
    { id: 'renovasi', label: 'Pembangunan & Renovasi' },
    { id: 'sosial', label: 'Jumat Berkah & Santunan' },
    { id: 'operasional', label: 'Operasional & Marbot' },
    { id: 'pendidikan', label: 'TPA & Al-Qur\'an' }
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  return (
    <section id="program-infaq" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Pilihan Penyaluran Infaq
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Program Kemakmuran & Amal Jariyah Masjid
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Pilih pos infaq yang ingin Anda dukung. Setiap rupiah yang disalurkan dicatat secara transparan dan dikelola penuh amanah oleh DKM Masjid Nurul Ummah Balantang.
            </p>
          </div>

          {/* Category Filter Buttons (Interactive filter controls allowed) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-emerald-950 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => {
            const percentage = Math.min(
              100,
              Math.round((program.collectedAmount / program.targetAmount) * 100)
            );

            return (
              <div
                key={program.id}
                className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-emerald-700/60 transition-all duration-200 shadow-xs hover:shadow-md"
              >
                {/* Program Image Slot with Resilient Scrim */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {program.urgencyLabel && (
                    <div className="absolute bottom-3 left-3 text-xs font-semibold text-white px-2 py-0.5 bg-emerald-900/90 rounded backdrop-blur-xs">
                      {program.urgencyLabel}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-900 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Funding Progress (Tabular Numerals, Unboxed) */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Terkumpul: <strong className="text-stone-900 tabular-nums font-semibold">{formatRupiah(program.collectedAmount)}</strong></span>
                      <span className="font-semibold text-emerald-800 tabular-nums">{percentage}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span className="tabular-nums">{program.donorCount} Donatur</span>
                      </span>
                      <span>Target: <span className="tabular-nums">{formatRupiah(program.targetAmount)}</span></span>
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 transition-colors rounded-lg cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 text-emerald-300" />
                    <span>Infaq Sekarang</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Infaq Banner */}
        <div className="mt-12 bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-stone-900">
              Ingin Berinfaq Bebas / Kas Umum Masjid?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Infaq umum akan dialokasikan langsung untuk kebutuhan paling mendesak dan operasional harian Masjid Nurul Ummah Balantang.
            </p>
          </div>
          <button
            onClick={() => onSelectProgram({
              id: 'prog-umum',
              title: 'Infaq Bebas & Sedekah Kas Umum Masjid',
              category: 'umum',
              description: 'Infaq umum tanpa peruntukan khusus, dialokasikan untuk operasional darurat dan kemaslahatan jamaah Balantang.',
              targetAmount: 50000000,
              collectedAmount: 38200000,
              donorCount: 210,
              imageUrl: '/src/assets/images/hero_masjid_balantang_1792213225197.jpg'
            })}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-stone-900 bg-stone-200 hover:bg-stone-300 transition-colors rounded-lg whitespace-nowrap cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Infaq Kas Umum</span>
          </button>
        </div>
      </div>
    </section>
  );
};
