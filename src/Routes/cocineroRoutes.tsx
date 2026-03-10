import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CocineroPage } from "@/cocinero/pages/CocineroPage";

export const cocineroRoutes: RouteObject[] = [
  {
    path: "/cocinero",
    element: (
      <ProtectedRoute allowedRoles={["Cocinero"]}>
        <CocineroPage />
      </ProtectedRoute>
    ),
  },
];
