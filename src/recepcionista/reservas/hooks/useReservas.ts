import { useState, useEffect } from "react";
import reservasData from "@/data/reservas/reservas.json";
import type { Mesa } from "@/types";

/*
  ====================================================
  HOOK: useReservas — Gestión de estado y lógica
  ====================================================
  
  RESPONSABILIDADES:
  - Carga y persiste reservas en localStorage (como useMesas)
  - Valida datos al crear nuevas reservas
  - Filtra reservas pendientes y por búsqueda
  - Expone acciones: crear, confirmar, cancelar
  - Gestiona notificaciones (toast) de cambios
  
  PERSISTENCIA:
  Los cambios se guardan en localStorage para sincronizar con
  otras páginas y mantener datos entre navegaciones
*/

export function useReservas(mesasDisponibles: Mesa[], updateMesa: (mesaId: number, newState: string) => void) {
  // PERSISTENCIA: Carga reservas desde localStorage si existen
  // Si no hay datos guardados, usa los datos iniciales del JSON
  const [reservas, setReservas] = useState(() => {
    const saved = localStorage.getItem("reservasApp");
    if (saved) return JSON.parse(saved);
    return reservasData;
  });

  // SINCRONIZACIÓN: Cada cambio en reservas se guarda automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("reservasApp", JSON.stringify(reservas));
  }, [reservas]);

  const [seleccionada, setSeleccionada] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  // Estado del formulario para nueva reserva
  const [form, setForm] = useState({ nombre: "", apellido: "", personas: "", mesas: [] as number[], hora: "", area: "Todas" });
  const [errores, setErrores] = useState<any>({});
  const [notif, setNotif] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  // FILTRO: Solo muestra reservas PENDIENTES que coincidan con la búsqueda
  // Las confirmadas no aparecen en la lista principal
  const reservasFiltradas = reservas.filter((r: any) =>
    r.estado === "pendiente" && r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Utilidad: Obtiene objetos de mesa basados en IDs guardados en la reserva
  // Sirve para mostrar detalles en DetalleReserva (capacidad, ubicación, etc.)
  const getMesas = (ids: any) => {
    if (!ids) return [];
    const arr = Array.isArray(ids) ? ids : [ids];
    return arr.map(id => mesasDisponibles.find(m => m.id === id)).filter(Boolean) as Mesa[];
  };

  const abrirModal = () => {
    // Limpia el formulario para empezar una nueva reserva limpia
    setForm({ nombre: "", apellido: "", personas: "", mesas: [], hora: "", area: "Todas" });
    setErrores({});
    setModalAbierto(true);
  };

  // Valida todos los campos requeridos antes de guardar
  // Retorna true si todos los campos son válidos
  const validar = () => {
    const e: any = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";
    if (!form.personas || parseInt(form.personas) < 1) e.personas = "Requerido";
    if (!form.mesas || form.mesas.length === 0) e.mesas = "Selecciona al menos una mesa";
    if (!form.hora) e.hora = "Selecciona una hora";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  // Crea una nueva reserva y la persiste en localStorage
  // CAMBIO: Los cambios se guardan en localStorage automáticamente gracias al useEffect
  const guardar = () => {
    if (!validar()) return;
    const nueva = {
      id: Date.now(),
      nombre: `${form.nombre.trim()} ${form.apellido.trim()}`,
      personas: parseInt(form.personas),
      mesas: form.mesas, // IDs de las mesas asignadas
      hora: form.hora,
      estado: "pendiente", // Todas las nuevas reservas inicio como pendientes
    };
    // Agrega la nueva reserva y ordena por hora
    setReservas((prev: any) => [...prev, nueva].sort((a: any, b: any) => a.hora.localeCompare(b.hora)));
    // Marcar las mesas seleccionadas como "Reservado"
    nueva.mesas.forEach((mesaId: number) => updateMesa(mesaId, "Reservado"));
    setModalAbierto(false);
    setSeleccionada(nueva);
    setNotif(`✅ Reserva para ${nueva.nombre} añadida a las ${nueva.hora}`);
    setTimeout(() => setNotif(null), 3500);
  };

  // Cancela una reserva: la elimina de la lista
  // CAMBIO: Se persiste en localStorage automáticamente
  const cancelarReserva = (id: number) => {
    const r = reservas.find((x: any) => x.id === id);
    if (!r) return;
    setReservas((prev: any) => prev.filter((x: any) => x.id !== id));
    // Liberar las mesas al cancelar
    if (r.mesas) r.mesas.forEach((mesaId: number) => updateMesa(mesaId, "Disponible"));
    setSeleccionada(null);
    setNotif(`🗑 Reserva de ${r.nombre} cancelada`);
    setTimeout(() => setNotif(null), 3000);
  };

  // Confirma una reserva: cambia su estado a "confirmada"
  // Las reservas confirmadas no aparecen más en la lista de pendientes
  const confirmarReserva = (id: number) => {
    const r = reservas.find((x: any) => x.id === id);
    if (!r) return;
    // Actualiza solo la reserva con ese ID, marcándola como confirmada
    setReservas((prev: any) => prev.map((x: any) => x.id === id ? { ...x, estado: "confirmada" } : x));
    // Al confirmar la llegada, las mesas pasan a "Ocupado"
    if (r.mesas) r.mesas.forEach((mesaId: number) => updateMesa(mesaId, "Ocupado"));
    setSeleccionada(null);
    setNotif(`✅ Reserva de ${r.nombre} confirmada`);
    setTimeout(() => setNotif(null), 3000);
  };

  return {
    reservas: reservasFiltradas,
    totalReservas: reservas.length,
    seleccionada,
    setSeleccionada,
    modalAbierto,
    setModalAbierto,
    form,
    setForm,
    errores,
    setErrores,
    notif,
    busqueda,
    setBusqueda,
    getMesas,
    actions: {
      abrirModal,
      guardar,
      cancelarReserva,
      confirmarReserva
    }
  };
}
