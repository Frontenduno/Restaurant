export type FilterMode = "exact" | "range";

export interface DonutEntry {
  name: string;
  value: number;
  color: string;
}

export interface BarEntry {
  mes: string;
  ventas: number;
}

export interface RecentOrder {
  id: string;
  mesa: number;
  hora: string;
  total: number;
}

export interface QuickRange {
  label: string;
  from: string;
  to: string;
}

export interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (mode: FilterMode, from: string, to: string) => void;
}

export interface ChartPanelProps {
  title: string;
}
