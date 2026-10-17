import React, { useState } from 'react';
import { formatRupiah } from '../utils/formatters.ts';
import { X, Calculator, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

interface ZakatCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAmount: (amount: number, categoryNote: string) => void;
}

export const ZakatCalculatorModal: React.FC<ZakatCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyAmount
}) => {
  if (!isOpen) return null;

  const [calcTab, setCalcTab] = useState<'profesi' | 'maal' | 'fidyah'>('profesi');

  // State Zakat Profesi
  const [monthlyIncome, setMonthlyIncome] = useState<number>(8500000);
  const [extraIncome, setExtraIncome] = useState<number>(0);
  const [livingCost, setLivingCost] = useState<number>(2500000);

  // State Zakat Maal
  const [savingsAmount, setSavingsAmount] = useState<number>(130000000);
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(0);

  // State Fidyah
  const [fidyahDays, setFidyahDays] = useState<number>(7);
  const [fidyahRatePerDay, setFidyahRatePerDay] = useState<number>(35000); // Nasi kotak layak + lauk

  // Standard BAZNAS Benchmark
  const GOLD_PRICE_PER_GRAM = 1420000; // Rp 1.420.000/gr
  const NISAB_ANNUAL_MAAL = 85 * GOLD_PRICE_PER_GRAM; // Rp 120.700.000
  const NISAB_MONTHLY_INCOME = Math.round(NISAB_ANNUAL_MAAL / 12); // ~Rp 10.058.333

  // Calculations
  const netMonthlyIncome = Math.max(0, monthlyIncome + extraIncome - livingCost);
  const isEligibleProfesi = (monthlyIncome + extraIncome) >= NISAB_MONTHLY_INCOME;
  const zakatProfesiAmount = isEligibleProfesi ? Math.round(netMonthlyIncome * 0.025) : 0;

  const totalWealthMaal = savingsAmount + (goldWeightGrams * GOLD_PRICE_PER_GRAM);
  const isEligibleMaal = totalWealthMaal >= NISAB_ANNUAL_MAAL;
  const zakatMaalAmount = isEligibleMaal ? Math.round(totalWealthMaal * 0.025) : 0;

  const totalFidyahAmount = fidyahDays * fidyahRatePerDay;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold">Kalkulator Zakat & Fidyah</h3>
              <p className="text-xs text-emerald-200">Berdasarkan Ketentuan Syariah & Nisab BAZNAS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCalcTab('profesi')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              calcTab === 'profesi'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Zakat Penghasilan
          </button>
          <button
            type="button"
            onClick={() => setCalcTab('maal')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              calcTab === 'maal'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Zakat Harta / Maal
          </button>
          <button
            type="button"
            onClick={() => setCalcTab('fidyah')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
              calcTab === 'fidyah'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hitung Fidyah
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {calcTab === 'profesi' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span>
                  Nisab Zakat Profesi bulanan setara 85 gr emas/tahun dibagi 12 bulan (yaitu <strong>{formatRupiah(NISAB_MONTHLY_INCOME)}/bulan</strong>). Jika total pendapatan mencapai nisab, zakatnya adalah 2.5%.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Gaji / Penghasilan Pokok Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Bonus / Pendapatan Tambahan Lainnya (Rp)
                </label>
                <input
                  type="number"
                  value={extraIncome}
                  onChange={(e) => setExtraIncome(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Pengeluaran Kebutuhan Pokok / Utang Pokok Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={livingCost}
                  onChange={(e) => setLivingCost(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Result Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Status Kewajiban:</span>
                  <span className={`font-bold ${isEligibleProfesi ? 'text-emerald-800' : 'text-stone-600'}`}>
                    {isEligibleProfesi ? 'Wajib Menunaikan Zakat (Mencapai Nisab)' : 'Belum Mencapai Nisab (Dianjurkan Infaq/Sedekah)'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-sm font-semibold text-stone-800">Kewajiban Zakat (2.5%):</span>
                  <span className="text-xl font-extrabold text-emerald-950 font-mono">
                    {formatRupiah(isEligibleProfesi ? zakatProfesiAmount : 50000)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {calcTab === 'maal' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <span>
                  Nisab Zakat Harta/Maal (Tabungan, Emas, Deposito) adalah senilai 85 gram emas murni yang telah mengendap selama 1 tahun (haul), yaitu sebesar <strong>{formatRupiah(NISAB_ANNUAL_MAAL)}</strong>.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Total Tabungan / Deposito / Giro Mengendap 1 Tahun (Rp)
                </label>
                <input
                  type="number"
                  value={savingsAmount}
                  onChange={(e) => setSavingsAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Emas Batangan / Simpanan (Gram)
                </label>
                <input
                  type="number"
                  value={goldWeightGrams}
                  onChange={(e) => setGoldWeightGrams(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Result Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Total Harta Tersimpan:</span>
                  <span className="font-bold text-stone-900 tabular-nums">{formatRupiah(totalWealthMaal)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-sm font-semibold text-stone-800">Kewajiban Zakat Maal (2.5%):</span>
                  <span className="text-xl font-extrabold text-emerald-950 font-mono">
                    {formatRupiah(isEligibleMaal ? zakatMaalAmount : 0)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {calcTab === 'fidyah' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                Fidyah dibayarkan oleh mereka yang berhalangan tetap berpuasa (orang tua renta, sakit kronis menahun, ibu hamil/menyusui sesuai kondisi syar'i). Diwujudkan dalam makanan pokok siap santap untuk fakir miskin.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Jumlah Hari Puasa yang Ditinggalkan (Hari)
                </label>
                <input
                  type="number"
                  min="1"
                  value={fidyahDays}
                  onChange={(e) => setFidyahDays(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Biaya 1 Porsi Makanan Siap Santap per Hari (Rp)
                </label>
                <input
                  type="number"
                  value={fidyahRatePerDay}
                  onChange={(e) => setFidyahRatePerDay(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <span className="text-[11px] text-stone-500">Standar porsi bergizi warga Balantang: Rp 30.000 – Rp 40.000 / hari</span>
              </div>

              {/* Result Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Total Fidyah ({fidyahDays} Hari)</span>
                  <span className="text-xl font-extrabold text-emerald-950 font-mono">
                    {formatRupiah(totalFidyahAmount)}
                  </span>
                </div>
                <span className="text-xs text-emerald-800 font-semibold">Siap Disalurkan</span>
              </div>
            </div>
          )}

          {/* Action to Apply */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                let targetAmount = 50000;
                let note = 'Zakat';
                if (calcTab === 'profesi') {
                  targetAmount = zakatProfesiAmount > 0 ? zakatProfesiAmount : 50000;
                  note = 'Zakat Penghasilan / Profesi';
                } else if (calcTab === 'maal') {
                  targetAmount = zakatMaalAmount > 0 ? zakatMaalAmount : 100000;
                  note = 'Zakat Maal / Harta Simpanan';
                } else {
                  targetAmount = totalFidyahAmount;
                  note = `Fidyah Puasa (${fidyahDays} Hari)`;
                }
                onApplyAmount(targetAmount, note);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>Salurkan Nominal Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
