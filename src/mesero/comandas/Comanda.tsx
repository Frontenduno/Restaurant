import { useState, useEffect } from "react";
import { MeserHeader } from "../components/MeserHeader";
import {
    Trash2,
    Eye,
    Clock,
    ShoppingBasket,
    ChartNetwork
} from "lucide-react";
import { useMeser } from "@/mesero/mesero/hooks/useMeser";
import { useAuth } from "@/auth/hooks/useAuth";
import { ModalMesa } from "@/mesero/mesero/components/Modalmesa";

// =============================================================================
// I. CONFIGURACIÓN DE FASES
// =============================================================================

const FASE_CONFIG = {
    confirmacion: {
        titulo: "Pendiente",
        icono: "⌛",
        // Badge
        badgeBg: "bg-[#FEF3C7]",
        badgeText: "text-[#B45309]",
        badgeBorder: "border border-[#FDE68A]",
        // Borde lateral izquierdo de la tarjeta
        cardBorderLeft: "border-l-[#F59E0B]",
        // Fondo suave de la tarjeta
        cardBg: "bg-[#FFFBEB]",
        // Borde exterior de la tarjeta
        cardBorder: "border-[#FDE68A]",
    },
    confirmado: {
        titulo: "Confirmado",
        icono: "✅",
        badgeBg: "bg-[#DBEAFE]",
        badgeText: "text-[#1D4ED8]",
        badgeBorder: "border border-[#BFDBFE]",
        cardBorderLeft: "border-l-[#3B82F6]",
        cardBg: "bg-[#F0F7FF]",
        cardBorder: "border-[#BFDBFE]",
    },
    cocina: {
        titulo: "En cocina",
        icono: "👨‍🍳",
        badgeBg: "bg-[#F3E8FF]",
        badgeText: "text-[#7E22CE]",
        badgeBorder: "border border-[#E9D5FF]",
        cardBorderLeft: "border-l-[#A855F7]",
        cardBg: "bg-[#FAF5FF]",
        cardBorder: "border-[#E9D5FF]",
    },
    listo: {
        titulo: "Listo",
        icono: "🍽️",
        badgeBg: "bg-[#DCFCE7]",
        badgeText: "text-[#15803D]",
        badgeBorder: "border border-[#BBF7D0]",
        cardBorderLeft: "border-l-[#22C55E]",
        cardBg: "bg-[#F0FDF4]",
        cardBorder: "border-[#BBF7D0]",
    },
} as const;

type Fase = keyof typeof FASE_CONFIG;

// =============================================================================
// II. ITEM TAGS  (chips azules)
// =============================================================================

function ItemTags({ items }: { items: any[] }) {
    return (
        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
            {items.map((it: any, i: number) => (
                <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-md px-2 py-0.5 text-[11px] font-semibold"
                >
                    <span className="font-extrabold text-[#1D4ED8]">{it.cantidad}×</span>
                    {it.nombre || it.nm}
                    {it.nota && (
                        <span className="text-[#F59E0B] font-bold ml-0.5">· {it.nota}</span>
                    )}
                </span>
            ))}
        </div>
    );
}

// =============================================================================
// III. BARRA DE PROGRESO (fondo oscuro, igual a la imagen)
// =============================================================================

function ProgressLine({ pct }: { pct: number }) {
    const barColor =
        pct >= 100 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#EF4444";

    return (
        <div className="mt-2 mb-3">
            <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
                    Progreso cocina
                </span>
                <span className="text-[11px] font-black" style={{ color: barColor }}>
                    {Math.floor(pct)}%
                </span>
            </div>
            <div className="h-[6px] w-full bg-[#1E293B] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                />
            </div>
        </div>
    );
}

// =============================================================================
// IV. TARJETA DE COMANDA
// =============================================================================

interface ComandaCardProps {
    mesa: any;
    onAction: (mesa: any, view: string) => void;
    onFaseChange: (mesaId: number, fase: string) => void;
}

