import { Header } from "@/components/Header";
import { Package } from "lucide-react";
import { useInventario } from "./hooks/useInventario";
import FiltroInventario from "./components/FiltroInventario";
import ListCardInventario from "./components/ListCardInventario";
import DrawerDetalleInventario from "./components/DrawerDetalleInventario";

function InventarioPage() {
  const {
    menuItems,
    setIdSeleccionado,
    itemSeleccionado,
    actualizarStock,
    cerrarDrawer,
    isDrawerOpen,
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  } = useInventario();
  return (
    <div>
      <Header title="Inventario" icon={Package} usuarioId="cocinero123" />
      <FiltroInventario
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />
      <ListCardInventario items={menuItems} onOpenModal={setIdSeleccionado} />

      {/* Drawer para detalles del inventario */}
      <DrawerDetalleInventario
        isOpen={isDrawerOpen}
        onClose={cerrarDrawer}
        item={itemSeleccionado}
        onActualizar={actualizarStock}
      />
    </div>
  );
}

export default InventarioPage;
