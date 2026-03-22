import type { DonutEntry, BarEntry, RecentOrder } from "../types";

export const donutData: DonutEntry[] = [
  { name: "Chaufa", value: 420, color: "#EF4444" },
  { name: "Lomo saltado", value: 380, color: "#3B82F6" },
  { name: "Pure de papa", value: 310, color: "#EAB308" },
];

export const barData: BarEntry[] = [
  { mes: "Ene", ventas: 28000 },
  { mes: "Feb", ventas: 32000 },
  { mes: "Mar", ventas: 35000 },
  { mes: "Abr", ventas: 37000 },
  { mes: "May", ventas: 38500 },
  { mes: "Jun", ventas: 36000 },
  { mes: "Jul", ventas: 39000 },
  { mes: "Ago", ventas: 40000 },
  { mes: "Sep", ventas: 35500 },
  { mes: "Oct", ventas: 38000 },
  { mes: "Nov", ventas: 36800 },
  { mes: "Dic", ventas: 41000 },
];

export const recentOrders: RecentOrder[] = [
  { id: "1234", mesa: 5, hora: "10:30 a. m.", total: 120.0 },
  { id: "1235", mesa: 2, hora: "11:15 a. m.", total: 85.5 },
  { id: "1236", mesa: 8, hora: "12:00 p. m.", total: 240.0 },
  { id: "1237", mesa: 3, hora: "12:45 p. m.", total: 45.0 },
];
