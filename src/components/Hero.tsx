import React, { useState, useEffect } from 'react';
import { HeartHandshake, ArrowRight, Clock, MapPin, Calculator, ShieldCheck } from 'lucide-react';
import { getMaliliPrayerTimes, getNextPrayer, formatRemainingTime } from '../utils/prayerTimes.ts';
import { formatRupiah } from '../utils/formatters.ts';

interface HeroProps {
  onOpenInfaq: () => void;
  onOpenZakat: () => void;
  totalCollected: number;
  totalDistributed: number;
  currentBalance: number;
  donorCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInfaq,
  onOpenZakat,
  totalCollected,
  totalDistributed,
  currentBalance,
  donorCount
}) => {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer());
  const [prayerSchedule] = useState(getMaliliPrayerTimes());

  useEffect(() => {
    const timer = setInterval(() => {
      setNextPrayer(getNextPrayer());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_masjid_balantang_1792213225197.jpg"
          alt="Arsitektur Masjid Nurul Ummah Balantang Malili"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Top Mosque Header & Regional Metadata (Unboxed) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 mb-8 border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Balantang</span>
            <span aria-hidden="true">·</span>
            <span>Kecamatan Malili</span>
            <span aria-hidden="true">·</span>
            <span>Kabupaten Luwu Timur</span>
            <span aria-hidden="true">·</span>
            <span>Sulawesi Selatan (WITA)</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300">
            <Clock className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Menuju {nextPrayer.name} ({nextPrayer.time} WITA)</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-white">{formatRemainingTime(nextPrayer.remainingMinutes)}</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-arabic text-2xl sm:text-3xl text-emerald-300 tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Pintu Kebaikan & Transparansi Infaq Masjid Nurul Ummah Balantang
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Memfasilitasi jamaah dan kaum muslimin berinfaq secara amanah, mudah melalui QRIS & Transfer Bank, dilengkapi kuitansi resmi digital dan pelaporan kas harian yang terbuka untuk umum.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenInfaq}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 transition-colors rounded-lg shadow-lg cursor-pointer whitespace-nowrap"
              >
                <HeartHandshake className="w-5 h-5 text-emerald-200" />
                <span>Salurkan Infaq Sekarang</span>
              </button>

              <a
                href="#transparansi-kas"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 transition-colors rounded-lg cursor-pointer whitespace-nowrap"
              >
                <span>Lihat Kas Terbuka</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </a>

              <button
                onClick={onOpenZakat}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Hitung Zakat & Fidyah</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Resmi DKM Nurul Ummah Balantang · Bebas Biaya Admin QRIS Masjid · Kuitansi Cetak & WA</span>
            </div>
          </div>

          {/* Right Column: Prayer Times Card (Clean Architectural Slate) */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Jadwal Sholat Hari Ini</h3>
                <p className="text-xs text-stone-400">Wilayah Balantang, Malili & Sekitarnya (WITA)</p>
              </div>
              <span className="text-xs text-emerald-400 font-medium">Zona Waktu WITA</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Subuh', time: prayerSchedule.subuh },
                { name: 'Terbit', time: prayerSchedule.terbit },
                { name: 'Dzuhur', time: prayerSchedule.dzuhur },
                { name: 'Ashar', time: prayerSchedule.ashar },
                { name: 'Maghrib', time: prayerSchedule.maghrib },
                { name: 'Isya', time: prayerSchedule.isya }
              ].map((p) => {
                const isCurrentNext = nextPrayer.name.toLowerCase().includes(p.name.toLowerCase());
                return (
                  <div
                    key={p.name}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      isCurrentNext
                        ? 'bg-emerald-950/70 border-emerald-600 text-white shadow-sm'
                        : 'bg-stone-950/50 border-stone-800 text-stone-300'
                    }`}
                  >
                    <span className="block text-xs text-stone-400 font-medium mb-1">{p.name}</span>
                    <span className="block text-base font-bold tabular-nums tracking-tight">
                      {p.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-800/80 text-xs text-stone-400 leading-relaxed">
              <span className="text-stone-300 font-medium">Imbauan DKM:</span> Mari makmurkan sholat berjamaah 5 waktu di Masjid Nurul Ummah Balantang, memelihara ukhuwah islamiyah dan kebersihan rumah ibadah.
            </div>
          </div>
        </div>

        {/* Financial KPI Transparency Strip (Full-width row below hero split) */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-xs text-stone-400">Saldo Kas Bersih</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                {formatRupiah(currentBalance)}
              </p>
              <span className="text-xs text-stone-500">Siap dialokasikan</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400">Total Infaq Terhimpun</span>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {formatRupiah(totalCollected)}
              </p>
              <span className="text-xs text-stone-500">Akumulasi penerimaan</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400">Realisasi Penyaluran</span>
              <p className="text-2xl sm:text-3xl font-bold text-stone-200 tabular-nums">
                {formatRupiah(totalDistributed)}
              </p>
              <span className="text-xs text-stone-500">Renovasi & sosial rutin</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400">Partisipasi Jamaah</span>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {donorCount} <span className="text-sm font-normal text-stone-400">Transaksi</span>
              </p>
              <span className="text-xs text-stone-500">Tercatat dalam sistem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
