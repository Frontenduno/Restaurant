import type { comandaDetalle } from "../../../types";
import CardComandaPendiente from "./CardComandaPendiente";

interface Props {
  comandas: comandaDetalle[][];
  onTransferir: (id_comanda: number) => void;
  onAceptar: (id_comanda: number) => void;
}

function ListPendienteComanda({ comandas, onTransferir, onAceptar }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
      {comandas.map((item) => (
        <CardComandaPendiente
          key={item[0].id_comanda.id_comanda}
          comanda={item[0]}
          comandaDetalles={item}
          onAceptar={() => onAceptar(item[0].id_comanda.id_comanda)}
          onTransferir={() => onTransferir(item[0].id_comanda.id_comanda)}
        />
      ))}
    </div>
  );
}

export default ListPendienteComanda;
