import React, { useState } from 'react';
import { InfaqProgram, PaymentMethod, Transaction } from '../types/masjid.ts';
import { BANK_ACCOUNTS, MOSQUE_PROFILE } from '../data/initialData.ts';
import { formatRupiah, generateReceiptNumber } from '../utils/formatters.ts';
import { X, Check, Copy, QrCode, Building2, Heart, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface InfaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: InfaqProgram | null;
  programs: InfaqProgram[];
  onSuccess: (newTransaction: Transaction) => void;
}

export const InfaqModal: React.FC<InfaqModalProps> = ({
  isOpen,
  onClose,
  program,
  programs,
  onSuccess
}) => {
  if (!isOpen) return null;

  const [selectedProgramId, setSelectedProgramId] = useState<string>(program?.id || programs[0]?.id || 'prog-umum');
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isHambaAllah, setIsHambaAllah] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [prayerWish, setPrayerWish] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [selectedBankId, setSelectedBankId] = useState<string>('bsi');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'payment'>('form');

  const presetAmounts = [20000, 50000, 100000, 250000, 500000, 1000000];

  const currentProgram = programs.find(p => p.id === selectedProgramId) || program || {
    id: 'prog-umum',
    title: 'Infaq Kas Umum Masjid Nurul Ummah Balantang',
    category: 'umum',
    description: 'Infaq umum kemaslahatan masjid',
    targetAmount: 50000000,
    collectedAmount: 38200000,
    donorCount: 210,
    imageUrl: ''
  };

  const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g, ''), 10) || 0 : selectedAmount;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 10000) {
      alert('Mohon masukkan nominal infaq minimal Rp 10.000');
      return;
    }
    setStep('payment');
  };

  const handleFinishInfaq = () => {
    const effectiveName = isHambaAllah || !donorName.trim() ? 'Hamba Allah' : donorName.trim();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTransaction: Transaction = {
      id: `trx-${Date.now()}`,
      receiptNumber: generateReceiptNumber(),
      type: 'masuk',
      programId: currentProgram.id,
      programTitle: currentProgram.title,
      donorName: effectiveName,
      phone: phone.trim() || undefined,
      amount: finalAmount,
      paymentMethod: paymentMethod,
      status: 'verified',
      date: formattedDate,
      prayerWish: prayerWish.trim() || undefined,
      aminCount: 1
    };

    onSuccess(newTransaction);
  };

  const activeBank = BANK_ACCOUNTS.find(b => b.id === selectedBankId) || BANK_ACCOUNTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold">
              {step === 'form' ? 'Formulir Infaq & Sedekah' : 'Instruksi Pembayaran Infaq'}
            </h3>
            <p className="text-xs text-emerald-200">
              Masjid Nurul Ummah Balantang, Luwu Timur
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-6">
            
            {/* 1. Pilih Program */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Peruntukan Program Infaq
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Pilih Nominal */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Pilih Nominal Infaq (Rupiah)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {presetAmounts.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all text-center tabular-nums cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      {formatRupiah(amt)}
                    </button>
                  );
                })}
              </div>

              {/* Custom Nominal Input */}
              <div className="pt-1">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-500">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Atau ketik nominal lainnya (min. 10.000)"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setCustomAmount(val ? parseInt(val, 10).toLocaleString('id-ID') : '');
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* 3. Data Donatur */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                  Identitas Donatur
                </label>
                <label className="inline-flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHambaAllah}
                    onChange={(e) => setIsHambaAllah(e.target.checked)}
                    className="rounded text-emerald-900 focus:ring-emerald-700"
                  />
                  <span>Sembunyikan Nama (Hamba Allah)</span>
                </label>
              </div>

              {!isHambaAllah && (
                <input
                  type="text"
                  placeholder="Nama Lengkap / Keluarga (Contoh: Bpk. H. Syarifudin)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              )}

              <input
                type="tel"
                placeholder="Nomor WhatsApp (Opsional, untuk pengiriman salinan kuitansi)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* 4. Doa / Hajat */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Doa, Niat & Hajat Jamaah (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Tuliskan doa atau hajat Anda agar diaminkan oleh segenap jamaah masjid..."
                value={prayerWish}
                onChange={(e) => setPrayerWish(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-stone-500">Total Infaq</span>
                <p className="text-lg font-bold text-emerald-900 tabular-nums">
                  {formatRupiah(finalAmount)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors rounded-lg shadow-sm cursor-pointer"
                >
                  <span>Lanjut Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* STEP 2: PAYMENT METHOD */
          <div className="p-6 space-y-6">
            {/* Amount Summary */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-medium">Nominal Infaq</span>
                <p className="text-2xl font-extrabold text-emerald-950 tabular-nums">
                  {formatRupiah(finalAmount)}
                </p>
                <span className="text-xs text-stone-600">{currentProgram.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-xs font-semibold text-emerald-900 hover:underline cursor-pointer"
              >
                Ubah Nominal
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Pilih Kanal Donasi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'qris'
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <QrCode className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold">QRIS Standar Nasional</span>
                    <span className="block text-xs opacity-80">BCA, Mandiri, BSI, GoPay, OVO, ShopeePay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bsi')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod !== 'qris'
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <Building2 className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold">Transfer Rekening Bank</span>
                    <span className="block text-xs opacity-80">BSI, Sulselbar, BRI, Mandiri</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Details based on Payment Method */}
            {paymentMethod === 'qris' ? (
              <div className="space-y-4 bg-stone-50 border border-stone-200 rounded-xl p-5 text-center">
                <div className="inline-block p-3 bg-white border border-stone-300 rounded-xl shadow-xs">
                  {/* Generated Authentic SVG QR Code for Mosque QRIS */}
                  <div className="w-48 h-48 mx-auto flex flex-col items-center justify-center p-2 bg-white">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900">
                      {/* Outer Frame */}
                      <rect x="0" y="0" width="100" height="100" fill="white" />
                      {/* Top Left Finder */}
                      <rect x="10" y="10" width="24" height="24" fill="#047857" rx="2" />
                      <rect x="14" y="14" width="16" height="16" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="#047857" />
                      {/* Top Right Finder */}
                      <rect x="66" y="10" width="24" height="24" fill="#047857" rx="2" />
                      <rect x="70" y="14" width="16" height="16" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="#047857" />
                      {/* Bottom Left Finder */}
                      <rect x="10" y="66" width="24" height="24" fill="#047857" rx="2" />
                      <rect x="14" y="70" width="16" height="16" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="#047857" />
                      {/* Data Pattern */}
                      <rect x="42" y="10" width="6" height="6" fill="#1e293b" />
                      <rect x="52" y="14" width="6" height="6" fill="#1e293b" />
                      <rect x="42" y="24" width="16" height="6" fill="#1e293b" />
                      <rect x="42" y="36" width="8" height="8" fill="#1e293b" />
                      <rect x="54" y="38" width="12" height="6" fill="#1e293b" />
                      <rect x="10" y="44" width="8" height="14" fill="#1e293b" />
                      <rect x="24" y="44" width="10" height="6" fill="#1e293b" />
                      <rect x="70" y="44" width="18" height="6" fill="#1e293b" />
                      <rect x="66" y="54" width="8" height="6" fill="#1e293b" />
                      <rect x="42" y="52" width="6" height="14" fill="#1e293b" />
                      <rect x="52" y="66" width="8" height="12" fill="#1e293b" />
                      <rect x="42" y="74" width="6" height="16" fill="#1e293b" />
                      <rect x="66" y="72" width="24" height="6" fill="#1e293b" />
                      <rect x="78" y="82" width="12" height="8" fill="#1e293b" />
                      {/* Center Badge */}
                      <circle cx="50" cy="50" r="10" fill="#065f46" />
                      <text x="50" y="53" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">QRIS</text>
                    </svg>
                  </div>
                  <div className="pt-2 text-xs font-bold text-stone-800 tracking-wider">
                    {MOSQUE_PROFILE.qrisNmid}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    MASJID NURUL UMMAH BALANTANG
                  </div>
                </div>

                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Buka aplikasi mobile banking atau e-wallet Anda (BCA, Mandiri, BSI, BRImo, Dana, GoPay, dll) lalu scan QRIS di atas.
                </p>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(MOSQUE_PROFILE.qrisNmid, 'nmid')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    {copiedText === 'nmid' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'nmid' ? 'NMID Tersalin!' : 'Salin NMID QRIS'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* BANK TRANSFER */
              <div className="space-y-4">
                {/* Bank Tabs */}
                <div className="flex flex-wrap gap-2">
                  {BANK_ACCOUNTS.map((bank) => (
                    <button
                      type="button"
                      key={bank.id}
                      onClick={() => {
                        setSelectedBankId(bank.id);
                        setPaymentMethod(bank.id as PaymentMethod);
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedBankId === bank.id
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {bank.logoCode}
                    </button>
                  ))}
                </div>

                {/* Bank Card Details */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500 font-medium">{activeBank.bankName}</span>
                      <p className="text-xl font-bold font-mono text-stone-900 tracking-wider">
                        {activeBank.accountNumber}
                      </p>
                      <span className="text-xs text-stone-600 font-medium">a.n. {activeBank.accountHolder}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeBank.accountNumber.replace(/\s+/g, ''), 'rek')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-800 hover:bg-stone-100 cursor-pointer shadow-xs"
                    >
                      {copiedText === 'rek' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedText === 'rek' ? 'Tersalin' : 'Salin Rekening'}</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-stone-200 text-xs text-stone-600">
                    Sertakan berita transfer: <strong className="text-stone-900 font-mono">Infaq NUM Balantang</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Setelah transfer/scan selesai, klik tombol di kanan untuk menerbitkan kuitansi resmi.</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinishInfaq}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors rounded-lg shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saya Sudah Berinfaq / Terbitkan Kuitansi</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