function ComandaCard({ mesa, onAction, onFaseChange }: ComandaCardProps) {
    const fase = (mesa.fase || "confirmacion") as Fase;
    const cfg = FASE_CONFIG[fase];
    const total = (mesa.comanda || []).reduce(
        (sum: number, it: any) => sum + it.precio * it.cantidad,
        0
    );

    return (
        <div
            className={`
                w-full rounded-xl border border-l-4
                ${cfg.cardBg} ${cfg.cardBorder} ${cfg.cardBorderLeft}
                px-4 pt-3.5 pb-3.5 shadow-sm
            `}
        >
            {/* ── Cabecera ── */}
            <div className="flex items-start justify-between gap-2 mb-0.5">
                <div>
                    <h3 className="text-[15px] font-bold text-gray-800 leading-tight">
                        Mesa {mesa.id}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium mt-0.5">
                        <Clock size={11} className="opacity-60" />
                        <span>
                            {mesa.hora || "13:00"} · {mesa.capacity} personas ·{" "}
                            {mesa.location?.detalle}
                        </span>
                    </div>
                </div>

                {/* Badge estado */}
                <span
                    className={`
                        flex items-center gap-1 px-2.5 py-1 rounded-lg
                        text-[10px] font-bold uppercase tracking-wide shrink-0
                        ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}
                    `}
                >
                    {cfg.icono} {cfg.titulo}
                </span>
            </div>

            {/* ── Tags de platos ── */}
            <ItemTags items={mesa.comanda || []} />

            {/* ── Barra de progreso (confirmado + cocina) ── */}
            {(fase === "confirmado" || fase === "cocina") && (
                <ProgressLine pct={mesa.pct || 0} />
            )}

            {/* ── Fila totales ── */}
            <div className="flex items-center justify-between pt-2 pb-2.5 border-t border-white/60">
                <span className="text-[11px] text-gray-400 font-medium">
                    {(mesa.comanda || []).length} platos
                </span>
                <span className="text-[15px] font-black text-[#2563EB]">
                    S/ {total.toFixed(2)}
                </span>
            </div>

            {/* ── Acciones ── */}

            {/* PENDIENTE */}
            {fase === "confirmacion" && (
                <div className="flex gap-2 mt-1">
                    <button
                        onClick={() => onAction(mesa, "revisar")}
                        className="flex-1 h-9 bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#FFEDD5] transition-colors"
                    >
                        <Eye size={13} />
                        Revisar con cliente
                    </button>

                    <button
                        onClick={() => onAction(mesa, "comanda")}
                        className="px-3.5 h-9 bg-white border border-gray-200 text-gray-500 rounded-lg text-[11px] font-semibold hover:bg-gray-50 transition-colors"
                    >
                        + Agregar
                    </button>

                    <button
                        onClick={() => onAction(mesa, "cancelar")}
                        className="w-9 h-9 bg-[#FEF2F2] border border-[#FECACA] text-red-400 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            {/* CONFIRMADO */}
            {fase === "confirmado" && (
                <button
                    onClick={() => onFaseChange(mesa.id, "cocina")}
                    className="w-full h-11 bg-[#3461FF] hover:bg-[#2452E8] text-white rounded-lg text-[12px] font-bold uppercase tracking-[0.08em] flex items-center justify-center gap-2 transition-colors mt-1"
                >
                    👨‍🍳 Enviar a cocina
                </button>
            )}

            {/* COCINA y LISTO — sin botones */}
        </div>
    );
}

// =============================================================================
// V. CABECERA DE SECCIÓN  (icono + título + línea)
// =============================================================================

function SectionHeader({ icon, title }: { icon: string; title: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <span className="text-[12px] border border-gray-200 bg-white rounded-md px-1.5 py-0.5 leading-none">
                {icon}
            </span>
            <span className="text-[12px] font-black text-gray-500 uppercase tracking-widest">
                {title}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
        </div>
    );
}

// =============================================================================
// VI. COMPONENTE PRINCIPAL
// =============================================================================

export function Comandas() {
    const { user } = useAuth();
    const areaDelMesero = user?.area?.nombre;
    const { mesas, updateMesaFase, updateMesaComanda, updateMesaProgress } =
        useMeser(areaDelMesero);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMesaId, setSelectedMesaId] = useState<number | null>(null);
    const [modalView, setModalView] = useState<"comanda" | "revisar" | "cancelar">("comanda");

    // Simulación de progreso de cocina (15 s)
    useEffect(() => {
        const timer = setInterval(() => {
            mesas.forEach((mesa: any) => {
                if (mesa.fase === "cocina" && mesa.cookStartTime) {
                    const elapsed = Date.now() - parseInt(mesa.cookStartTime);
                    const newPct = Math.min(100, (elapsed / 15000) * 100);
                    if (newPct >= 100 && mesa.pct < 100) {
                        updateMesaFase(mesa.id, "listo");
                    } else if (newPct > mesa.pct) {
                        updateMesaProgress(mesa.id, newPct);
                    }
                }
            });
        }, 500);
        return () => clearInterval(timer);
    }, [mesas, updateMesaFase, updateMesaProgress]);

    const comandasActivas = mesas.filter(
        (m: any) =>
            (m.comanda && m.comanda.length > 0) ||
            m.status?.detalle?.toLowerCase() === "ocupado"
    );

    const mesaActual = selectedMesaId
        ? mesas.find((m: any) => m.id === selectedMesaId)
        : null;

    // Secciones en orden
    const sections: { id: Fase; items: any[] }[] = [
        {
            id: "confirmacion",
            items: comandasActivas.filter(
                (m: any) => !m.fase || m.fase === "confirmacion"
            ),
        },
        {
            id: "confirmado",
            items: comandasActivas.filter((m: any) => m.fase === "confirmado"),
        },
        {
            id: "cocina",
            items: comandasActivas.filter((m: any) => m.fase === "cocina"),
        },
        {
            id: "listo",
            items: comandasActivas.filter((m: any) => m.fase === "listo"),
        },
    ];

    const handleAction = (mesa: any, view: string) => {
        setSelectedMesaId(mesa.id);
        setModalView(view as any);
        setIsModalOpen(true);
    };

    const handleSaveComanda = (items: any[], newFase?: string) => {
        if (!selectedMesaId) return;
        updateMesaComanda(selectedMesaId, items);
        if (newFase) updateMesaFase(selectedMesaId, newFase);
        setIsModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col font-sans h-full">
            {/* Header global "Mesero" */}
            <MeserHeader title="Mesero" icon={ChartNetwork} />

            <div className="px-2">
                {/* Título de sección */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-[28px] font-semibold text-gray-800 leading-tight">
                            Comandas
                        </h2>
                        <p className="text-[15px] text-gray-400 mt-0.5">
                            Gestiona, confirma y envía pedidos a cocina
                    </p>
                    </div>
                </div>

                {/* Lista de secciones */}
                <div className="flex flex-col gap-4 mt-2">
                    {sections.map((sec) => {
                        if (!sec.items.length) return null;
                        const cfg = FASE_CONFIG[sec.id];
                        return (
                            <div key={sec.id}>
                                <SectionHeader icon={cfg.icono} title={cfg.titulo} />
                                <div className="flex flex-col gap-3">
                                    {sec.items.map((mesa: any) => (
                                        <ComandaCard
                                            key={mesa.id}
                                            mesa={mesa}
                                            onAction={handleAction}
                                            onFaseChange={updateMesaFase}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Sin comandas */}
                    {comandasActivas.length === 0 && (
                        <div className="text-center py-20 text-gray-300">
                            <ShoppingBasket size={56} className="mx-auto mb-3" />
                            <p className="font-black uppercase tracking-widest text-[16px]">
                                Sin comandas activas
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && mesaActual && (
                <ModalMesa
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mesaName={`Mesa ${mesaActual.id}`}
                    initialItems={mesaActual.comanda || []}
                    onSave={handleSaveComanda}
                    viewMode={modalView}
                />
            )}
        </div>
    );
}