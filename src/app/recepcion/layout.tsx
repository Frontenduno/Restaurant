import Link from 'next/link';

export default function RecepcionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra de Navegación Superior */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Panel de Recepción</h1>
        <nav className="flex gap-4">
          <Link 
            href="/recepcion/mesas" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-700 transition"
          >
            Mesas
          </Link>
          <Link 
            href="/recepcion/reservas" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-700 transition"
          >
            Reservas
          </Link>
        </nav>
      </header>

      {/* Aquí se renderizarán las páginas de Mesas o Reservas */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}