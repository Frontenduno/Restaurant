import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  TableIcon,
  UtensilsIcon,
  UsersIcon,
  BarChart3Icon,
  PackageIcon,
} from "lucide-react";

const adminNavItems = [
  { title: "Panel", path: "/admin/panel", icon: LayoutDashboardIcon },
  { title: "Mesas", path: "/admin/mesas", icon: TableIcon },
  { title: "Menú", path: "/admin/menu", icon: UtensilsIcon },
  { title: "Usuarios", path: "/admin/usuarios", icon: UsersIcon },
  { title: "Informes", path: "/admin/informes", icon: BarChart3Icon },
  { title: "Inventario", path: "/admin/inventario", icon: PackageIcon },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r border-neutral-100 bg-white text-neutral-700">
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D00FF] text-white">
            <UtensilsIcon className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold uppercase tracking-widest text-neutral-800">
              Restaurante
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
              Administrador
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="gap-1">
          {adminNavItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => navigate(item.path)}
                  className="h-11 rounded-xl px-3 text-neutral-500 transition-colors hover:bg-blue-50 hover:text-[#0D00FF] cursor-pointer data-[active=true]:bg-blue-100 data-[active=true]:font-semibold data-[active=true]:text-[#0D00FF]"
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="ml-3 text-sm">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

