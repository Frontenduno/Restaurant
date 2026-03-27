import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CocineroLayout } from "@/cocinero/layout/CocineroLayout";
import ComandasPage from "@/cocinero/comandas/ComandasPage";
import HistorialPage from "@/cocinero/historial/HistorialPage";
import InventarioPage from "@/cocinero/inventario/InventarioPage";

export const cocineroRoutes: RouteObject[] = [
  {
    path: "/cocinero",
    element: (
      <ProtectedRoute allowedRoles={["Cocinero"]}>
        <CocineroLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ComandasPage /> },
      { path: "historial", element: <HistorialPage /> },
      { path: "inventario", element: <InventarioPage /> },
    ],
  },
];
