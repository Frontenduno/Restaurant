import { useState } from "react";
import CocineroHeader from "../components/CocineroHeader";
import { CalendarArrowUp } from "lucide-react";
import { useComanda } from "./hooks/useComanda";
import FiltroComanda from "./components/FiltroComanda";
import ListPendienteComanda from "./components/ComandaPendiente/ListPendienteComanda";

function ComandasPage() {
  const { comandaPendientes, comandaEnCocina } = useComanda();
  const [activeTab, setActiveTab] = useState("pendientes");
  return (
    <div>
      <CocineroHeader title="Comandas" icon={CalendarArrowUp} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">
            Gestión de Comandas
          </h2>
          <p className="text-neutral-400">
            Monitoreo y control de pedidos en tiempo real
          </p>
        </div>

        <div>
          <FiltroComanda
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            countPendientes={comandaPendientes.length}
            countCocina={comandaEnCocina.length}
          />
        </div>
      </div>
      {activeTab === "pendientes" ? (
        <ListPendienteComanda comandas={comandaPendientes} />
      ) : (
        <div>En Cocina</div>
      )}
    </div>
  );
}

export default ComandasPage;
