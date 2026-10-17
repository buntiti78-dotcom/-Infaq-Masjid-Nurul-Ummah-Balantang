import React, { useState } from 'react';
import { Transaction } from '../types/masjid.ts';
import { formatRupiah, formatDateIndo } from '../utils/formatters.ts';
import { Search, Download, ArrowUpRight, ArrowDownLeft, FileText, Printer } from 'lucide-react';

interface FinancialLedgerProps {
  transactions: Transaction[];
  onViewReceipt: (transaction: Transaction) => void;
}

export const FinancialLedger: React.FC<FinancialLedgerProps> = ({
  transactions,
  onViewReceipt
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'masuk' | 'keluar'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculations
  const totalIn = transactions
    .filter(t => t.type === 'masuk')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter(t => t.type === 'keluar')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIn - totalOut;

  // Filtering
  const filteredTransactions = transactions.filter((t) => {
    if (activeTab !== 'all' && t.type !== activeTab) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const donorMatch = t.donorName.toLowerCase().includes(query);
    const receiptMatch = t.receiptNumber.toLowerCase().includes(query);
    const programMatch = t.programTitle.toLowerCase().includes(query);
    const noteMatch = (t.note || '').toLowerCase().includes(query);
    const wishMatch = (t.prayerWish || '').toLowerCase().includes(query);

    return donorMatch || receiptMatch || programMatch || noteMatch || wishMatch;
  });

  const handleExportCSV = () => {
    const headers = ['No Kuitansi', 'Tanggal (WITA)', 'Tipe', 'Nama / Keterangan', 'Program', 'Metode', 'Nominal (Rp)', 'Status'];
    const rows = transactions.map(t => [
      t.receiptNumber,
      t.date,
      t.type === 'masuk' ? 'Pemasukan Infaq' : 'Pengeluaran Kas',
      `"${(t.type === 'masuk' ? t.donorName : t.note || t.donorName).replace(/"/g, '""')}"`,
      `"${t.programTitle.replace(/"/g, '""')}"`,
      t.paymentMethod.toUpperCase(),
      t.amount,
      t.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Kas_Masjid_Nurul_Ummah_Balantang_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintLedger = () => {
    window.print();
  };

  return (
    <section id="transparansi-kas" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Akuntabilitas & Keterbukaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Buku Kas Terbuka & Real-Time
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Seluruh penerimaan infaq dan pengeluaran operasional masjid tercatat terbuka untuk menjaga amanah jamaah warga Balantang dan para muhsinin.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrintLedger}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Laporan</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CSV</span>
            </button>
          </div>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Total Pemasukan Infaq</span>
              <span className="inline-flex items-center text-emerald-700 font-medium">
                <ArrowDownLeft className="w-4 h-4 mr-0.5" /> Masuk
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-900 tabular-nums">
              {formatRupiah(totalIn)}
            </p>
            <span className="text-xs text-stone-500">Dari seluruh program & kas umum</span>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Total Pengeluaran & Belanja</span>
              <span className="inline-flex items-center text-rose-700 font-medium">
                <ArrowUpRight className="w-4 h-4 mr-0.5" /> Keluar
              </span>
            </div>
            <p className="text-2xl font-bold text-stone-800 tabular-nums">
              {formatRupiah(totalOut)}
            </p>
            <span className="text-xs text-stone-500">Renovasi, jumat berkah & operasional</span>
          </div>

          <div className="bg-emerald-950 text-white border border-emerald-900 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-300 mb-1">
              <span>Saldo Kas Tersedia</span>
              <span className="text-emerald-300 font-medium">Kas Aktif</span>
            </div>
            <p className="text-2xl font-bold text-emerald-300 tabular-nums">
              {formatRupiah(balance)}
            </p>
            <span className="text-xs text-stone-400">Siap digunakan untuk kemaslahatan</span>
          </div>
        </div>

        {/* Controls: Search & Tabs */}
        <div className="bg-white border border-stone-200 rounded-t-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua Mutasi ({transactions.length})
            </button>
            <button
              onClick={() => setActiveTab('masuk')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'masuk'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Infaq Masuk
            </button>
            <button
              onClick={() => setActiveTab('keluar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'keluar'
                  ? 'bg-white text-rose-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Penyaluran / Keluar
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari donatur, nomor kuitansi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Financial Table */}
        <div className="bg-white border-x border-b border-stone-200 rounded-b-xl overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tanggal (WITA)</th>
                <th className="py-3 px-4">No. Kuitansi</th>
                <th className="py-3 px-4">Donatur / Keterangan</th>
                <th className="py-3 px-4">Program Pos Anggaran</th>
                <th className="py-3 px-4">Metode</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    Tidak ditemukan data transaksi yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-stone-600 font-mono">
                      {trx.date}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono font-medium text-stone-800">
                      {trx.receiptNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">
                        {trx.donorName}
                      </div>
                      {trx.note && (
                        <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {trx.note}
                        </div>
                      )}
                      {trx.prayerWish && (
                        <div className="text-[11px] text-emerald-800 italic mt-0.5 line-clamp-1">
                          "{trx.prayerWish}"
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-stone-700 max-w-xs truncate">
                      {trx.programTitle}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap uppercase font-mono text-[11px] text-stone-600">
                      {trx.paymentMethod}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-bold tabular-nums">
                      {trx.type === 'masuk' ? (
                        <span className="text-emerald-700">+{formatRupiah(trx.amount)}</span>
                      ) : (
                        <span className="text-rose-700">-{formatRupiah(trx.amount)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {trx.type === 'masuk' ? (
                        <button
                          onClick={() => onViewReceipt(trx)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Kuitansi</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-400">Bukti Kas</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-stone-500 text-center">
          Diverifikasi & disahkan oleh Bendahara DKM Masjid Nurul Ummah Balantang secara berkala.
        </div>

      </div>
    </section>
  );
};
