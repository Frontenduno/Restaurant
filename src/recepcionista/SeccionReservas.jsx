import { useState } from "react";

const HOY = new Date().toLocaleDateString("es-PE", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

const MESAS_DISPONIBLES = [
  { id: 1,  nombre: "Mesa 1",  personas: 4, tipo: "Ventana"  },
  { id: 2,  nombre: "Mesa 2",  personas: 2, tipo: "Interior" },
  { id: 3,  nombre: "Mesa 3",  personas: 2, tipo: "Interior" },
  { id: 4,  nombre: "Mesa 4",  personas: 3, tipo: "Interior" },
  { id: 5,  nombre: "Mesa 5",  personas: 2, tipo: "Interior" },
  { id: 6,  nombre: "Mesa 6",  personas: 4, tipo: "Ventana"  },
  { id: 7,  nombre: "Mesa 7",  personas: 2, tipo: "Interior" },
  { id: 8,  nombre: "Mesa 8",  personas: 2, tipo: "Interior" },
  { id: 9,  nombre: "Mesa 9",  personas: 4, tipo: "Ventana"  },
  { id: 10, nombre: "Mesa 10", personas: 4, tipo: "Ventana"  },
];

// Devuelve la(s) mesa(s) sugeridas para una cantidad de personas
function sugerirMesas(personas) {
  const n = parseInt(personas);
  if (!n || n < 1) return [];
  // Una sola mesa que alcance
  const simple = MESAS_DISPONIBLES.find(m => m.personas >= n);
  if (simple) return [simple];
  // Combinación de dos mesas cuya suma alcance
  for (let i = 0; i < MESAS_DISPONIBLES.length; i++) {
    for (let j = i + 1; j < MESAS_DISPONIBLES.length; j++) {
      if (MESAS_DISPONIBLES[i].personas + MESAS_DISPONIBLES[j].personas >= n)
        return [MESAS_DISPONIBLES[i], MESAS_DISPONIBLES[j]];
    }
  }
  return MESAS_DISPONIBLES.slice(0, 3); // fallback: primeras 3
}

const RESERVAS_INICIALES = [
  { id: 1, nombre: "Alejandro Vega",  personas: 3,  mesas: [4],    hora: "13:00", estado: "confirmada" },
  { id: 2, nombre: "María Torres",    personas: 2,  mesas: [5],    hora: "13:30", estado: "pendiente"  },
  { id: 3, nombre: "Carlos Ruiz",     personas: 7,  mesas: [6, 9], hora: "14:00", estado: "confirmada" },
  { id: 4, nombre: "Sofía Mendez",    personas: 2,  mesas: [2],    hora: "15:00", estado: "pendiente"  },
  { id: 5, nombre: "Diego Paredes",   personas: 4,  mesas: [1],    hora: "19:00", estado: "confirmada" },
  { id: 6, nombre: "Valeria Quispe",  personas: 2,  mesas: [3],    hora: "20:00", estado: "pendiente"  },
  { id: 7, nombre: "Óscar Flores",    personas: 8,  mesas: [10, 6],hora: "20:30", estado: "confirmada" },
];

const HORAS = Array.from({ length: 29 }, (_, i) => {
  const totalMin = 8 * 60 + i * 30;
  const h = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const m = totalMin % 60 === 0 ? "00" : "30";
  return `${h}:${m}`;
}); // 08:00 → 22:00

const ESTADO_STYLES = {
  confirmada: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "Confirmada" },
  pendiente:  { bg: "#fffbeb", color: "#d97706", border: "#fde68a", label: "Pendiente"  },
};

