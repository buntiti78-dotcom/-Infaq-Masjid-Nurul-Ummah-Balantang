import React from 'react';
import { Transaction } from '../types/masjid.ts';
import { MOSQUE_PROFILE } from '../data/initialData.ts';
import { formatRupiah, toCleanTerbilang, formatDateIndo } from '../utils/formatters.ts';
import { Printer, Share2, Check, X, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction
}) => {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*KUITANSI TANDA TERIMA INFAQ DIGITAL*\n` +
      `*${MOSQUE_PROFILE.name}*\n` +
      `No. Kuitansi: ${transaction.receiptNumber}\n` +
      `Tanggal: ${transaction.date} WITA\n` +
      `--------------------------------\n` +
      `Telah Terima Dari: *${transaction.donorName}*\n` +
      `Jumlah Infaq: *${formatRupiah(transaction.amount)}*\n` +
      `Terbilang: _${toCleanTerbilang(transaction.amount)}_\n` +
      `Peruntukan: ${transaction.programTitle}\n` +
      `Metode: ${transaction.paymentMethod.toUpperCase()}\n` +
      `Status: Terverifikasi Kas Masjid\n` +
      `--------------------------------\n` +
      `_Jazakumullahu Khairan Katsiran atas infaq dan sedekah yang telah disalurkan. Semoga menjadi amal jariyah pengetuk pintu surga._\n\n` +
      `DKM ${MOSQUE_PROFILE.name}\n` +
      `${MOSQUE_PROFILE.address}, ${MOSQUE_PROFILE.regency}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Action Bar (No-Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold">Kuitansi Resmi Digital Infaq</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kirim WA</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 sm:p-10 space-y-6 text-stone-900 bg-white">
          
          {/* Header Kop Masjid */}
          <div className="text-center pb-6 border-b-2 border-stone-800 relative">
            <p className="font-arabic text-xl text-emerald-900 mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-emerald-950">
              DEWAN KEMAKMURAN MASJID (DKM)
            </h2>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-emerald-900">
              {MOSQUE_PROFILE.name}
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              {MOSQUE_PROFILE.address}, {MOSQUE_PROFILE.district}, {MOSQUE_PROFILE.regency}, {MOSQUE_PROFILE.province}
            </p>
            <div className="absolute right-0 top-0 hidden sm:block text-right">
              <span className="text-[10px] uppercase font-mono text-stone-400">STATUS BUKTI</span>
              <span className="block text-xs font-bold text-emerald-800">LUNAS / SAH</span>
            </div>
          </div>

          {/* Receipt Info Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs border-b border-stone-200 pb-3">
            <div>
              <span className="text-stone-500">Nomor Kuitansi: </span>
              <strong className="font-mono text-stone-900 font-semibold">{transaction.receiptNumber}</strong>
            </div>
            <div>
              <span className="text-stone-500">Tanggal Transaksi: </span>
              <strong className="text-stone-900 font-semibold">{formatDateIndo(transaction.date)}</strong>
            </div>
          </div>

          {/* Receipt Rows */}
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-4 sm:col-span-3 text-stone-600">Telah Terima Dari</span>
              <span className="col-span-1 text-center text-stone-400">:</span>
              <div className="col-span-7 sm:col-span-8 font-bold text-base text-stone-900">
                {transaction.donorName}
                {transaction.phone && (
                  <span className="block text-xs font-normal text-stone-500">{transaction.phone}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-4 sm:col-span-3 text-stone-600">Jumlah Uang</span>
              <span className="col-span-1 text-center text-stone-400">:</span>
              <div className="col-span-7 sm:col-span-8">
                <span className="text-xl sm:text-2xl font-black text-emerald-900 font-mono tracking-tight">
                  {formatRupiah(transaction.amount)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-4 sm:col-span-3 text-stone-600">Terbilang</span>
              <span className="col-span-1 text-center text-stone-400">:</span>
              <div className="col-span-7 sm:col-span-8 italic font-semibold text-stone-800 bg-stone-50 p-2.5 rounded border border-stone-200 text-xs sm:text-sm">
                "{toCleanTerbilang(transaction.amount)}"
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-4 sm:col-span-3 text-stone-600">Untuk Pembayaran</span>
              <span className="col-span-1 text-center text-stone-400">:</span>
              <div className="col-span-7 sm:col-span-8 font-medium text-stone-900">
                Infaq & Sedekah — {transaction.programTitle}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-4 sm:col-span-3 text-stone-600">Metode & Saluran</span>
              <span className="col-span-1 text-center text-stone-400">:</span>
              <div className="col-span-7 sm:col-span-8 text-stone-700 uppercase font-semibold text-xs">
                {transaction.paymentMethod === 'qris'
                  ? 'QRIS Nasional (NMID: ID1020084729103)'
                  : `Transfer Bank ${transaction.paymentMethod.toUpperCase()}`}
              </div>
            </div>

            {transaction.prayerWish && (
              <div className="grid grid-cols-12 gap-2 pt-2 border-t border-dashed border-stone-200">
                <span className="col-span-4 sm:col-span-3 text-stone-600">Hajat / Doa</span>
                <span className="col-span-1 text-center text-stone-400">:</span>
                <div className="col-span-7 sm:col-span-8 text-stone-700 italic text-xs leading-relaxed">
                  "{transaction.prayerWish}"
                </div>
              </div>
            )}
          </div>

          {/* Doa Sesudah Infaq */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center space-y-1.5">
            <p className="font-arabic text-base sm:text-lg text-emerald-950">
              آجَرَكَ اللَّهُ فِيمَا أَعْطَيْتَ، وَبَارَكَ لَكَ فِيمَا أَبْقَيْتَ، وَجَعَلَهُ لَكَ طَهُورًا
            </p>
            <p className="text-xs text-emerald-900/90 italic leading-relaxed">
              "Semoga Allah memberikan ganjaran pahala atas apa yang engkau infaqkan, memberkahi rezeki yang engkau simpan, dan menjadikannya pembersih hartamu."
            </p>
          </div>

          {/* Signatures & Stamps */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <span className="text-stone-500">Mengetahui, Ketua DKM</span>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-stone-400 text-lg">H. Muh. Ridwan</span>
              </div>
              <strong className="block text-stone-900 border-t border-stone-300 pt-1">
                {MOSQUE_PROFILE.dkmLeader}
              </strong>
            </div>

            <div>
              <span className="text-stone-500">Balantang, Bendahara Masjid</span>
              <div className="h-16 flex items-center justify-center relative">
                {/* Official Digital Stamp Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-800 flex items-center justify-center text-[8px] font-bold text-emerald-900 rotate-[-12deg] uppercase text-center p-1">
                    TERVERIFIKASI<br />DKM NURUL UMMAH<br />BALANTANG
                  </div>
                </div>
                <span className="font-serif italic text-stone-400 text-lg">Ilham P.</span>
              </div>
              <strong className="block text-stone-900 border-t border-stone-300 pt-1">
                {MOSQUE_PROFILE.treasurer}
              </strong>
            </div>
          </div>

          {/* Footer Receipt Footnote */}
          <div className="pt-4 text-center text-[10px] text-stone-400">
            Kuitansi ini diterbitkan secara sah dan terekam dalam Sistem Informasi Infaq Digital Masjid Nurul Ummah Balantang.
          </div>
        </div>

        {/* Modal Close CTA (No-Print) */}
        <div className="no-print p-4 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-stone-800 hover:text-stone-950 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
          >
            Tutup Kuitansi
          </button>
        </div>

      </div>
    </div>
  );
};
