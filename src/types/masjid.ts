export type ProgramCategory = 'renovasi' | 'sosial' | 'operasional' | 'pendidikan' | 'umum';

export interface InfaqProgram {
  id: string;
  title: string;
  category: ProgramCategory;
  description: string;
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  imageUrl: string;
  urgencyLabel?: string;
}

export type PaymentMethod = 'qris' | 'bsi' | 'sulselbar' | 'bri' | 'mandiri' | 'tunai';

export interface Transaction {
  id: string;
  receiptNumber: string;
  type: 'masuk' | 'keluar';
  programId: string;
  programTitle: string;
  donorName: string; // 'Hamba Allah' or real name
  phone?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'verified' | 'pending';
  date: string; // YYYY-MM-DD HH:mm
  prayerWish?: string;
  aminCount?: number;
  note?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoCode: string;
  color: string;
}

export interface MosqueProfile {
  name: string;
  nickname: string;
  address: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  phone: string;
  dkmLeader: string;
  treasurer: string;
  qrisNmid: string;
}
