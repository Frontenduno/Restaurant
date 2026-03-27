import type { comandaDetalle } from "../../types";
import CardComandaEnCocina from "./CardComandaEnCocina";

interface Props {
  comandas: comandaDetalle[][];
  onVerDetalle: (id_comanda: number) => void;
  onListo: (id_comanda: number) => void;
}

function ListEnCocinaComanda({ comandas, onVerDetalle, onListo }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 ">
      {comandas.map((item) => (
        <CardComandaEnCocina
          key={item[0].id_comanda.id_comanda}
          detalles={item}
          onVerDetalle={() => onVerDetalle(item[0].id_comanda.id_comanda)}
          onListo={() => onListo(item[0].id_comanda.id_comanda)}
        />
      ))}
    </div>
  );
}

export default ListEnCocinaComanda;
