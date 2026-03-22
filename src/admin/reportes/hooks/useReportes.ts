import { useState, useRef, useEffect } from "react";
import type { FilterMode, QuickRange } from "../types";
import { todayStr, offsetDate, startOfWeek, startOfMonth } from "../lib/dateUtils";

export function useReportesFiltro() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedMode, setAppliedMode] = useState<FilterMode | null>(null);

  function handleApply(mode: FilterMode) {
    setAppliedMode(mode);
    setDrawerOpen(false);
  }

  return {
    drawerOpen,
    setDrawerOpen,
    appliedMode,
    handleApply,
  };
}

export function useFilterDrawer(open: boolean, onClose: () => void) {
  const [mode, setMode] = useState<FilterMode>("exact");
  const [exactDate, setExactDate] = useState(todayStr());
  const [fromDate, setFromDate] = useState(offsetDate(-7));
  const [toDate, setToDate] = useState(todayStr());

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const quickRanges: QuickRange[] = [
    { label: "Esta semana (Lun-Dom)", from: startOfWeek(), to: todayStr() },
    { label: "Últimos 7 días", from: offsetDate(-6), to: todayStr() },
    { label: "Este mes", from: startOfMonth(), to: todayStr() },
    { label: "Últimos 30 días", from: offsetDate(-29), to: todayStr() },
  ];

  return {
    mode,
    setMode,
    exactDate,
    setExactDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    drawerRef,
    quickRanges,
  };
}
