export interface user {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: rol;
}

interface rol {
  id_rol: number;
  nombre: string;
  area: area_usuario;
}

interface area_usuario {
  id_area: number;
  nombre: string;
}
