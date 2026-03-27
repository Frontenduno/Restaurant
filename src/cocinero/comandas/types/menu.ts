type tipoMenu = "Plato" | "Bebida" | "Postre";

export interface menu {
  id_menu: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo: tipoMenu;
  categoria: string;
  imagen: string;
  estado: boolean;
}
