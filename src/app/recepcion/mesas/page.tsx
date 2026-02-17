import GridMesas from "@/components/recepcion/mesas/grid-mesas";

export default function MesasPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Estado de Mesas</h2>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          🟢 Actualizado en tiempo real
        </span>
      </div>

      {/* Aquí inyectamos el componente que contiene todas tus tarjetas y lógica */}
      <GridMesas />
    </div>
  );
}
