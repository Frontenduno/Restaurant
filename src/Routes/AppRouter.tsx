import { Navigate, useRoutes } from "react-router-dom";
import { useAuth } from "@/auth";
import { getRolPath } from "@/data";
import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";
import { cajeroRoutes } from "./cajeroRoutes";
import { cocineroRoutes } from "./cocineroRoutes";
import { meseroRoutes } from "./meseroRoutes";
import { recepcionistaRoutes } from "./recepcionistaRoutes";

function RootRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-400 text-lg animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getRolPath(user.rol.nombre)} replace />;
}

export function AppRouter() {
  const routes = useRoutes([
    { path: "/", element: <RootRedirect /> },
    ...authRoutes,
    ...adminRoutes,
    ...cajeroRoutes,
    ...cocineroRoutes,
    ...meseroRoutes,
    ...recepcionistaRoutes,
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}
