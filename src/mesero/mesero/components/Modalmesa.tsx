import { useState, useEffect } from "react";
import { X, Plus, Minus, ClipboardCheck, AlertTriangle, Printer } from "lucide-react";
import menuData from "@/admin/menu/data/menu-data.json";

interface ModalMesaProps {
    isOpen: boolean;
    onClose: () => void;
    mesaName: string;
    onSave: (comanda: any[], newFase?: string) => void;
    onCancelComanda?: () => void;
    initialItems?: any[];
    viewMode?: "comanda" | "revisar" | "cancelar" | "precuenta";
    meseroName?: string;
    hora?: string;
}

export function ModalMesa({
    isOpen,
    onClose,
    mesaName,
    onSave,
    onCancelComanda,
    initialItems = [],
    viewMode: initialView = "comanda",
    meseroName = "Carlos M.",
    hora = "13:45"
}: ModalMesaProps) {
    const [view, setView] = useState<"comanda" | "revisar" | "cancelar" | "precuenta">(initialView);
    const [tabActiva, setTabActiva] = useState(1);
    const [busqueda] = useState("");
    const [carrito, setCarrito] = useState<any[]>(initialItems);
    const [itemSeleccionado, setItemSeleccionado] = useState<any | null>(null);
    const [cantidad, setCantidad] = useState(1);
    const [nota, setNota] = useState("");
    const [segundosCancel, setSegundosCancel] = useState(800); // 800 * 10ms = 8s

    useEffect(() => {
        setView(initialView);
        if (initialView === "comanda" || initialView === "precuenta") setCarrito(initialItems);
    }, [initialView, isOpen, initialItems]);

    useEffect(() => {
        let timer: any;
        if (view === "cancelar" && segundosCancel > 0) {
            timer = setInterval(() => setSegundosCancel(prev => prev - 1), 10);
        }
        return () => clearInterval(timer);
    }, [view, segundosCancel]);

    if (!isOpen) return null;

    const itemsFiltrados = menuData.menuItems.filter(item =>
        item.tipo.id === (tabActiva === 4 ? 2 : tabActiva === 3 ? 3 : tabActiva === 1 ? 4 : (tabActiva === 2 ? 1 : 4)) &&
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        item.estado
    );

    const agregarAlCarrito = () => {
        if (!itemSeleccionado) return;
        const nuevoItem = {
            ...itemSeleccionado,
            cantidad,
            nota,
            key: Date.now()
        };
        setCarrito([...carrito, nuevoItem]);
        setItemSeleccionado(null);
        setCantidad(1);
        setNota("");
    };

    const eliminarDelCarrito = (key: number) => {
        setCarrito(carrito.filter(it => it.key !== key));
    };

    const subtotal = carrito.reduce((sum, it) => sum + (it.precio * it.cantidad), 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    /* ────────────── VISTA: PRE-CUENTA ────────────── */
    if (view === "precuenta") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-[420px] rounded-[2.5rem] shadow-2xl flex flex-col border-4 border-blue-50/50 overflow-hidden">
                    {/* Contenido del Ticket */}
                    <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                        {/* Header Ticket */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-2xl">🍽️</span>
                                <h1 className="text-xl font-black text-[#0b0c2a] tracking-tight">RESTAURANTE</h1>
                            </div>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Jr. Lima 123 · Tel. 01-234-5678</p>
                            
                            <div className="mt-4 inline-block bg-orange-50 text-orange-600 px-6 py-1.5 rounded-full border border-orange-100 text-xs font-black uppercase tracking-widest">
                                Pre-Cuenta
                            </div>
                        </div>

                        {/* Divider Dotted */}
                        <div className="border-t-2 border-dotted border-gray-100 mb-6" />

                        {/* Info General */}
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">Mesa</span>
                                <span className="text-[#0b0c2a] font-black">{mesaName}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">Mesero</span>
                                <span className="text-[#0b0c2a] font-black">{meseroName}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">Hora</span>
                                <span className="text-[#0b0c2a] font-black">{hora}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">Personas</span>
                                <span className="text-[#0b0c2a] font-black">{carrito.length > 0 ? "4" : "0"}</span>
                            </div>
                        </div>

                        {/* Divider Dotted */}
                        <div className="border-t-2 border-dotted border-gray-100 mb-6" />

                        {/* Lista Items */}
                        <div className="space-y-6 mb-8">
                            {carrito.map((it, i) => (
                                <div key={i} className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h4 className="text-[14px] font-black text-[#0b0c2a]">{it.nombre}</h4>
                                        <p className="text-[11px] text-gray-400 font-bold mt-0.5">
                                            {it.cantidad} × S/ {it.precio.toFixed(2)}
                                        </p>
                                        {it.nota && (
                                            <p className="text-[11px] text-orange-500 font-black mt-1 flex items-center gap-1">
                                                <span>📝</span> {it.nota}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-[14px] font-black text-[#0b0c2a] whitespace-nowrap">
                                        S/ {(it.precio * it.cantidad).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Divider Solid */}
                        <div className="border-t border-gray-100 mb-6" />

                        {/* Totales */}
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">Subtotal</span>
                                <span className="text-gray-400 font-black">S/ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-gray-400 font-bold">IGV (18%)</span>
                                <span className="text-gray-400 font-black">S/ {igv.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                                <span className="text-lg font-black text-[#0b0c2a] uppercase tracking-tighter">TOTAL</span>
                                <span className="text-2xl font-black text-[#0b0c2a]">S/ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Footer Ticket */}
                        <div className="text-center mt-10">
                            <p className="text-[11px] text-gray-400 font-bold leading-relaxed px-6">
                                Este documento no es un comprobante de pago. Para pagar solicite su boleta o factura.
                            </p>
                        </div>
                    </div>

                    {/* Acciones del Modal */}
                    <div className="p-6 bg-white border-t border-gray-50 grid grid-cols-2 gap-4">
                        <button 
                            onClick={onClose}
                            className="py-4 rounded-2xl border-2 border-gray-100 text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
                        >
                            Cerrar
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="py-4 rounded-2xl bg-[#3461FF] text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
                        >
                            <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            IMPRIMIR
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ────────────── VISTA: CANCELAR ────────────── */
    if (view === "cancelar") {
        return (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
                <div className="bg-white w-full max-w-[400px] rounded-[1.8rem] p-7 shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold text-[#0b0c2a]">Cancelar Comanda</h2>
                        <button onClick={onClose} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-400">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                            Tienes <span className="text-gray-900 font-bold">{(segundosCancel / 100).toFixed(1)} segundos</span> para confirmar. Se eliminará la comanda.
                        </p>
                    </div>

                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden mb-7">
                        <div className="bg-red-500 h-full transition-all duration-75 linear" style={{ width: `${(segundosCancel / 800) * 100}%` }} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-3 bg-gray-50 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm">Volver</button>
                        <button
                            onClick={() => { onCancelComanda?.(); onClose(); }}
                            className="py-3 bg-[#f8e3e3] text-[#eb5757] border border-[#f5c6c6] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors text-sm"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ────────────── VISTA: REVISAR ────────────── */
    if (view === "revisar") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white w-full max-w-[450px] rounded-[1.8rem] p-7 shadow-2xl flex flex-col border border-gray-100 animate-in zoom-in-95">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-[#0b0c2a]">Confirmar con Cliente</h2>
                        <button onClick={onClose} className="p-1 bg-gray-100 rounded-full text-gray-400"><X className="w-5 h-5" /></button>
                    </div>
                    <p className="text-[13px] text-gray-400 font-medium mb-5">Confirmar el pedido con el cliente para <span className="text-gray-900 font-bold">{mesaName}</span></p>

                    <div className="flex-1 overflow-y-auto space-y-2 mb-5 pr-1 custom-scrollbar max-h-[40vh]">
                        {carrito.map(it => (
                            <div key={it.key} className="bg-[#f0f6ff] border border-[#d6e4ff] p-3 rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-gray-800 leading-tight">{it.nombre}</p>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                                        {it.cantidad} × S/ {it.precio.toFixed(2)} {it.nota && <span className="text-blue-500 font-bold ml-1">· {it.nota}</span>}
                                    </p>
                                </div>
                                <span className="text-sm font-bold text-blue-700">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#f0f6ff] p-4 rounded-2xl border border-[#dce8ff] space-y-2 mb-5">
                        <div className="flex justify-between text-xs font-bold text-gray-400">
                            <span>Subtotal</span>
                            <span>S/ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-blue-600">Total + IGV</span>
                            <span className="text-xl font-black text-blue-700">S/ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-3 border border-gray-200 rounded-xl font-bold text-gray-500 text-sm hover:bg-gray-50 transition-colors">Volver</button>
                        <button onClick={() => onSave(carrito, "confirmado")} className="py-3 bg-[#3461FF] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700">
                            Confirmar Envío
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ────────────── VISTA: COMANDA ────────────── */
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-[950px] h-[85vh] rounded-[1.8rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 border border-gray-100">

                {/* Header */}
                <div className="bg-white px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[#0b0c2a]">Nueva Comanda · {mesaName}</h2>
                        <p className="text-[13px] text-gray-400 font-medium">Asignar platos para <span className="text-gray-900 font-bold">{mesaName}</span></p>
                    </div>
                    <button onClick={onClose} className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-400 border border-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">

                    {/* SECCIÓN IZQUIERDA: Menú */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden p-6 border-r border-gray-50">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
                            {[
                                { id: 1, label: "Entradas", emoji: "🥗" },
                                { id: 2, label: "Platos", emoji: "🍽️" },
                                { id: 3, label: "Postres", emoji: "🍮" },
                                { id: 4, label: "Bebidas", emoji: "🍹" }
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setTabActiva(cat.id); setItemSeleccionado(null); }}
                                    className={`
                          px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 border
                          ${tabActiva === cat.id
                                            ? 'bg-[#f0f6ff] text-[#3461FF] border-[#3461FF]'
                                            : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}
                       `}
                                >
                                    <span>{cat.emoji}</span> {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid de platos */}
                        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-4 content-start custom-scrollbar">
                            {itemsFiltrados.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setItemSeleccionado(item); setCantidad(1); setNota(""); }}
                                    className={`
                          text-left bg-white border p-4 rounded-2xl transition-all flex flex-col h-full relative group
                          ${itemSeleccionado?.id === item.id ? 'border-[#3461FF] bg-[#fcfdff] shadow-sm' : 'border-gray-50 hover:border-blue-100'}
                       `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-700">{item.nombre}</h3>
                                        <span className="text-xs font-bold text-blue-600">S/ {item.precio.toFixed(2)}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 font-medium leading-[1.3] line-clamp-2">{item.descripcion}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN DERECHA: Carrito y Configuración */}
                    <div className="w-[400px] flex flex-col bg-[#fdfdfe] overflow-hidden p-6">

                        {/* Carrito / Lista de pedidos actual */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Comanda enviada</h3>
                            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {carrito.map(it => (
                                    <div key={it.key} className="bg-[#f0f6ff] border border-[#d6e4ff] p-4 rounded-2xl flex gap-4 items-center shadow-sm relative group overflow-hidden">
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[14px] font-bold text-[#0b0c2a] truncate">{it.nombre}</p>
                                            <div className="flex items-center gap-1.5 mt-0.5 text-[#6b7280]">
                                                <span className="text-[11px] font-medium">{it.cantidad} × S/ {it.precio}</span>
                                                {it.nota && (
                                                    <span className="text-[11px] font-medium flex items-center gap-1">
                                                        · <span className="opacity-80">📝</span> {it.nota}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[15px] font-bold text-[#3461FF]">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                                            <button onClick={() => eliminarDelCarrito(it.key)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {carrito.length === 0 && (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3 py-10 opacity-50">
                                        <ClipboardCheck className="w-10 h-10" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-center">Sin platos agregados</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Box de Configuración (Item seleccionado) */}
                        <div className="mt-4 animate-in slide-in-from-right-4">
                            {itemSeleccionado ? (
                                <div className="bg-[#f0f6ff] border border-[#dce8ff] p-4 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1 truncate pr-2">
                                            <h4 className="text-sm font-bold text-gray-800 leading-tight truncate">{itemSeleccionado.nombre}</h4>
                                            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">S/ {itemSeleccionado.precio.toFixed(2)} / unidad</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-gray-100">
                                            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-7 h-7 bg-gray-50 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-500 transition-colors"><Minus className="w-3 h-3" /></button>
                                            <span className="text-sm font-bold w-4 text-center">{cantidad}</span>
                                            <button onClick={() => setCantidad(cantidad + 1)} className="w-7 h-7 bg-gray-50 flex items-center justify-center rounded-lg hover:bg-green-50 text-gray-500 transition-colors"><Plus className="w-3 h-3" /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Nota: Sin sal, extra limón..."
                                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium outline-none"
                                            value={nota}
                                            onChange={(e) => setNota(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={agregarAlCarrito}
                                        className="w-full py-2.5 bg-[#3461FF] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-50 hover:bg-blue-700 transition-all uppercase tracking-wide"
                                    >
                                        Confirmar Plato
                                    </button>
                                </div>
                            ) : (
                                <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] uppercase font-bold text-gray-300 text-center flex items-center justify-center h-[120px]">
                                    Selecciona un plato para configurar
                                </div>
                            )}
                        </div>

                        {/* Botones de Pie (Save / Cancel) */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total estimado</span>
                                <span className="text-lg font-black text-blue-700 leading-none">S/ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={onClose} className="flex-1 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-400 hover:bg-gray-50 text-xs transition-all">Cancelar</button>
                                <button
                                    disabled={carrito.length === 0}
                                    onClick={() => onSave(carrito)}
                                    className="flex-2 py-3 bg-[#3461FF] text-white rounded-xl font-bold text-xs shadow-xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
                                >
                                    ✓ GUARDAR COMANDA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}
