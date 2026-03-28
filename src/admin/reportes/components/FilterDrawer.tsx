import { X, Calendar } from "lucide-react";
import { BarChart3Icon } from "lucide-react";
import type { FilterDrawerProps } from "../types";
import { useFilterDrawer } from "../hooks/useReportes";

export function FilterDrawer({ open, onClose, onApply }: FilterDrawerProps) {
  const {
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
  } = useFilterDrawer(open, onClose);

  if (!open) return null;

  function handleApply() {
    const label =
      mode === "exact"
        ? "Día exacto"
        : quickLabel || "Rango personalizado";
    onApply(
      mode,
      mode === "exact" ? exactDate : fromDate,
      mode === "exact" ? exactDate : toDate,
      label
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" />
      <div
        ref={drawerRef}
        className="relative w-[320px] h-full bg-white shadow-2xl flex flex-col"
        style={{ animation: "slideIn 0.2s ease-out" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <Calendar className="w-4 h-4" />
            Filtros
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMode("exact")}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "exact"
                  ? "border-[#1d14e0] bg-[#1d14e0] hover:bg-blue-800 text-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Día exacto
            </button>
            <button
              onClick={() => setMode("range")}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${mode === "range"
                  ? "border-[#1d14e0] bg-[#1d14e0] hover:bg-blue-800 text-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <BarChart3Icon className="w-3.5 h-3.5" />
              Rango
            </button>
          </div>

          {mode === "exact" && (
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Selecciona una fecha
              </label>
              <input
                type="date"
                value={exactDate}
                onChange={(e) => setExactDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a1f2e]/20 bg-white"
              />
            </div>
          )}

          {mode === "range" && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    Desde
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      setQuickLabel("");
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a1f2e]/20 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    Hasta
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                      setQuickLabel("");
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a1f2e]/20 bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  Rangos rápidos
                </label>
                <div className="flex flex-col gap-1.5">
                  {quickRanges.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => {
                        setFromDate(q.from);
                        setToDate(q.to);
                        setQuickLabel(q.label);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors text-left ${quickLabel === q.label
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 border-gray-100"
                        }`}
                    >
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleApply}
            className="w-full py-3 border-[#1d14e0] bg-[#1d14e0] hover:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Aplicar filtro
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
