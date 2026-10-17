export interface PrayerSchedule {
  subuh: string;
  terbit: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export function getMaliliPrayerTimes(): PrayerSchedule {
  // Approximate standard astronomical prayer times for Malili, Luwu Timur (WITA, UTC+8)
  return {
    subuh: '04:46',
    terbit: '05:58',
    dzuhur: '12:04',
    ashar: '15:18',
    maghrib: '18:07',
    isya: '19:16'
  };
}

export function getNextPrayer(): { name: string; time: string; remainingMinutes: number } {
  const schedule = getMaliliPrayerTimes();
  const now = new Date();
  
  // Calculate WITA time (UTC+8)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const witaDate = new Date(utc + (3600000 * 8));
  
  const currentMinutes = witaDate.getHours() * 60 + witaDate.getMinutes();

  const prayers = [
    { name: 'Subuh', time: schedule.subuh },
    { name: 'Terbit', time: schedule.terbit },
    { name: 'Dzuhur', time: schedule.dzuhur },
    { name: 'Ashar', time: schedule.ashar },
    { name: 'Maghrib', time: schedule.maghrib },
    { name: 'Isya', time: schedule.isya },
  ];

  for (const prayer of prayers) {
    const [h, m] = prayer.time.split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > currentMinutes) {
      return {
        name: prayer.name,
        time: prayer.time,
        remainingMinutes: prayerMinutes - currentMinutes
      };
    }
  }

  // If past Isya, next prayer is Subuh tomorrow
  const [subuhH, subuhM] = schedule.subuh.split(':').map(Number);
  const subuhMinutesTomorrow = (24 * 60 - currentMinutes) + (subuhH * 60 + subuhM);
  return {
    name: 'Subuh (Besok)',
    time: schedule.subuh,
    remainingMinutes: subuhMinutesTomorrow
  };
}

export function formatRemainingTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) {
    return `${h} jam ${m} mnt lagi`;
  }
  return `${m} menit lagi`;
}
