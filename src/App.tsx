import React, { useState, useEffect } from 'react';
import { InfaqProgram, Transaction } from './types/masjid.ts';
import { INITIAL_PROGRAMS, INITIAL_TRANSACTIONS } from './data/initialData.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProgramsList } from './components/ProgramsList.tsx';
import { FinancialLedger } from './components/FinancialLedger.tsx';
import { PrayerWall } from './components/PrayerWall.tsx';
import { InfaqModal } from './components/InfaqModal.tsx';
import { ReceiptModal } from './components/ReceiptModal.tsx';
import { ZakatCalculatorModal } from './components/ZakatCalculatorModal.tsx';
import { AdminPanelModal } from './components/AdminPanelModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [programs, setPrograms] = useState<InfaqProgram[]>(() => {
    try {
      const saved = localStorage.getItem('masjid_num_programs');
      return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
    } catch {
      return INITIAL_PROGRAMS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('masjid_num_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Modals state
  const [selectedProgram, setSelectedProgram] = useState<InfaqProgram | null>(null);
  const [isInfaqOpen, setIsInfaqOpen] = useState<boolean>(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [activeReceipt, setActiveReceipt] = useState<Transaction | null>(null);
  const [isZakatOpen, setIsZakatOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('masjid_num_programs', JSON.stringify(programs));
    } catch {
      // ignore
    }
  }, [programs]);

  useEffect(() => {
    try {
      localStorage.setItem('masjid_num_transactions', JSON.stringify(transactions));
    } catch {
      // ignore
    }
  }, [transactions]);

  // Calculations for KPI strip
  const totalCollected = transactions
    .filter(t => t.type === 'masuk')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDistributed = transactions
    .filter(t => t.type === 'keluar')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalCollected - totalDistributed;
  const donorCount = transactions.filter(t => t.type === 'masuk').length;

  const handleOpenInfaq = (program?: InfaqProgram) => {
    setSelectedProgram(program || programs[0]);
    setIsInfaqOpen(true);
  };

  const handleInfaqSuccess = (newTrx: Transaction) => {
    // 1. Add Transaction
    setTransactions(prev => [newTrx, ...prev]);

    // 2. Update program collectedAmount and donorCount
    setPrograms(prev => prev.map(p => {
      if (p.id === newTrx.programId) {
        return {
          ...p,
          collectedAmount: p.collectedAmount + newTrx.amount,
          donorCount: p.donorCount + 1
        };
      }
      return p;
    }));

    // 3. Switch to official Receipt modal
    setIsInfaqOpen(false);
    setActiveReceipt(newTrx);
    setIsReceiptOpen(true);
  };

  const handleAddAdminTransaction = (newTrx: Transaction) => {
    setTransactions(prev => [newTrx, ...prev]);

    if (newTrx.type === 'masuk') {
      setPrograms(prev => prev.map(p => {
        if (p.id === newTrx.programId) {
          return {
            ...p,
            collectedAmount: p.collectedAmount + newTrx.amount,
            donorCount: p.donorCount + 1
          };
        }
        return p;
      }));
    }
  };

  const handleViewReceipt = (trx: Transaction) => {
    setActiveReceipt(trx);
    setIsReceiptOpen(true);
  };

  const handleAminClick = (trxId: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === trxId) {
        return { ...t, aminCount: (t.aminCount || 0) + 1 };
      }
      return t;
    }));
  };

  const handleApplyZakat = (amount: number, categoryNote: string) => {
    const generalProgram = programs.find(p => p.category === 'sosial') || programs[0];
    setSelectedProgram(generalProgram);
    setIsInfaqOpen(true);
  };

  const handleResetData = () => {
    setPrograms(INITIAL_PROGRAMS);
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem('masjid_num_programs');
    localStorage.removeItem('masjid_num_transactions');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-900 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenInfaq={() => handleOpenInfaq()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenZakat={() => setIsZakatOpen(true)}
        activeSection="home"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenInfaq={() => handleOpenInfaq()}
          onOpenZakat={() => setIsZakatOpen(true)}
          totalCollected={totalCollected}
          totalDistributed={totalDistributed}
          currentBalance={currentBalance}
          donorCount={donorCount}
        />

        {/* Infaq Programs Showcase */}
        <ProgramsList
          programs={programs}
          onSelectProgram={(p) => handleOpenInfaq(p)}
        />

        {/* Real-time Financial Ledger & Transparency */}
        <FinancialLedger
          transactions={transactions}
          onViewReceipt={handleViewReceipt}
        />

        {/* Congregation Prayer Wall */}
        <PrayerWall
          transactions={transactions}
          onAminClick={handleAminClick}
          onOpenInfaq={() => handleOpenInfaq()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenInfaq={() => handleOpenInfaq()}
        onOpenZakat={() => setIsZakatOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals */}
      <InfaqModal
        isOpen={isInfaqOpen}
        onClose={() => setIsInfaqOpen(false)}
        program={selectedProgram}
        programs={programs}
        onSuccess={handleInfaqSuccess}
      />

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transaction={activeReceipt}
      />

      <ZakatCalculatorModal
        isOpen={isZakatOpen}
        onClose={() => setIsZakatOpen(false)}
        onApplyAmount={handleApplyZakat}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        programs={programs}
        onAddTransaction={handleAddAdminTransaction}
        onResetData={handleResetData}
      />
    </div>
  );
}
