import type { DonutEntry, RecentOrder } from "../types";
import reportesData from "../data/reportes.json";

const chartColors = ["#EF4444", "#3B82F6", "#EAB308", "#10B981", "#8B5CF6"];

export const donutData: DonutEntry[] = reportesData.platillosPopulares.slice(0, 5).map((platillo, index) => ({
  name: platillo.nombre,
  value: platillo.cantidadVendida,
  color: chartColors[index % chartColors.length],
}));

export const recentOrders: RecentOrder[] = reportesData.pedidosRecientes.map((pedido) => ({
  id: pedido.id,
  mesa: pedido.mesa,
  hora: pedido.hora,
  total: pedido.total,
}));
