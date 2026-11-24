/**
 * Calcula em tempo real o status de funcionamento do Café Mor
 * usando o fuso oficial de Goiânia (America/Sao_Paulo) e os horários do JSON.
 */
const SCHEDULE_BY_WEEKDAY = {
  0: { dayName: 'domingo', open: 10 * 60, close: 18 * 60, label: '10:00 - 18:00' },
  1: { dayName: 'segunda-feira', open: null, close: null, label: 'Fechado' },
  2: { dayName: 'terça-feira', open: 9 * 60 + 30, close: 18 * 60, label: '09:30 - 18:00' },
  3: { dayName: 'quarta-feira', open: 9 * 60 + 30, close: 18 * 60, label: '09:30 - 18:00' },
  4: { dayName: 'quinta-feira', open: 9 * 60 + 30, close: 18 * 60, label: '09:30 - 18:00' },
  5: { dayName: 'sexta-feira', open: 9 * 60 + 30, close: 18 * 60, label: '09:30 - 18:00' },
  6: { dayName: 'sábado', open: 9 * 60, close: 18 * 60, label: '09:00 - 18:00' },
};

export function getGoianiaLiveStatus(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);

    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const weekdayToken = parts.find((p) => p.type === 'weekday')?.value || 'Tue';
    const hour = Number(parts.find((p) => p.type === 'hour')?.value || 12);
    const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0);

    const dayIndex = weekdayMap[weekdayToken] ?? 2;
    const currentMinutes = (hour === 24 ? 0 : hour) * 60 + minute;
    const todayRule = SCHEDULE_BY_WEEKDAY[dayIndex];

    if (todayRule.open !== null && currentMinutes >= todayRule.open && currentMinutes < todayRule.close) {
      const minutesLeft = todayRule.close - currentMinutes;
      return {
        isOpen: true,
        dayIndex,
        badge: 'Aberto agora',
        detail: minutesLeft <= 60 ? 'Encerra às 18:00 · Últimos pedidos' : `Hoje até 18:00`,
      };
    }

    if (todayRule.open !== null && currentMinutes < todayRule.open) {
      const openHour = String(Math.floor(todayRule.open / 60)).padStart(2, '0');
      const openMin = String(todayRule.open % 60).padStart(2, '0');
      return {
        isOpen: false,
        dayIndex,
        badge: 'Abre hoje',
        detail: `Hoje às ${openHour}:${openMin}`,
      };
    }

    // Procura o próximo dia de abertura
    for (let offset = 1; offset <= 7; offset += 1) {
      const nextIndex = (dayIndex + offset) % 7;
      const nextRule = SCHEDULE_BY_WEEKDAY[nextIndex];
      if (nextRule.open !== null) {
        const openHour = String(Math.floor(nextRule.open / 60)).padStart(2, '0');
        const openMin = String(nextRule.open % 60).padStart(2, '0');
        const prefix = offset === 1 ? 'Abre amanhã' : `Abre ${nextRule.dayName}`;
        return {
          isOpen: false,
          dayIndex,
          badge: 'Fechado no momento',
          detail: `${prefix} às ${openHour}:${openMin}`,
        };
      }
    }
  } catch {
    // Fallback seguro para os dados estáticos do JSON
  }

  return {
    isOpen: true,
    dayIndex: 2,
    badge: 'Aberto',
    detail: 'Ter a Sex, 09:30 - 18:00',
  };
}
