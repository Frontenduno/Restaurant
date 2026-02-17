'use client';

import { Mesa } from '@/types/recepcion';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';

interface ModalDetalleProps {
  mesa: Mesa | null;
  isOpen: boolean;
  onClose: () => void;
  onOcupar: (id: string) => void;
}

export default function ModalDetalle({ mesa, isOpen, onClose, onOcupar }: ModalDetalleProps) {
  if (!mesa) return null;

  const badgeVariants: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
    disponible: 'success',
    ocupada: 'danger',
    sucia: 'warning',
    reservada: 'info',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalles de ${mesa.nombre}`}>
      <div className="space-y-3 mb-6 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p><strong>Ubicación:</strong> {mesa.ubicacion}</p>
        <p><strong>Capacidad:</strong> {mesa.capacidad} personas</p>
        <div className="flex items-center gap-2">
          <strong>Estado Actual:</strong> 
          <Badge variant={badgeVariants[mesa.estado]}>{mesa.estado}</Badge>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onClose}>
          Cerrar
        </Button>
        {mesa.estado === 'disponible' && (
          <Button variant="primary" onClick={() => onOcupar(mesa.id)}>
            Ocupar Mesa
          </Button>
        )}
      </div>
    </Modal>
  );
}