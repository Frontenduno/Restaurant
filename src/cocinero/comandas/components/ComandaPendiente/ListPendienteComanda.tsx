import type { comandaDetalle } from "../../types";
import CardComandaPendiente from "./CardComandaPendiente";

interface Props {
  comandas: comandaDetalle[];
}

function ListPendienteComanda({ comandas }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 justify-items-center w-full mx-auto p-2">
      {comandas.map((item) => (
        <CardComandaPendiente key={item.id_detalle} comanda={item} />
      ))}
    </div>
  );
}

export default ListPendienteComanda;
