import { useState, useCallback } from "react";
import { ClockArrowUp } from "lucide-react";
import { Header } from "@/components/Header";
import { useHistorial } from "./hooks/useHistorial";
import { SummaryCards } from "./components/SummaryCards";
import { IncomeChart } from "./components/IncomeChart";
import { ActionButtons } from "./components/ActionButtons";
import { HistoryList } from "./components/HistoryList";
import { CajaInfo } from "../solicitud/components/CajaInfo";
import { CerrarCajaModal } from "./components/CerrarCajaModal";
import { AgregarFondosModal } from "./components/AgregarFondosModal";
import { DetalleComprobanteSheet } from "./components/DetalleComprobanteSheet";
import type { ComprobanteHistorial } from "./types";

export function HistorialCajero() {
  const { metricas, grupos, ingresosPorHora, resumenComprobantes, isLoading } = useHistorial();

  const [openCerrarCaja, setOpenCerrarCaja] = useState(false);
  const [openAgregarFondos, setOpenAgregarFondos] = useState(false);
  const [selectedComprobante, setSelectedComprobante] = useState<ComprobanteHistorial | null>(null);

  const handleOpenAgregarFondos = useCallback(() => setOpenAgregarFondos(true), []);
  const handleOpenCerrarCaja = useCallback(() => setOpenCerrarCaja(true), []);
  const handleCloseAgregarFondos = useCallback(() => setOpenAgregarFondos(false), []);
  const handleCloseCerrarCaja = useCallback(() => setOpenCerrarCaja(false), []);
  const handleCloseSheet = useCallback(() => setSelectedComprobante(null), []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col font-sans h-full">
        <Header title="Historial" icon={<ClockArrowUp className="w-6 h-6 text-black" />} usuarioId="cajero123" />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </div>
    );
  }

  if (!metricas) return null;

  return (
    <div className="w-full flex flex-col font-sans h-full">
      <Header title="Historial" icon={<ClockArrowUp className="w-6 h-6 text-black" />} usuarioId="cajero123" />

      {/* Título + Caja */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">Historial</h2>
          <p className="text-[15px] mt-1 text-gray-500">
            Pedidos cobrados del día - selecciona para ver el comprobante
          </p>
        </div>
        <CajaInfo />
      </div>

      <SummaryCards data={metricas} />
      <IncomeChart data={ingresosPorHora} />

      <ActionButtons
        onAgregarFondos={handleOpenAgregarFondos}
        onCerrarCaja={handleOpenCerrarCaja}
      />

      <HistoryList
        grupos={grupos}
        onSelectComprobante={setSelectedComprobante}
      />

      <CerrarCajaModal
        open={openCerrarCaja}
        onClose={handleCloseCerrarCaja}
        metricas={metricas}
        resumenComprobantes={resumenComprobantes}
      />

      <AgregarFondosModal
        open={openAgregarFondos}
        onClose={handleCloseAgregarFondos}
        montoActual={metricas.totalEnCaja}
      />

      <DetalleComprobanteSheet
        open={!!selectedComprobante}
        onClose={handleCloseSheet}
        comprobante={selectedComprobante}
      />
    </div>
  );
}

