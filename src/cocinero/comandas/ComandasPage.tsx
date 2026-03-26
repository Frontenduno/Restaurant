import CocineroHeader from "../components/CocineroHeader";
import { CalendarArrowUp } from "lucide-react";
import FiltroComanda from "./components/FiltroComanda";
import CardComandaPendiente from "./components/CardComandaPendiente";
import CardComandaEnCocina from "./components/CardComandaEnCocina";

function ComandasPage() {
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
          <FiltroComanda />
        </div>
      </div>
      <CardComandaPendiente />
      <CardComandaEnCocina />
    </div>
  );
}

export default ComandasPage;
