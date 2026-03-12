import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Check } from "lucide-react";

interface ConfirmacionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmacionModal({ open, onOpenChange }: ConfirmacionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[320px] p-0 overflow-hidden bg-[#f4f5f9] border-0 rounded-3xl">
        <div className="flex justify-end p-4 pb-0 items-center">
          <button onClick={() => onOpenChange(false)} className="text-[#0b0c2a] bg-[#e4e6f1] hover:bg-[#d3d6e5] p-1.5 rounded-xl transition-colors">
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
        
        <div className="px-6 pb-8 pt-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-[#0b0c2a] flex items-center justify-center mb-4">
             <Check className="w-8 h-8 text-[#0b0c2a]" strokeWidth={3} />
          </div>
          <p className="text-[#1a1b3c] font-semibold text-lg text-center">
            Eliminación completa!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
