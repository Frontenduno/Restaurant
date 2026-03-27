import type { comandaDetalle } from "../../types";
import CardComandaPendiente from "./CardComandaPendiente";

interface Props {
  comandas: comandaDetalle[];
}

function ListPendienteComanda({ comandas }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
      {comandas.map((item) => (
        <CardComandaPendiente
          key={item.id_detalle}
          comanda={item}
          comandaDetalles={comandas}
        />
      ))}
    </div>
  );
}

export default ListPendienteComanda;
