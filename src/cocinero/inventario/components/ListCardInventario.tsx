import type { Menu } from "../../types/index";
import CardInventario from "./CardInventario";

interface ListInventarioProps {
  items: Menu[][];
  onOpenModal: (id: number) => void;
}

function ListCardInventario({ items, onOpenModal }: ListInventarioProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {items.map((grupo) =>
        grupo.map((item) => (
          <CardInventario
            key={item.id}
            item={item}
            onOpenModal={() => onOpenModal(item.id)}
          />
        )),
      )}

      {/* Mensaje de estado vacío */}
      {items.length === 0 && (
        <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">
            No se encontraron productos en el inventario con los filtros
            aplicados.
          </p>
        </div>
      )}
    </div>
  );
}

export default ListCardInventario;
