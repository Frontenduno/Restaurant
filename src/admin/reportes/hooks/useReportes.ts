import { useState, useRef, useEffect } from "react";
import type { FilterMode, QuickRange } from "../types";
import {
  todayStr,
  offsetDate,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "../lib/dateUtils";

export function useReportesFiltro() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedMode, setAppliedMode] = useState<FilterMode | null>(null);
  const [appliedFrom, setAppliedFrom] = useState<string>("");
  const [appliedTo, setAppliedTo] = useState<string>("");
  const [appliedLabel, setAppliedLabel] = useState<string>("");

  function handleApply(mode: FilterMode, from: string, to: string, label: string) {
    setAppliedMode(mode);
    setAppliedFrom(from);
    setAppliedTo(to);
    setAppliedLabel(label);
    setDrawerOpen(false);
  }

  return {
    drawerOpen,
    setDrawerOpen,
    appliedMode,
    appliedFrom,
    appliedTo,
    appliedLabel,
    handleApply,
  };
}

export function useFilterDrawer(open: boolean, onClose: () => void) {
  const [mode, setMode] = useState<FilterMode>("exact");
  const [exactDate, setExactDate] = useState(todayStr());
  const [fromDate, setFromDate] = useState(offsetDate(-6));
  const [toDate, setToDate] = useState(todayStr());
  const [quickLabel, setQuickLabel] = useState<string>("");

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
    { label: "Esta semana (Lun-Dom)", from: startOfWeek(), to: endOfWeek() },
    { label: "Últimos 7 días",        from: offsetDate(-6),  to: todayStr() },
    { label: "Este mes",              from: startOfMonth(),  to: endOfMonth() },
    { label: "Últimos 30 días",       from: offsetDate(-29), to: todayStr() },
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
    quickLabel,
    setQuickLabel,
    drawerRef,
    quickRanges,
  };
}
