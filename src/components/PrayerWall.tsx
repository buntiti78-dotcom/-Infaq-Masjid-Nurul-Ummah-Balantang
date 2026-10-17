import React from 'react';
import { Transaction } from '../types/masjid.ts';
import { Heart, Sparkles, MessageCircle } from 'lucide-react';

interface PrayerWallProps {
  transactions: Transaction[];
  onAminClick: (trxId: string) => void;
  onOpenInfaq: () => void;
}

export const PrayerWall: React.FC<PrayerWallProps> = ({
  transactions,
  onAminClick,
  onOpenInfaq
}) => {
  // Only transactions with prayer wishes
  const wishes = transactions.filter(t => t.prayerWish && t.prayerWish.trim().length > 0);

  return (
    <section id="dinding-doa" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Ukhuwah & Ikhtiar Bersama
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Dinding Doa & Hajat Jamaah
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Setiap infaq yang diiringi doa tulus menjadi pengetuk pintu langit. Mari kita aminkan bersama hajat para donatur Masjid Nurul Ummah Balantang.
            </p>
          </div>

          <button
            onClick={onOpenInfaq}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Kirim Doa & Berinfaq</span>
          </button>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-700/50 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-900">{item.donorName}</span>
                  <span>{item.date.split(' ')[0]}</span>
                </div>

                {/* Wish Quote */}
                <p className="text-sm text-stone-800 italic leading-relaxed">
                  "{item.prayerWish}"
                </p>

                <div className="text-[11px] text-emerald-900 font-medium">
                  Tujuan: {item.programTitle}
                </div>
              </div>

              {/* Amin Action Bar */}
              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {item.aminCount || 1} Jamaah Mengaminkan
                </span>
                <button
                  type="button"
                  onClick={() => onAminClick(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 hover:border-emerald-700 text-stone-800 hover:text-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                  <span>Aamiin-kan</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hadith Banner */}
        <div className="mt-12 bg-emerald-950 text-white rounded-xl p-6 sm:p-8 text-center space-y-3">
          <p className="font-arabic text-xl sm:text-2xl text-emerald-300">
            مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ
          </p>
          <p className="text-sm sm:text-base text-stone-200 font-medium max-w-2xl mx-auto italic">
            "Harta tidak akan pernah berkurang karena sedekah, dan Allah tidak menambah seorang hamba karena memaafkan melainkan kemuliaan."
          </p>
          <span className="block text-xs text-emerald-400 font-semibold tracking-wider">
            (HR. Muslim No. 2588)
          </span>
        </div>

      </div>
    </section>
  );
};
