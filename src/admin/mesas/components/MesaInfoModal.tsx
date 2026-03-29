import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box, Users, CheckCircle, Map, Package, X } from "lucide-react";
import type { Mesa } from "@/types";

interface MesaInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa: (Mesa & { cliente?: string }) | null;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function MesaInfoModal({ open, onOpenChange, mesa, onEditClick, onDeleteClick }: MesaInfoModalProps) {
  if (!mesa) return null;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const InfoField = ({ label, icon: Icon, children }: { label: string, icon: any, children: React.ReactNode }) => (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#1a1b3c]">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Icon className="w-5 h-5 text-[#1a1b3c]" />
        </div>
        {children}
      </div>
    </div>
  );

  const SelectMockView = ({ value }: { value: string }) => (
    <div className="flex items-center justify-between pl-10 pr-3 py-2 bg-white border border-slate-200 h-11 rounded-md opacity-70">
      <span className="text-sm">{value}</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4 opacity-50">
        <path d="M3.135 6.158c.189-.201.505-.211.707-.023L7.5 9.565l3.658-3.43c.201-.188.517-.178.707.023.189.201.179.518-.023.707L7.842 10.615c-.192.18-.491.18-.684 0L3.158 6.865c-.201-.189-.211-.506-.023-.707z" fill="currentColor" />
      </svg>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-150 p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-between items-center p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">Mesa {mesa.name}</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-3" />
          </button>
        </div>
        
        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <InfoField label="Número de mesa" icon={Box}>
              <Input readOnly value={mesa.name} className="pl-10 bg-white border-slate-200 h-11 pointer-events-none" />
            </InfoField>

            <InfoField label="Estado" icon={CheckCircle}>
              <SelectMockView value={capitalize(mesa.status.detalle)} />
            </InfoField>

            <InfoField label="Capacidad" icon={Users}>
              <Input readOnly value={mesa.capacity} className="pl-10 bg-white border-slate-200 h-11 pointer-events-none" />
            </InfoField>

            <InfoField label="Área" icon={Map}>
              <SelectMockView value={mesa.location.detalle} />
            </InfoField>

            <InfoField label="Tipo" icon={Package}>
              <SelectMockView value={mesa.shape.detalle.toLowerCase() === 'redonda' ? 'Redonda' : 'Rectangular'} />
            </InfoField>

            {mesa.cliente && (
              <div className="md:col-span-2 bg-[#EEF2FF] p-4 rounded-xl border border-[#C7D2FE] flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Cliente Actual</p>
                  <p className="text-lg font-extrabold text-blue-900 italic">👤 {mesa.cliente}</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <span className="text-xs font-bold text-blue-700">Reserva Activa</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] hover:text-white text-base px-8 h-12 rounded-full" onClick={() => {
            onOpenChange(false);
            onDeleteClick();
          }}>
            Eliminar
          </Button>
          <Button className="bg-[#0b0c2a] text-white border-0 hover:bg-[#1a1b3c] text-base px-8 h-12 rounded-full" onClick={() => {
            onOpenChange(false);
            onEditClick();
          }}>
            Editar
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
