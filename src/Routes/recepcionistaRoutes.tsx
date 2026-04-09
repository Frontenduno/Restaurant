import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Receplayout } from "@/recepcionista/layout/Receplayout";
import { RecepcionistaPage } from "@/recepcionista/pages/RecepcionistaPage";
import { MeserDispo } from "@/recepcionista/Meseros/MeserDispo";
import { Reservas } from "@/recepcionista/reservas/Reservas";

export const recepcionistaRoutes: RouteObject[] = [
  {
    path: "/recepcionista",
    element: (
      <ProtectedRoute allowedRoles={["Recepcionista"]}>
        <Receplayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <RecepcionistaPage /> },
      // Aquí irán las otras páginas como:
      { path: "meseros", element: <MeserDispo /> },
      { path: "reservas", element: <Reservas /> },
    ],
  },
];
