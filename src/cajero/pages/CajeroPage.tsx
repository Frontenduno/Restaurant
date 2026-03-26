import { useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CajeroPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">🍽️ Restaurant</h1>
            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 border-neutral-700">
              {user.rol.nombre}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">
              {user.nombre} {user.apellido}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Bienvenido, {user.nombre}
          </h2>
          <p className="text-neutral-400 mt-1">Panel de cajero</p>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">💰 Módulo de Caja</CardTitle>
            <CardDescription className="text-neutral-400">
              Este módulo está en construcción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-500 text-sm">
              Próximamente podrás gestionar cobros, cortes de caja y reportes de ventas.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