function Avatar({ nombre, size = 36 }) {
  const initials = nombre.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const hue = (nombre.charCodeAt(0) * 37 + nombre.charCodeAt(1) * 17) % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `hsl(${hue}, 65%, 88%)`,
      color: `hsl(${hue}, 55%, 35%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.35,
      flexShrink: 0, letterSpacing: 0.5,
    }}>{initials}</div>
  );
}

function IconoReloj() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#9ca3af" strokeWidth="1.5"/>
      <path d="M8 4.5V8l2.5 1.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconoMesa() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="5" width="12" height="7" rx="2" stroke="#9ca3af" strokeWidth="1.5"/>
      <circle cx="8" cy="8.5" r="2" stroke="#9ca3af" strokeWidth="1.2"/>
      <line x1="5" y1="3" x2="5" y2="5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="3" x2="11" y2="5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconoPersonas() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="#9ca3af" strokeWidth="1.5"/>
      <path d="M1 13c0-2.761 2.239-5 5-5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="11" cy="5" r="2" stroke="#9ca3af" strokeWidth="1.2"/>
      <path d="M10 8.2c.32-.13.66-.2 1-.2 1.657 0 3 1.343 3 3" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export default function SeccionReservas() {
  const [reservas, setReservas] = useState(RESERVAS_INICIALES);
  const [seleccionada, setSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", personas: "", mesas: [], hora: "" });
  const [errores, setErrores] = useState({});
  const [notif, setNotif] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const reservasFiltradas = reservas.filter(r =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const getMesas = (ids) => {
    if (!ids) return [];
    const arr = Array.isArray(ids) ? ids : [ids];
    return arr.map(id => MESAS_DISPONIBLES.find(m => m.id === id)).filter(Boolean);
  };

  const abrirModal = () => {
    setForm({ nombre: "", apellido: "", personas: "", mesas: [], hora: "" });
    setErrores({});
    setModalAbierto(true);
  };

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";
    if (!form.personas || form.personas < 1) e.personas = "Requerido";
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
    setReservas(prev => [...prev, nueva].sort((a, b) => a.hora.localeCompare(b.hora)));
    setModalAbierto(false);
    setSeleccionada(nueva);
    setNotif(`✅ Reserva para ${nueva.nombre} añadida a las ${nueva.hora}`);
    setTimeout(() => setNotif(null), 3500);
  };

  const cancelarReserva = (id) => {
    const r = reservas.find(x => x.id === id);
    setReservas(prev => prev.filter(x => x.id !== id));
    setSeleccionada(null);
    setNotif(`🗑 Reserva de ${r.nombre} cancelada`);
    setTimeout(() => setNotif(null), 3000);
  };

  const campo = (key, label, tipo = "text", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", letterSpacing: 0.3 }}>
        {label}
      </label>
      <input
        type={tipo}
        value={form[key]}
        placeholder={placeholder}
        min={tipo === "number" ? 1 : undefined}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        style={{
          padding: "9px 12px", borderRadius: 9, fontSize: 13,
          border: `1.5px solid ${errores[key] ? "#f87171" : "#e5e7eb"}`,
          outline: "none", background: errores[key] ? "#fff5f5" : "#fafafa",
          color: "#111827", transition: "border 0.15s",
        }}
        onFocus={e => e.target.style.borderColor = errores[key] ? "#f87171" : "#6366f1"}
        onBlur={e => e.target.style.borderColor = errores[key] ? "#f87171" : "#e5e7eb"}
      />
      {errores[key] && <span style={{ fontSize: 11, color: "#ef4444" }}>{errores[key]}</span>}
    </div>
  );

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", height: "100%", minHeight: "100vh",
      background: "#f8fafc",
    }}>

      {/* HEADER NAV */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            background: "#1d4ed8", color: "#fff", borderRadius: 8,
            padding: "4px 8px", fontWeight: 800, fontSize: 13,
          }}>YI</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>RESTAURANTE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280" }}>
          <span style={{ fontSize: 16 }}>🔔</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <div style={{
          width: 180, background: "#fff", borderRight: "1px solid #e5e7eb",
          padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {[
            { key: "mesas",    icon: "▦", label: "Mesas" },
            { key: "meseros",  icon: "👤", label: "Meseros" },
            { key: "reservas", icon: "📋", label: "Reservas", activo: true },
          ].map(item => (
            <div key={item.key} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 12px", borderRadius: 8,
              background: item.activo ? "#eff6ff" : "transparent",
              color: item.activo ? "#1d4ed8" : "#6b7280",
              fontWeight: item.activo ? 600 : 500, fontSize: 13, cursor: "pointer",
            }}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
          <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", background: "#e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
              }}>👤</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Recepcionista</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>En línea</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* TOPBAR RESERVAS */}
          <div style={{
            background: "#fff", borderBottom: "1px solid #e5e7eb",
            padding: "14px 24px", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>
                Reservas de hoy
              </h1>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af", textTransform: "capitalize" }}>
                {HOY}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Buscador */}
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                  fontSize: 13, color: "#9ca3af", pointerEvents: "none",
                }}>🔍</span>
                <input
                  placeholder="Buscar cliente..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  style={{
                    padding: "8px 12px 8px 30px", borderRadius: 9, fontSize: 12,
                    border: "1.5px solid #e5e7eb", background: "#f8fafc",
                    outline: "none", width: 180, color: "#111827",
                  }}
                />
              </div>
              {/* Contador */}
              <div style={{
                background: "#eff6ff", color: "#1d4ed8", borderRadius: 8,
                padding: "6px 12px", fontSize: 12, fontWeight: 700,
              }}>
                {reservas.length} reservas
              </div>
              {/* Botón agregar */}
              <button onClick={abrirModal} style={{
                background: "#1d4ed8", color: "#fff",
                border: "none", borderRadius: 9,
                padding: "8px 16px", fontSize: 13, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e40af"}
                onMouseLeave={e => e.currentTarget.style.background = "#1d4ed8"}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Agregar
              </button>
            </div>
          </div>

          {/* LAYOUT: LISTA + PANEL LATERAL */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

            {/* LISTA DE CARDS */}
            <div style={{
              flex: seleccionada ? "0 0 340px" : "1",
              overflowY: "auto", padding: "16px",
              display: "flex", flexDirection: "column", gap: 8,
              transition: "flex 0.3s ease",
              borderRight: seleccionada ? "1px solid #e5e7eb" : "none",
            }}>
              {/* Agrupado por franja horaria */}
              {["Mediodía (12:00–16:00)", "Noche (18:00–22:00)"].map(franja => {
                const [desde, hasta] = franja.includes("Mediodía") ? ["12", "16"] : ["18", "22"];
                const grupo = reservasFiltradas.filter(r => {
                  const h = parseInt(r.hora.split(":")[0]);
                  return h >= parseInt(desde) && h < parseInt(hasta);
                });
                if (grupo.length === 0) return null;
                return (
                  <div key={franja}>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: "#9ca3af",
                      letterSpacing: 1, textTransform: "uppercase",
                      padding: "4px 2px 8px",
                    }}>{franja}</div>
                    {grupo.map(r => {
                      const est = ESTADO_STYLES[r.estado];
                      const mesasR = getMesas(r.mesas);
                  const capacidadTotal = mesasR.reduce((s, m) => s + m.personas, 0);
                  const esCombinada = mesasR.length > 1;
                      const activa = seleccionada?.id === r.id;
                      return (
                        <div key={r.id}
                          onClick={() => setSeleccionada(activa ? null : r)}
                          style={{
                            background: activa ? "#eff6ff" : "#fff",
                            border: `1.5px solid ${activa ? "#93c5fd" : "#e5e7eb"}`,
                            borderRadius: 11, padding: "10px 12px",
                            cursor: "pointer", marginBottom: 6,
                            transition: "all 0.15s",
                            display: "flex", alignItems: "center", gap: 10,
                          }}
                          onMouseEnter={e => { if (!activa) e.currentTarget.style.borderColor = "#c7d2fe"; }}
                          onMouseLeave={e => { if (!activa) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                        >
                          <Avatar nombre={r.nombre} size={34} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontWeight: 600, fontSize: 13, color: "#111827",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            }}>{r.nombre}</div>
                            <div style={{
                              display: "flex", alignItems: "center", gap: 8,
                              marginTop: 3, flexWrap: "wrap",
                            }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6b7280" }}>
                                <IconoReloj /> {r.hora}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6b7280" }}>
                                <IconoMesa /> {(Array.isArray(r.mesas) ? r.mesas : [r.mesas]).map(id => getMesas([id])[0]?.nombre).join(" + ")}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6b7280" }}>
                                <IconoPersonas /> {r.personas}
                              </span>
                            </div>
                          </div>
                          <span style={{
                            background: est.bg, color: est.color,
                            border: `1px solid ${est.border}`,
                            borderRadius: 20, padding: "2px 8px",
                            fontSize: 10, fontWeight: 700, flexShrink: 0,
                          }}>{est.label}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {reservasFiltradas.length === 0 && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: 40, color: "#9ca3af",
                }}>
                  <span style={{ fontSize: 36 }}>📋</span>
                  <p style={{ marginTop: 10, fontSize: 13 }}>
                    {busqueda ? "No se encontraron resultados" : "No hay reservas para hoy"}
                  </p>
                </div>
              )}
            </div>

            {/* PANEL LATERAL DERECHO — DETALLE */}
            {seleccionada && (() => {
              const r = seleccionada;
              const mesasR = getMesas(r.mesas);
              const capacidadTotal = mesasR.reduce((s, m) => s + m.personas, 0);
              const esCombinada = mesasR.length > 1;
              const est = ESTADO_STYLES[r.estado];
              return (
                <div style={{
                  flex: 1, overflowY: "auto", padding: "24px",
                  animation: "slideInRight 0.22s ease",
                }}>
                  {/* Header del panel */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 24,
                  }}>
                    <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#374151" }}>
                      Detalle de Reserva
                    </h2>
                    <button onClick={() => setSeleccionada(null)} style={{
                      background: "#f3f4f6", border: "none", borderRadius: "50%",
                      width: 28, height: 28, cursor: "pointer", fontSize: 13,
                      color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>✕</button>
                  </div>

                  {/* Avatar + nombre */}
                  <div style={{
                    background: "#fff", borderRadius: 16, padding: "24px 20px",
                    border: "1px solid #e5e7eb", marginBottom: 14,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  }}>
                    <Avatar nombre={r.nombre} size={60} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{r.nombre}</div>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6, flexWrap: "wrap" }}>
                        <span style={{
                          background: est.bg, color: est.color, border: `1px solid ${est.border}`,
                          borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700,
                        }}>{est.label}</span>
                        {esCombinada && (
                          <span style={{
                            background: "#fef3c7", color: "#d97706", border: "1px solid #fde68a",
                            borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700,
                          }}>🔗 Mesas combinadas</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {[
                      { icon: "🕐", label: "Hora reservada", valor: r.hora },
                      { icon: "👥", label: "Personas",       valor: `${r.personas} persona${r.personas > 1 ? "s" : ""}` },
                      { icon: "🪑", label: esCombinada ? "Mesas combinadas" : "Mesa asignada",
                        valor: mesasR.map(m => m.nombre).join(" + ") },
                      { icon: "📍", label: "Ubicación",      valor: [...new Set(mesasR.map(m => m.tipo))].join(" / ") },
                    ].map(item => (
                      <div key={item.label} style={{
                        background: "#fff", borderRadius: 12, padding: "14px",
                        border: "1px solid #e5e7eb",
                      }}>
                        <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginTop: 2 }}>
                          {item.valor}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capacidad visual */}
                  <div style={{
                    background: "#fff", borderRadius: 12, padding: "14px 16px",
                    border: "1px solid #e5e7eb", marginBottom: 20,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
                        Capacidad total — {r.personas}/{capacidadTotal} asientos
                      </span>
                      <span style={{ fontSize: 11, color: capacidadTotal >= r.personas ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                        {capacidadTotal >= r.personas ? "✓ Suficiente" : "⚠ Insuficiente"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                      {Array.from({ length: capacidadTotal }).map((_, i) => (
                        <span key={i} style={{ fontSize: 16, opacity: i < r.personas ? 1 : 0.2 }}>🪑</span>
                      ))}
                    </div>
                  </div>

                  {/* Botón cancelar */}
                  <button
                    onClick={() => cancelarReserva(r.id)}
                    style={{
                      width: "100%", padding: "11px 0",
                      background: "#fff", color: "#dc2626",
                      border: "1.5px solid #fecaca", borderRadius: 10,
                      fontWeight: 700, fontSize: 13, cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                  >
                    🗑 Cancelar reserva
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* MODAL AGREGAR RESERVA */}
      {modalAbierto && (
        <div
          onClick={() => setModalAbierto(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 50, animation: "fadeIn 0.18s ease",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 20, padding: "28px 28px 24px",
              width: 420, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto",
              boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
              animation: "slideUp 0.22s ease",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 22,
            }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>
                  Nueva Reserva
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9ca3af", textTransform: "capitalize" }}>
                  {HOY}
                </p>
              </div>
              <button onClick={() => setModalAbierto(false)} style={{
                background: "#f3f4f6", border: "none", borderRadius: "50%",
                width: 30, height: 30, cursor: "pointer", fontSize: 14,
                color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </div>

            {/* Sección cliente */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: "#9ca3af",
              letterSpacing: 1, textTransform: "uppercase", marginBottom: 10,
            }}>Datos del cliente</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {campo("nombre",   "Nombre",   "text", "Ej. María")}
              {campo("apellido", "Apellido", "text", "Ej. Torres")}
            </div>
            {/* personas con auto-sugerencia */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", letterSpacing: 0.3 }}>
                Número de personas
              </label>
              <input
                type="number" min={1} value={form.personas}
                placeholder="Ej. 6"
                onChange={e => {
                  const val = e.target.value;
                  const sugeridas = val ? sugerirMesas(val).map(m => m.id) : [];
                  setForm(p => ({ ...p, personas: val, mesas: sugeridas }));
                }}
                style={{
                  padding: "9px 12px", borderRadius: 9, fontSize: 13,
                  border: `1.5px solid ${errores.personas ? "#f87171" : "#e5e7eb"}`,
                  outline: "none", background: errores.personas ? "#fff5f5" : "#fafafa", color: "#111827",
                }}
              />
              {errores.personas && <span style={{ fontSize: 11, color: "#ef4444" }}>{errores.personas}</span>}
            </div>

            <div style={{
              borderTop: "1px solid #f3f4f6", margin: "18px 0 14px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "#9ca3af",
                letterSpacing: 1, textTransform: "uppercase",
                background: "#fff", paddingRight: 8, marginTop: -8,
              }}>Reserva</span>
            </div>

            {/* Mesa selector — chips con auto-sugerencia */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", letterSpacing: 0.3 }}>
                  Mesa(s) asignada(s)
                </label>
                {form.personas && (
                  <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 600, cursor: "pointer" }}
                    onClick={() => setForm(p => ({ ...p, mesas: sugerirMesas(p.personas).map(m => m.id) }))}>
                    ✨ Auto-sugerir
                  </span>
                )}
              </div>
              {form.mesas.length > 0 && (
                <div style={{
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 9, padding: "8px 12px",
                  fontSize: 12, color: "#15803d", fontWeight: 500,
                }}>
                  {form.mesas.length > 1 ? "🔗 Mesas combinadas: " : "🪑 Mesa: "}
                  {getMesas(form.mesas).map(m => `${m.nombre} (${m.personas} pers.)`).join(" + ")}
                  {" "}= {getMesas(form.mesas).reduce((s, m) => s + m.personas, 0)} asientos
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {MESAS_DISPONIBLES.map(m => {
                  const sel = form.mesas.includes(m.id);
                  return (
                    <button key={m.id}
                      onClick={() => setForm(p => ({
                        ...p,
                        mesas: sel ? p.mesas.filter(id => id !== m.id) : [...p.mesas, m.id],
                      }))}
                      style={{
                        padding: "6px 12px", borderRadius: 8, fontSize: 12,
                        border: `1.5px solid ${sel ? "#1d4ed8" : "#e5e7eb"}`,
                        background: sel ? "#eff6ff" : "#fff",
                        color: sel ? "#1d4ed8" : "#374151",
                        fontWeight: sel ? 700 : 500,
                        cursor: "pointer", transition: "all 0.12s",
                      }}
                    >
                      {m.nombre} <span style={{ opacity: 0.6 }}>·{m.personas}p</span>
                    </button>
                  );
                })}
              </div>
              {errores.mesas && <span style={{ fontSize: 11, color: "#ef4444" }}>{errores.mesas}</span>}
            </div>

            {/* Hora selector — franjas de turno */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", letterSpacing: 0.3 }}>
                Hora
              </label>
              {[
                { label: "☀️ Mañana",  rango: [8,  12], color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
                { label: "🌤 Tarde",   rango: [12, 18], color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
                { label: "🌙 Noche",   rango: [18, 22], color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
              ].map(turno => {
                const horasTurno = HORAS.filter(h => {
                  const hr = parseInt(h.split(":")[0]);
                  return hr >= turno.rango[0] && hr < turno.rango[1];
                });
                const tieneSeleccion = horasTurno.includes(form.hora);
                return (
                  <div key={turno.label} style={{
                    border: `1.5px solid ${tieneSeleccion ? turno.color : "#e5e7eb"}`,
                    borderRadius: 12, overflow: "hidden",
                    transition: "border-color 0.15s",
                  }}>
                    {/* Cabecera del turno */}
                    <div style={{
                      background: tieneSeleccion ? turno.bg : "#fafafa",
                      padding: "7px 12px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderBottom: `1px solid ${tieneSeleccion ? turno.border : "#f3f4f6"}`,
                      transition: "background 0.15s",
                    }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        color: tieneSeleccion ? turno.color : "#6b7280",
                      }}>{turno.label}</span>
                      {tieneSeleccion && (
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          color: turno.color, background: turno.bg,
                          border: `1px solid ${turno.border}`,
                          borderRadius: 20, padding: "1px 8px",
                        }}>{form.hora}</span>
                      )}
                    </div>
                    {/* Horas del turno */}
                    <div style={{
                      padding: "8px 10px", display: "flex", flexWrap: "wrap", gap: 5,
                      background: "#fff",
                    }}>
                      {horasTurno.map(h => {
                        const sel = form.hora === h;
                        return (
                          <button key={h}
                            onClick={() => setForm(p => ({ ...p, hora: h }))}
                            style={{
                              padding: "5px 10px", borderRadius: 7, fontSize: 12,
                              border: `1.5px solid ${sel ? turno.color : "#e5e7eb"}`,
                              background: sel ? turno.bg : "#fff",
                              color: sel ? turno.color : "#374151",
                              fontWeight: sel ? 700 : 400,
                              cursor: "pointer", transition: "all 0.1s",
                            }}
                            onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = turno.color + "80"; }}
                            onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                          >{h}</button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {errores.hora && <span style={{ fontSize: 11, color: "#ef4444" }}>{errores.hora}</span>}
            </div>

            {/* Botones */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModalAbierto(false)} style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                border: "1.5px solid #e5e7eb", background: "#fff",
                color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer",
              }}>Cancelar</button>
              <button onClick={guardar} style={{
                flex: 2, padding: "11px 0", borderRadius: 10,
                border: "none", background: "#1d4ed8",
                color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1e40af"}
                onMouseLeave={e => e.currentTarget.style.background = "#1d4ed8"}
              >
                ✓ Guardar Reserva
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {notif && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          background: "#111827", color: "#fff",
          padding: "12px 22px", borderRadius: 12,
          fontSize: 13, fontWeight: 500,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          zIndex: 100, animation: "fadeInUp 0.3s ease",
          whiteSpace: "nowrap",
        }}>{notif}</div>
      )}

      <style>{`
        @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp   { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        @keyframes fadeInUp  { from { transform:translateX(-50%) translateY(10px);opacity:0 } to { transform:translateX(-50%) translateY(0);opacity:1 } }
        @keyframes slideInRight { from { transform:translateX(20px);opacity:0 } to { transform:translateX(0);opacity:1 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
      `}</style>
    </div>
  );
}
