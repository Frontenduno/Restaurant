import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  MapPinIcon,
  UtensilsIcon,
  UsersIcon,
  BarChart3Icon,
  PackageIcon,
  LogOutIcon,
} from "lucide-react";

const adminNavItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboardIcon, end: true },
  { title: "Mapa de Mesas", path: "/admin/mapa-mesas", icon: MapPinIcon },
  { title: "Menú", path: "/admin/menu", icon: UtensilsIcon },
  { title: "Usuarios", path: "/admin/usuarios", icon: UsersIcon },
  { title: "Reportes", path: "/admin/reportes", icon: BarChart3Icon },
  { title: "Inventario", path: "/admin/inventario", icon: PackageIcon },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-neutral-800">
        <SidebarHeader className="border-b border-neutral-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍽️</span>
            <span className="text-lg font-bold text-sidebar-foreground">Restaurant</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      render={
                        <NavLink
                          to={item.path}
                          end={item.end}
                        />
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-neutral-800">
          <div className="flex flex-col gap-2 px-2 py-2">
            <div className="text-sm text-sidebar-foreground">
              <p className="font-medium">{user.nombre} {user.apellido}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-sidebar-foreground cursor-pointer"
            >
              <LogOutIcon className="size-4" />
              Cerrar Sesión
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-neutral-800 px-6">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm text-muted-foreground">{user.rol.nombre}</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
