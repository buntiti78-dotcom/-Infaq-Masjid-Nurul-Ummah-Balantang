import { InfaqProgram, MosqueProfile, BankAccount, Transaction } from '../types/masjid.ts';

export const MOSQUE_PROFILE: MosqueProfile = {
  name: 'Masjid Nurul Ummah Balantang',
  nickname: 'Nurul Ummah',
  address: 'Jl. Sam Ratulangi, Dusun Balantang, Desa Balantang',
  district: 'Kecamatan Malili',
  regency: 'Kabupaten Luwu Timur',
  province: 'Sulawesi Selatan',
  postalCode: '92981',
  phone: '0812-4288-9102',
  dkmLeader: 'H. Muh. Ridwan Saleh, S.Ag',
  treasurer: 'Ustadz Ilham Pratama, S.E',
  qrisNmid: 'ID1020084729103'
};

export const INITIAL_PROGRAMS: InfaqProgram[] = [
  {
    id: 'prog-renovasi',
    title: 'Pembangunan & Renovasi Kanopi Serambi Jamaah',
    category: 'renovasi',
    description: 'Peluasan area sholat serambi samping dan penggantian kanopi tahan panas untuk menampung lonjakan jamaah sholat Jumat dan pengajian akbar warga Balantang.',
    targetAmount: 85000000,
    collectedAmount: 58500000,
    donorCount: 142,
    imageUrl: '/src/assets/images/renovasi_masjid_1792213225904.jpg',
    urgencyLabel: 'Tahap 2 Pengerjaan'
  },
  {
    id: 'prog-jumat-berkah',
    title: 'Program Sedekah Makan Siang Jumat Berkah',
    category: 'sosial',
    description: 'Penyediaan 250 paket makanan bergizi dan air mineral setiap hari Jumat untuk para musafir, jamaah sholat Jumat, dan santri penghafal Quran.',
    targetAmount: 12000000,
    collectedAmount: 9400000,
    donorCount: 96,
    imageUrl: '/src/assets/images/jumat_berkah_infaq_1792213225907.jpg',
    urgencyLabel: 'Rutin Setiap Pekan'
  },
  {
    id: 'prog-santunan-yatim',
    title: 'Santunan Biaya Hidup & Beasiswa Santri Yatim-Dhuafa',
    category: 'sosial',
    description: 'Bantuan santunan berkala untuk 38 anak yatim piatu dan keluarga pra-sejahtera di sekitar kelurahan Balantang dan pesisir Malili.',
    targetAmount: 20000000,
    collectedAmount: 16800000,
    donorCount: 114,
    imageUrl: '/src/assets/images/tpa_santunan_anak_1792213226292.jpg',
    urgencyLabel: 'Distribusi Awal Bulan'
  },
  {
    id: 'prog-operasional',
    title: 'Operasional Listrik, Air Bersih & Kebersihan Masjid',
    category: 'operasional',
    description: 'Pembiayaan daya listrik PLN, perawatan pompa air wudhu, AC ruang sholat utama, pewangi karpet, dan insentif marbot masjid.',
    targetAmount: 9000000,
    collectedAmount: 8250000,
    donorCount: 88,
    imageUrl: '/src/assets/images/renovasi_masjid_1792213225904.jpg',
    urgencyLabel: 'Bulanan Berjalan'
  },
  {
    id: 'prog-pendidikan-tpa',
    title: 'Pengadaan Kitab Suci Al-Qur\'an & Sarana Belajar TPA',
    category: 'pendidikan',
    description: 'Pengadaan mushaf Al-Qur\'an cetakan Madinah, meja kayu rehal, modul Iqro, dan sound portable untuk pembelajaran santri cilik TPA Nurul Ummah.',
    targetAmount: 7500000,
    collectedAmount: 6150000,
    donorCount: 53,
    imageUrl: '/src/assets/images/tpa_santunan_anak_1792213226292.jpg',
    urgencyLabel: 'Tahun Ajaran Baru'
  }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bsi',
    bankName: 'Bank Syariah Indonesia (BSI)',
    accountNumber: '7182 9901 23',
    accountHolder: 'MASJID NURUL UMMAH BALANTANG',
    logoCode: 'BSI',
    color: '#00A39D'
  },
  {
    id: 'sulselbar',
    bankName: 'Bank Sulselbar Syariah',
    accountNumber: '040 202 0000 188',
    accountHolder: 'DKM MASJID NURUL UMMAH',
    logoCode: 'SULSELBAR',
    color: '#1E3A8A'
  },
  {
    id: 'bri',
    bankName: 'Bank Rakyat Indonesia (BRI)',
    accountNumber: '0254 01 003892 53 1',
    accountHolder: 'MASJID NURUL UMMAH',
    logoCode: 'BRI',
    color: '#0284C7'
  },
  {
    id: 'mandiri',
    bankName: 'Bank Mandiri',
    accountNumber: '174 000 8829 110',
    accountHolder: 'PANITIA MASJID NURUL UMMAH',
    logoCode: 'MANDIRI',
    color: '#D97706'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-101',
    receiptNumber: 'KWT-NUM-202610-0089',
    type: 'masuk',
    programId: 'prog-renovasi',
    programTitle: 'Pembangunan & Renovasi Kanopi Serambi Jamaah',
    donorName: 'H. Andi Baso & Keluarga',
    phone: '081342119988',
    amount: 2500000,
    paymentMethod: 'bsi',
    status: 'verified',
    date: '2026-10-16 19:45',
    prayerWish: 'Niat infaq untuk almarhum kedua orang tua kami. Semoga menjadi amal jariyah yang terus mengalir pahalanya.',
    aminCount: 34
  },
  {
    id: 'trx-102',
    receiptNumber: 'KWT-NUM-202610-0088',
    type: 'masuk',
    programId: 'prog-jumat-berkah',
    programTitle: 'Program Sedekah Makan Siang Jumat Berkah',
    donorName: 'Hamba Allah',
    amount: 500000,
    paymentMethod: 'qris',
    status: 'verified',
    date: '2026-10-16 14:20',
    prayerWish: 'Semoga berkah untuk sekeluarga, dimudahkan rezeki yang halal dan thoyyib.',
    aminCount: 19
  },
  {
    id: 'trx-103',
    receiptNumber: 'KWT-NUM-202610-0087',
    type: 'keluar',
    programId: 'prog-operasional',
    programTitle: 'Operasional Listrik, Air Bersih & Kebersihan Masjid',
    donorName: 'Pengurus DKM (Pengeluaran)',
    amount: 1450000,
    paymentMethod: 'tunai',
    status: 'verified',
    date: '2026-10-15 11:30',
    note: 'Pembelian token listrik PLN masjid 1000kVA dan refill isi ulang sabun pembersih lantai wudhu.'
  },
  {
    id: 'trx-104',
    receiptNumber: 'KWT-NUM-202610-0086',
    type: 'masuk',
    programId: 'prog-santunan-yatim',
    programTitle: 'Santunan Biaya Hidup & Beasiswa Santri Yatim-Dhuafa',
    donorName: 'Ibu Ratna Malili',
    phone: '085299443322',
    amount: 1000000,
    paymentMethod: 'sulselbar',
    status: 'verified',
    date: '2026-10-14 16:15',
    prayerWish: 'Mohon doa agar anak-anak kami senantiasa sholeh/sholehah dan berbakti kepada agama dan bangsa.',
    aminCount: 27
  },
  {
    id: 'trx-105',
    receiptNumber: 'KWT-NUM-202610-0085',
    type: 'keluar',
    programId: 'prog-jumat-berkah',
    programTitle: 'Program Sedekah Makan Siang Jumat Berkah',
    donorName: 'Dapur Berkah DKM (Pengeluaran)',
    amount: 2250000,
    paymentMethod: 'tunai',
    status: 'verified',
    date: '2026-10-10 10:00',
    note: 'Belanja bahan dapur 250 porsi nasi kotak ayam bakar & air mineral Jumat Berkah pekan lalu.'
  },
  {
    id: 'trx-106',
    receiptNumber: 'KWT-NUM-202610-0084',
    type: 'masuk',
    programId: 'prog-renovasi',
    programTitle: 'Pembangunan & Renovasi Kanopi Serambi Jamaah',
    donorName: 'Komunitas Pemuda Hijrah Balantang',
    amount: 1200000,
    paymentMethod: 'qris',
    status: 'verified',
    date: '2026-10-09 20:10',
    prayerWish: 'Patungan infaq pemuda Balantang untuk kenyamanan sholat jamaah di masjid tercinta.',
    aminCount: 42
  },
  {
    id: 'trx-107',
    receiptNumber: 'KWT-NUM-202610-0083',
    type: 'masuk',
    programId: 'prog-pendidikan-tpa',
    programTitle: 'Pengadaan Kitab Suci Al-Qur\'an & Sarana Belajar TPA',
    donorName: 'H. Sudirman, S.T',
    amount: 750000,
    paymentMethod: 'bri',
    status: 'verified',
    date: '2026-10-08 08:35',
    prayerWish: 'Semoga anak-anak santri di Balantang fasih membaca dan mencintai Al-Qur\'an.',
    aminCount: 22
  },
  {
    id: 'trx-108',
    receiptNumber: 'KWT-NUM-202610-0082',
    type: 'keluar',
    programId: 'prog-renovasi',
    programTitle: 'Pembangunan & Renovasi Kanopi Serambi Jamaah',
    donorName: 'CV Luwu Konstruksi (Pengeluaran)',
    amount: 8500000,
    paymentMethod: 'bsi',
    status: 'verified',
    date: '2026-10-05 13:00',
    note: 'Pembayaran termin 1 rangka besi hollow galvanis dan atap spandek peredam suara serambi.'
  }
];
