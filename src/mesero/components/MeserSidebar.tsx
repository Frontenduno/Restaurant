import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  UserSearch,
  BookSearch,
  BookOpen,
  LogOutIcon,
  UtensilsIcon
} from "lucide-react";

/*
  ============================================
  COMPONENTE: MeserSidebar — Navegación
  ============================================
  
  PROPÓSITO:
  Barra lateral de navegación para el mesero.
  
*/

const adminNavItems = [
  { title: "Mesas", path: "/mesero", icon: BookOpen, end: true },
  { title: "Comandas", path: "/mesero/comandas", icon: UserSearch },
  { title: "Historial", path: "/mesero/historial", icon: BookSearch }
];

export function MeserSidebar() {
  // Obtiene datos del usuario autenticado desde AuthContext
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Manejador de cierre de sesión
  function handleLogout() {
    logout(); // Limpia AuthContext
    navigate("/login", { replace: true }); // Redirecciona a login
  }

  // Obtiene las iniciales del nombre y apellido para el avatar
  const initials = `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();

  return (
    <Sidebar className="border-r border-neutral-100 bg-white text-neutral-700">

      {/* HEADER: Logo + Nombre del sistema + Rol del usuario */}
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D00FF] text-white shrink-0">
            <UtensilsIcon className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-widest text-neutral-800 uppercase">
              Restaurante
            </p>
            <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              {user.rol.nombre} {/* Muestra el rol: "Mesero" */}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENIDO: Menú de navegación */}
      <SidebarContent className="px-3">
        <SidebarMenu className="gap-1">
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <NavLink to={item.path} end={item.end}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    className="h-11 rounded-xl px-3 text-neutral-500 hover:bg-blue-50 hover:text-[#0D00FF] data-[active=true]:bg-blue-100 data-[active=true]:text-[#0D00FF] data-[active=true]:font-semibold transition-colors"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="ml-3 text-sm">{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER: Avatar del usuario + nombre + botón logout */}
      <SidebarFooter className="border-t border-neutral-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-[#0D00FF]">
            {initials}
          </div>
          <div className="flex-1 min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-neutral-800">
              {user.nombre} {user.apellido}
            </p>
            <p className="text-[11px] text-neutral-400">{user.rol.nombre}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
