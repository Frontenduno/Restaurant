import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { DashboardPage } from "@/admin/dashboard/DashboardPage";
import { MapaMesasPage } from "@/admin/mapa-mesas/MapaMesasPage";
import { MenuPage } from "@/admin/menu/MenuPage";
import { UsuariosPage } from "@/admin/usuarios/UsuariosPage";
import { ReportesPage } from "@/admin/reportes/ReportesPage";
import { InventarioPage } from "@/admin/inventario/InventarioPage";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["Administrador"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "mapa-mesas", element: <MapaMesasPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "reportes", element: <ReportesPage /> },
      { path: "inventario", element: <InventarioPage /> },
    ],
  },
];
