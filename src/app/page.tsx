import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center space-y-6 border border-gray-100">
        {/* Ícono decorativo simple */}
        <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">
          🍽️
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Sistema de Restaurante
          </h1>
          <p className="text-gray-500 text-sm">
            Gestión de comandas, asignación de mesas y control de reservas.
          </p>
        </div>

        {/* Botón que actúa como puente temporal hacia tu módulo */}
        <div className="pt-4">
          <Link
            href="/recepcion"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
          >
            Ingresar al Sistema
          </Link>
        </div>

        {/* Nota futura para el módulo de Auth */}
        <p className="text-xs text-gray-400 mt-4">
          * El módulo de inicio de sesión se implementará aquí en el futuro.
        </p>
      </div>
    </main>
  );
}
