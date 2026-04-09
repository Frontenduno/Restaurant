import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Meserlayout } from "@/mesero/layout/Meserlayout";
import { MeseroPage } from "@/mesero/mesero/MeseroPage";
import { Comandas } from "@/mesero/comandas/Comanda";
import { Historial } from "@/mesero/historial/Historial";

export const meseroRoutes: RouteObject[] = [
  {
    path: "/mesero",
    element: (
      <ProtectedRoute allowedRoles={["Mesero"]}>
        <Meserlayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MeseroPage /> },
      { path: "comandas", element: <Comandas /> },
      { path: "historial", element: <Historial /> },
    ],
  },
];
