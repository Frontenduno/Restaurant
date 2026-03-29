import { useState, useMemo } from "react";
import menuData from "../data/menu-data.json";
import type { Menu } from "../../types/index";

export function useInventario() {
  const [menuItems, setMenuItems] = useState<Menu[]>(
    menuData.menuItems as Menu[],
  );

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

  const itemSeleccionado = useMemo(
    () => menuItems.find((item) => item.id === idSeleccionado) || null,
    [idSeleccionado, menuItems],
  );

  const actualizarStock = (id: number, nuevoStock: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              estado: nuevoStock > 0,
              stock: nuevoStock,
            }
          : item,
      ),
    );
    setIdSeleccionado(null);
  };

  const itemsFiltrados = useMemo(() => {
    return menuItems.filter((item) => {
      const cumpleNombre = item.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const cumpleTipo =
        categoriaSeleccionada === "Todos" ||
        item.tipo.detalle.toLowerCase() === categoriaSeleccionada.toLowerCase();

      return cumpleNombre && cumpleTipo;
    });
  }, [menuItems, busqueda, categoriaSeleccionada]);

  const menuAgrupado = useMemo(() => {
    const grupos = itemsFiltrados.reduce(
      (acc, item) => {
        const categoriaId = item.categoria.id;
        if (!acc[categoriaId]) {
          acc[categoriaId] = [];
        }
        acc[categoriaId].push(item);
        return acc;
      },
      {} as Record<number, Menu[]>,
    );

    return Object.values(grupos);
  }, [itemsFiltrados]);

  return {
    menuItems: menuAgrupado,
    itemSeleccionado,
    setIdSeleccionado,
    actualizarStock,
    isDrawerOpen: idSeleccionado !== null,
    cerrarDrawer: () => setIdSeleccionado(null),
    // Filtros
    busqueda,
    setBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  };
}
