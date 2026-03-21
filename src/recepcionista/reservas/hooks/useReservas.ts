import { useState, useEffect } from "react";
import reservasData from "@/data/reservas/reservas.json";
import type { Mesa } from "@/types";

export function useReservas(mesasDisponibles: Mesa[]) {
  const [reservas, setReservas] = useState(() => {
    const saved = localStorage.getItem("reservasApp");
    if (saved) return JSON.parse(saved);
    return reservasData;
  });

  useEffect(() => {
    localStorage.setItem("reservasApp", JSON.stringify(reservas));
  }, [reservas]);

  const [seleccionada, setSeleccionada] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", personas: "", mesas: [] as number[], hora: "", area: "Todas" });
  const [errores, setErrores] = useState<any>({});
  const [notif, setNotif] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const reservasFiltradas = reservas.filter((r: any) =>
    r.estado === "pendiente" && r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getMesas = (ids: any) => {
    if (!ids) return [];
    const arr = Array.isArray(ids) ? ids : [ids];
    return arr.map(id => mesasDisponibles.find(m => m.id === id)).filter(Boolean) as Mesa[];
  };

  const abrirModal = () => {
    setForm({ nombre: "", apellido: "", personas: "", mesas: [], hora: "", area: "Todas" });
    setErrores({});
    setModalAbierto(true);
  };

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

  const guardar = () => {
    if (!validar()) return;
    const nueva = {
      id: Date.now(),
      nombre: `${form.nombre.trim()} ${form.apellido.trim()}`,
      personas: parseInt(form.personas),
      mesas: form.mesas,
      hora: form.hora,
      estado: "pendiente",
    };
    setReservas((prev: any) => [...prev, nueva].sort((a: any, b: any) => a.hora.localeCompare(b.hora)));
    setModalAbierto(false);
    setSeleccionada(nueva);
    setNotif(`✅ Reserva para ${nueva.nombre} añadida a las ${nueva.hora}`);
    setTimeout(() => setNotif(null), 3500);
  };

  const cancelarReserva = (id: number) => {
    const r = reservas.find((x: any) => x.id === id);
    if (!r) return;
    setReservas((prev: any) => prev.filter((x: any) => x.id !== id));
    setSeleccionada(null);
    setNotif(`🗑 Reserva de ${r.nombre} cancelada`);
    setTimeout(() => setNotif(null), 3000);
  };

  const confirmarReserva = (id: number) => {
    const r = reservas.find((x: any) => x.id === id);
    if (!r) return;
    setReservas((prev: any) => prev.map((x: any) => x.id === id ? { ...x, estado: "confirmada" } : x));
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
