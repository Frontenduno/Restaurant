import type { Area } from "@/types";
import type { Rol } from "@/types";
import type { User } from "@/types";
import areasJson from "./usuario/areas.json";
import rolesJson from "./usuario/roles.json";
import usersJson from "./usuario/users.json";

export const areas: Area[] = areasJson;
export const roles: Rol[] = rolesJson;

type UserWithPassword = User & { password: string };
export const users: UserWithPassword[] = usersJson;

export function getRolPath(rolNombre: string): string {
  const paths: Record<string, string> = {
    Administrador: "/admin",
    Cajero: "/cajero",
    Cocinero: "/cocinero",
    Mesero: "/mesero",
    Recepcionista: "/recepcionista",
  };
  return paths[rolNombre] ?? "/login";
}
