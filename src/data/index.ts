import type { Area } from "@/types";
import type { Rol } from "@/types";
import type { User } from "@/types";
import areasJson from "./areas.json";
import rolesJson from "./roles.json";
import usersJson from "./users.json";

export const areas: Area[] = areasJson;
export const roles: Rol[] = rolesJson;

type UserWithPassword = User & { password: string };
export const users: UserWithPassword[] = usersJson;

export function getAreaById(id: number): Area | undefined {
  return areas.find((a) => a.id === id);
}

export function getRolById(id: number): Rol | undefined {
  return roles.find((r) => r.id === id);
}

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
