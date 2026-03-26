import { Bell, DollarSign, Pencil, Search, Trash2, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/admin/dashboard/components/StatCard";
import { areas, roles } from "@/data";
import { useUsuarios } from "./hooks/useUsuarios";
import { FormularioUsuarioModal } from "./components/FormularioUsuarioModal";
import { EliminarUsuarioModal } from "./components/EliminarUsuarioModal";
import { statusOptions } from "./lib/config";
import { getRoleBadgeClass, formatCurrency, formatId } from "./lib/utils";

export function UsuariosPage() {
  const {
    filteredUsuarios,
    paginatedUsuarios,
    searchTerm,
    categoria,
    estado,
    setSearchTerm,
    setCategoria,
    setEstado,
    currentPage,
    pageCount,
    showingStart,
    showingEnd,
    totalEmpleados,
    activosAhora,
    nominaMensual,
    modals,
    selectedUser,
    deleteTarget,
    form,
    actions,
    setPageIndex,
  } = useUsuarios();

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      <div className="w-full bg-white rounded-[1rem] shadow-sm p-4 px-6 flex items-center justify-between border border-gray-100">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-black" />
          <h1 className="text-2xl font-bold text-black">Gestión de Usuarios</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="bg-white rounded-[1rem] shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[420px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre..."
              className="pl-9 bg-neutral-50 border-neutral-200 h-10"
            />
          </div>

          <Button
            className="bg-[#1d14e0] hover:bg-blue-800 text-white font-medium px-6 h-10 rounded-md gap-2"
            onClick={actions.openAddForm}
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="min-w-[180px]">
            <div className="text-xs font-semibold text-neutral-600 mb-2">
              Categoria
            </div>
            <Select
              value={categoria}
              onValueChange={(v) => {
                if (!v) return;
                setCategoria(v);
              }}
            >
              <SelectTrigger className="h-10 bg-white border-neutral-200 rounded-xl">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {roles.map((r) => (
                  <SelectItem key={r.id} value={r.nombre}>
                    {r.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[180px]">
            <div className="text-xs font-semibold text-neutral-600 mb-2">
              Estado
            </div>
            <Select
              value={estado}
              onValueChange={(v) => {
                if (!v) return;
                setEstado(v);
              }}
            >
              <SelectTrigger className="h-10 bg-white border-neutral-200 rounded-xl">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50">
                <tr className="text-neutral-600 font-semibold">
                  <th className="px-4 py-3 text-left whitespace-nowrap">ID</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    NOMBRE COMPLETOS
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    CORREO ELECTRÓNICO
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">ROL</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    SUELDO
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">ÁREA</th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    ESTADO
                  </th>
                  <th className="px-4 py-3 text-right whitespace-nowrap">
                    ACCIONES
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {paginatedUsuarios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-neutral-400"
                    >
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  paginatedUsuarios.map((u) => {
                    const isActive = u.isActive;
                    return (
                      <tr key={u.id} className="hover:bg-neutral-50/60">
                        <td className="px-4 py-3 whitespace-nowrap text-neutral-900 font-semibold">
                          {formatId(u.id)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-neutral-800 font-medium">
                          {u.nombre} {u.apellido}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                          {u.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                              getRoleBadgeClass(u.rol.nombre),
                            ].join(" ")}
                          >
                            {u.rol.nombre.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-neutral-900 font-semibold">
                          {formatCurrency(u.sueldo)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                            {u.area.nombre.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                              isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-neutral-100 text-neutral-600",
                            ].join(" ")}
                          >
                            {isActive ? "ACTIVO" : "INACTIVO"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors text-blue-700"
                              onClick={() => actions.openEditForm(u)}
                              aria-label={`Editar ${u.nombre}`}
                              type="button"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                              onClick={() => actions.openDelete(u)}
                              aria-label={`Eliminar ${u.nombre}`}
                              type="button"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white">
            <div className="text-xs text-neutral-500">
              {filteredUsuarios.length === 0 ? (
                "Mostrando 0 de 0 usuarios"
              ) : (
                <>
                  Mostrando {showingStart}-{showingEnd} de{" "}
                  {filteredUsuarios.length} usuarios
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 text-xs rounded-lg border border-neutral-100 text-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() =>
                  setPageIndex((p: number) => Math.max(0, p - 1))
                }
                disabled={currentPage === 0}
                type="button"
              >
                Anterior
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, idx) => {
                  const page = idx;
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setPageIndex(page)}
                      className={[
                        "w-8 h-8 rounded-lg text-xs border transition-colors",
                        isActive
                          ? "bg-blue-100 border-blue-200 text-blue-700 font-semibold"
                          : "bg-white border-neutral-100 text-neutral-600 hover:bg-neutral-50",
                      ].join(" ")}
                    >
                      {page + 1}
                    </button>
                  );
                })}
              </div>

              <button
                className="px-3 py-1.5 text-xs rounded-lg border border-neutral-100 text-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() =>
                  setPageIndex((p: number) =>
                    Math.min(pageCount - 1, p + 1),
                  )
                }
                disabled={currentPage >= pageCount - 1}
                type="button"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="TOTAL EMPLEADOS"
          value={`${totalEmpleados}`}
          icon={Users}
        />
        <StatCard
          title="ACTIVOS AHORA"
          value={`${activosAhora}`}
          icon={Users}
          iconClassName="text-emerald-500"
        />
        <StatCard
          title="NÓMINA MENSUAL"
          value={formatCurrency(nominaMensual)}
          icon={DollarSign}
          iconClassName="text-blue-500"
        />
      </div>

      <FormularioUsuarioModal
        open={modals.isFormOpen}
        onOpenChange={modals.setIsFormOpen}
        selectedUser={selectedUser}
        roles={roles}
        areas={areas}
        form={form}
        onSubmit={actions.handleFormSubmit}
      />

      <EliminarUsuarioModal
        open={modals.isDeleteOpen}
        onOpenChange={modals.setIsDeleteOpen}
        user={deleteTarget}
        onConfirm={actions.handleDeleteUser}
      />
    </div>
  );
}
