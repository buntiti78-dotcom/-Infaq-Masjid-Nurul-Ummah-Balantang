import React, { useState } from 'react';
import { InfaqProgram, PaymentMethod, Transaction } from '../types/masjid.ts';
import { formatRupiah, generateReceiptNumber } from '../utils/formatters.ts';
import { X, Lock, PlusCircle, MinusCircle, CheckCircle, ShieldAlert, RotateCcw } from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs: InfaqProgram[];
  onAddTransaction: (trx: Transaction) => void;
  onResetData: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  programs,
  onAddTransaction,
  onResetData
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');

  // Form State Pemasukan
  const [inProgramId, setInProgramId] = useState<string>(programs[0]?.id || 'prog-umum');
  const [inDonorName, setInDonorName] = useState<string>('Tromol Sholat Jumat Balantang');
  const [inAmount, setInAmount] = useState<number>(1500000);
  const [inMethod, setInMethod] = useState<PaymentMethod>('tunai');
  const [inNote, setInNote] = useState<string>('Perhitungan tromol keliling sholat Jumat');

  // Form State Pengeluaran
  const [outProgramId, setOutProgramId] = useState<string>(programs[0]?.id || 'prog-umum');
  const [outVendor, setOutVendor] = useState<string>('Toko Bangunan / Operasional');
  const [outAmount, setOutAmount] = useState<number>(650000);
  const [outMethod, setOutMethod] = useState<PaymentMethod>('tunai');
  const [outNote, setOutNote] = useState<string>('Pembelian bahan pembersih dan perlengkapan wudhu');

  const [successNotice, setSuccessNotice] = useState<string>('');

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah. Gunakan PIN default pengurus: 1234');
    }
  };

  const handleSavePemasukan = (e: React.FormEvent) => {
    e.preventDefault();
    if (inAmount <= 0) return;

    const prog = programs.find(p => p.id === inProgramId) || programs[0];
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      receiptNumber: generateReceiptNumber(),
      type: 'masuk',
      programId: prog.id,
      programTitle: prog.title,
      donorName: inDonorName.trim() || 'Hamba Allah',
      amount: inAmount,
      paymentMethod: inMethod,
      status: 'verified',
      date: formattedDate,
      note: inNote.trim() || undefined,
      aminCount: 1
    };

    onAddTransaction(newTrx);
    setSuccessNotice(`Pemasukan kas berhasil dicatat! (${formatRupiah(inAmount)})`);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const handleSavePengeluaran = (e: React.FormEvent) => {
    e.preventDefault();
    if (outAmount <= 0) return;

    const prog = programs.find(p => p.id === outProgramId) || programs[0];
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      receiptNumber: generateReceiptNumber(),
      type: 'keluar',
      programId: prog.id,
      programTitle: prog.title,
      donorName: outVendor.trim() || 'Pengeluaran DKM',
      amount: outAmount,
      paymentMethod: outMethod,
      status: 'verified',
      date: formattedDate,
      note: outNote.trim() || undefined
    };

    onAddTransaction(newTrx);
    setSuccessNotice(`Pengeluaran kas berhasil dibukukan! (${formatRupiah(outAmount)})`);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold">Portal Pengurus & Bendahara DKM</h3>
              <p className="text-xs text-emerald-200">Masjid Nurul Ummah Balantang</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* PIN Verification */
          <form onSubmit={handleVerifyPin} className="p-8 space-y-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-stone-900">Masukkan PIN Keamanan</h4>
              <p className="text-xs text-stone-500">
                Fitur ini dikhususkan bagi bendahara dan pengurus DKM untuk mencatat kas masjid.
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-2">
              <input
                type="password"
                maxLength={6}
                placeholder="Masukkan 4 Digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center text-2xl tracking-widest px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}
              <div className="text-[11px] text-stone-500 bg-stone-100 py-1.5 px-3 rounded">
                PIN Standar Demo: <strong className="font-mono text-emerald-900">1234</strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Buka Akses Pengurus
              </button>
            </div>
          </form>
        ) : (
          /* Authenticated Admin Management */
          <div className="p-6 space-y-6">
            
            {/* Success Toast */}
            {successNotice && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-medium rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-700" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Admin Tabs */}
            <div className="p-1 bg-stone-100 rounded-lg flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('pemasukan')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'pemasukan'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Catat Infaq / Tromol Masuk</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pengeluaran')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'pengeluaran'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MinusCircle className="w-4 h-4 text-rose-700" />
                <span>Catat Belanja / Pengeluaran</span>
              </button>
            </div>

            {/* TAB PEMASUKAN */}
            {activeTab === 'pemasukan' && (
              <form onSubmit={handleSavePemasukan} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Sumber / Nama Donatur</label>
                  <input
                    type="text"
                    required
                    value={inDonorName}
                    onChange={(e) => setInDonorName(e.target.value)}
                    placeholder="Contoh: Kotak Amal Tromol Jumat 16 Okt"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Alokasi Program</label>
                    <select
                      value={inProgramId}
                      onChange={(e) => setInProgramId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Metode Penerimaan</label>
                    <select
                      value={inMethod}
                      onChange={(e) => setInMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 uppercase"
                    >
                      <option value="tunai">Tunai / Tromol</option>
                      <option value="bsi">Transfer BSI</option>
                      <option value="sulselbar">Transfer Bank Sulselbar</option>
                      <option value="bri">Transfer BRI</option>
                      <option value="qris">QRIS Masjid</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Jumlah Uang Diterima (Rp)</label>
                  <input
                    type="number"
                    min="1000"
                    required
                    value={inAmount}
                    onChange={(e) => setInAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Keterangan / Berita Acara</label>
                  <input
                    type="text"
                    value={inNote}
                    onChange={(e) => setInNote(e.target.value)}
                    placeholder="Contoh: Penghitungan bersama 3 saksi pengurus DKM"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Simpan Kas Masuk ({formatRupiah(inAmount)})
                  </button>
                </div>
              </form>
            )}

            {/* TAB PENGELUARAN */}
            {activeTab === 'pengeluaran' && (
              <form onSubmit={handleSavePengeluaran} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Penerima Dana / Toko / Vendor</label>
                  <input
                    type="text"
                    required
                    value={outVendor}
                    onChange={(e) => setOutVendor(e.target.value)}
                    placeholder="Contoh: Toko Material Balantang / Marbot Masjid"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Beban Pos Anggaran</label>
                    <select
                      value={outProgramId}
                      onChange={(e) => setOutProgramId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Metode Bayar</label>
                    <select
                      value={outMethod}
                      onChange={(e) => setOutMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700 uppercase"
                    >
                      <option value="tunai">Tunai / Kas Kecil</option>
                      <option value="bsi">Transfer BSI</option>
                      <option value="sulselbar">Transfer Bank Sulselbar</option>
                      <option value="bri">Transfer BRI</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Nominal Pengeluaran (Rp)</label>
                  <input
                    type="number"
                    min="1000"
                    required
                    value={outAmount}
                    onChange={(e) => setOutAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Rincian Nota / Belanja</label>
                  <input
                    type="text"
                    required
                    value={outNote}
                    onChange={(e) => setOutNote(e.target.value)}
                    placeholder="Contoh: Pembelian 15 sak semen tonasa + ongkos angkut serambi"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Simpan Pengeluaran Kas ({formatRupiah(outAmount)})
                  </button>
                </div>
              </form>
            )}

            {/* Quick Reset Option */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Kembalikan data kas ke simulasi awal?')) {
                    onResetData();
                    setSuccessNotice('Data kas berhasil dikembalikan ke saldo awal.');
                  }
                }}
                className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Data Demo Awal</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 font-semibold text-stone-800 hover:underline cursor-pointer"
              >
                Tutup Sesi
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
