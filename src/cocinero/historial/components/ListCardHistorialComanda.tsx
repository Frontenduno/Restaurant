import type { comandaDetalle } from "../../types/index";
import CardHistorialComanda from "./CardHistorialComanda";

interface ListHistorialComandaProps {
  comandas: comandaDetalle[][];
  onVerDetalle: (id_comanda: number) => void;
}

function ListHistorialComanda({
  comandas,
  onVerDetalle,
}: ListHistorialComandaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {comandas.map((grupo) => {
        const idComandaActual = grupo[0].id_comanda.id_comanda;

        return (
          <CardHistorialComanda
            key={idComandaActual}
            detalles={grupo}
            onVerDetalle={() => onVerDetalle(idComandaActual)}
          />
        );
      })}

      {/* Mensaje por si no hay historial para mostrar */}
      {comandas.length === 0 && (
        <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">
            No hay comandas registradas en el historial.
          </p>
        </div>
      )}
    </div>
  );
}

export default ListHistorialComanda;
