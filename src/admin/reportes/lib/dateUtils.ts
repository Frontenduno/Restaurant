function toLocalStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayStr(): string {
  return toLocalStr(new Date());
}
export function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toLocalStr(d);
}

export function startOfWeek(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return toLocalStr(d);
}

export function endOfWeek(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return toLocalStr(d);
}

export function startOfMonth(): string {
  const d = new Date();
  d.setDate(1);
  return toLocalStr(d);
}

export function endOfMonth(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 0);
  return toLocalStr(d);
}
