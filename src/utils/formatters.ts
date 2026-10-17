export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDateIndo(dateStr: string): string {
  try {
    const date = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date) + ' WITA';
  } catch {
    return dateStr;
  }
}

export function generateReceiptNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `KWT-NUM-${year}${month}-${randomSuffix}`;
}

export function terbilang(nilai: number): string {
  const bilangan = [
    '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
  ];

  if (nilai < 12) {
    return bilangan[nilai];
  } else if (nilai < 20) {
    return terbilang(nilai - 10) + ' Belas';
  } else if (nilai < 100) {
    return terbilang(Math.floor(nilai / 10)) + ' Puluh ' + terbilang(nilai % 10);
  } else if (nilai < 200) {
    return 'Seratus ' + terbilang(nilai - 100);
  } else if (nilai < 1000) {
    return terbilang(Math.floor(nilai / 100)) + ' Ratus ' + terbilang(nilai % 100);
  } else if (nilai < 2000) {
    return 'Seribu ' + terbilang(nilai - 1000);
  } else if (nilai < 1000000) {
    return terbilang(Math.floor(nilai / 1000)) + ' Ribu ' + terbilang(nilai % 1000);
  } else if (nilai < 1000000000) {
    return terbilang(Math.floor(nilai / 1000000)) + ' Juta ' + terbilang(nilai % 1000000);
  } else if (nilai < 1000000000000) {
    return terbilang(Math.floor(nilai / 1000000000)) + ' Miliar ' + terbilang(nilai % 1000000000);
  }
  return 'Nominal Terlalu Besar';
}

export function toCleanTerbilang(nilai: number): string {
  const result = terbilang(Math.floor(nilai)).replace(/\s+/g, ' ').trim();
  return result ? `${result} Rupiah` : 'Nol Rupiah';
}
