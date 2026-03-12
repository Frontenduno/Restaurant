import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box, Users, CheckCircle, Map, Package, X } from "lucide-react";
import type { Mesa } from "./EditarMesaModal";

interface MesaInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mesa: Mesa | null;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function MesaInfoModal({ open, onOpenChange, mesa, onEditClick, onDeleteClick }: MesaInfoModalProps) {
  if (!mesa) return null;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-between items-center p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-[#0b0c2a]">Mesa {mesa.name}</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
        
        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1a1b3c]">Número de mesa</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Box className="w-5 h-5 text-[#1a1b3c]" />
                </div>
                <Input readOnly value={mesa.name} className="pl-10 bg-white border-slate-200 h-11 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1a1b3c]">Estado</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <CheckCircle className="w-5 h-5 text-[#1a1b3c]" />
                </div>
                <div className="flex items-center justify-between pl-10 pr-3 py-2 bg-white border border-slate-200 h-11 rounded-md opacity-70">
                   <span className="text-sm">{capitalize(mesa.status)}</span>
                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1a1b3c]">Capacidad</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Users className="w-5 h-5 text-[#1a1b3c]" />
                </div>
                <Input readOnly value={mesa.capacity} className="pl-10 bg-white border-slate-200 h-11 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1a1b3c]">Área</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Map className="w-5 h-5 text-[#1a1b3c]" />
                </div>
                <div className="flex items-center justify-between pl-10 pr-3 py-2 bg-white border border-slate-200 h-11 rounded-md opacity-70">
                   <span className="text-sm">{mesa.location}</span>
                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-xs font-semibold text-[#1a1b3c]">Tipo</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Package className="w-5 h-5 text-[#1a1b3c]" />
                </div>
                <div className="flex items-center justify-between pl-10 pr-3 py-2 bg-white border border-slate-200 h-11 rounded-md opacity-70">
                   <span className="text-sm">{mesa.shape === 'round' ? 'Redonda' : 'Rectangular'}</span>
                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </div>
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
