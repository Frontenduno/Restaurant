import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { areas, roles, users as usersRaw } from "@/data";
import type { UsuarioFormData } from "@/admin/usuarios/schemas/usuarioSchema";
import { usuarioSchema } from "@/admin/usuarios/schemas/usuarioSchema";
import type { UserWithPassword } from "../types";
import { PAGE_SIZE, statusOptions } from "../lib/config";
import { splitFullName } from "../lib/utils";

// Hook principal (Controlador) para la página de Usuarios.
// Contiene todo el estado local (búsqueda, filtros, paginación, modales)
// y la lógica para crear, editar y eliminar usuarios de manera simulada.
export function useUsuarios() {
  const initialUsuarios = usersRaw as UserWithPassword[];

  const [usuarios, setUsuarios] = useState<UserWithPassword[]>(initialUsuarios);

  // ESTADOS DE BÚSQUEDA Y FILTROS
  const [searchTerm, setSearchTerm] = useState("");
  const [categoria, setCategoria] = useState<string>("Todos");
  const [estado, setEstado] = useState<string>("Todos");
  const [pageIndex, setPageIndex] = useState(0);
  // ESTADOS DE LOS MODALES
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserWithPassword | null>(null);

  // CONFIGURACIÓN DEL FORMULARIO
  // Inicializa el formulario usando react-hook-form y valida con Zod (usuarioSchema).
  const form = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema) as any,
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      rolId: 0,
      sueldo: undefined,
      isActive: true,
    },
  });

  const { reset } = form;

  const setSearchTermSafe = (value: string) => {
    setSearchTerm(value);
    setPageIndex(0);
  };

  const setCategoriaSafe = (value: string) => {
    setCategoria(value);
    setPageIndex(0);
  };

  const setEstadoSafe = (value: string) => {
    setEstado(value);
    setPageIndex(0);
  };

  // FUNCIONES PARA ABRIR MODALES 
  const openAddForm = () => {
    setSelectedUser(null);
    reset({
      fullName: "",
      email: "",
      password: "",
      rolId: 0,
      sueldo: undefined,
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (user: UserWithPassword) => {
    setSelectedUser(user);
    reset({
      fullName: `${user.nombre} ${user.apellido}`.trim(),
      email: user.email,
      password: "",
      rolId: user.rol.id,
      sueldo: user.sueldo,
      isActive: user.isActive,
    });
    setIsFormOpen(true);
  };

  const openDelete = (user: UserWithPassword) => {
    setDeleteTarget(user);
    setIsDeleteOpen(true);
  };

  // LÓGICA DE FILTRADO
  // Retorna una lista nueva de usuarios aplicando el filtro de categoría, estado y texto del buscador.
  const filteredUsuarios = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return usuarios
      .filter((u) => {
        if (categoria === "Todos") return true;
        return u.rol.nombre === categoria;
      })
      .filter((u) => {
        if (estado === "Todos") return true;
        const desired = estado === "Activo";
        return u.isActive === desired;
      })
      .filter((u) => {
        if (!term) return true;
        const fullName = `${u.nombre} ${u.apellido}`.toLowerCase();
        return (
          fullName.includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.nombre.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => a.id - b.id);
  }, [usuarios, categoria, estado, searchTerm]);

  const pageCount = Math.max(1, Math.ceil(filteredUsuarios.length / PAGE_SIZE));
  const currentPage = Math.min(pageIndex, pageCount - 1);

  // LÓGICA DE PAGINACIÓN
  // Extrae y devuelve únicamente el segmento de usuarios correspondiente a la página visual actual.
  const paginatedUsuarios = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    return filteredUsuarios.slice(start, start + PAGE_SIZE);
  }, [filteredUsuarios, currentPage]);

  const showingStart =
    filteredUsuarios.length === 0 ? 0 : currentPage * PAGE_SIZE + 1;
  const showingEnd = Math.min(filteredUsuarios.length, (currentPage + 1) * PAGE_SIZE);

  // ESTADÍSTICAS DEL DASHBOARD
  // Calcula el total de empleados, los activos y la suma proyectada de los sueldos.
  const totalEmpleados = usuarios.length;
  const activosAhora = usuarios.filter((u) => u.isActive).length;
  const nominaMensual = usuarios.reduce((acc, u) => acc + u.sueldo, 0);

  // LÓGICA DE GUARDADO (SIMULACIÓN DE BASE DE DATOS)
  // Valida los roles/áreas y determina si debe agregar un usuario nuevo al estado o actualizar uno existente.
  const handleFormSubmit = (data: UsuarioFormData) => {
    const rol = roles.find((r) => r.id === data.rolId);
    const area = areas.find((a) => a.id === rol?.idArea);

    if (!rol || !area) {
      toast.error("No se pudo guardar el usuario", {
        description: "Faltan roles/áreas de soporte.",
      });
      return;
    }

    const passwordTrimmed = data.password?.trim() ?? "";
    const isEdit = !!selectedUser;

    if (!isEdit && !passwordTrimmed) {
      toast.error("Contraseña requerida", {
        description: "Ingresa una contraseña para el nuevo usuario.",
      });
      return;
    }

    const { nombre, apellido } = splitFullName(data.fullName);

    if (!isEdit) {
      const newId = usuarios.length
        ? Math.max(...usuarios.map((u) => u.id)) + 1
        : 1;

      const newUser: UserWithPassword = {
        id: newId,
        nombre,
        apellido,
        email: data.email,
        rol: { id: rol.id, nombre: rol.nombre, idArea: rol.idArea },
        sueldo: data.sueldo ?? 0,
        area,
        isActive: data.isActive,
        password: passwordTrimmed,
      };

      setUsuarios((prev) => [newUser, ...prev]);
      toast.success("Usuario creado", {
        description: `${newUser.nombre} ${newUser.apellido}`,
      });
    } else if (selectedUser) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
              ...u,
              nombre,
              apellido,
              email: data.email,
              rol: { id: rol.id, nombre: rol.nombre, idArea: rol.idArea },
              sueldo: data.sueldo ?? 0,
              area,
              isActive: data.isActive,
              password: passwordTrimmed ? passwordTrimmed : u.password,
            }
            : u,
        ),
      );

      toast.success("Usuario actualizado", {
        description: `${nombre} ${apellido}`.trim(),
      });
    }

    setIsFormOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    if (deleteTarget) {
      toast.success("Usuario eliminado", {
        description: `${deleteTarget.nombre} ${deleteTarget.apellido}`,
      });
    }
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  return {
    // Datos: Las listas de usuarios en sus diferentes estados
    usuarios,
    filteredUsuarios,
    paginatedUsuarios,

    // Filtros: Los valores actuales de búsqueda y las funciones 
    // para actualizarlos de forma segura (reiniciando la paginación)
    searchTerm,
    categoria,
    estado,
    setSearchTerm: setSearchTermSafe,
    setCategoria: setCategoriaSafe,
    setEstado: setEstadoSafe,

    // Paginación: Controles y cálculos para saber en qué página de la tabla estamos
    pageIndex,
    setPageIndex,
    pageCount,
    currentPage,
    showingStart,
    showingEnd,

    // Tarjetas (Cards): Los valores calculados para las estadísticas de la parte superior del Dashboard
    totalEmpleados,
    activosAhora,
    nominaMensual,

    // Opciones estáticas: Los estados disponibles para llenar el filtro desplegable
    statusOptions,

    // Modales y Selección: Estados booleanos (abierto/cerrado) de las ventanas y qué usuario 
    // está en el "foco" actual
    modals: {
      isFormOpen,
      setIsFormOpen,
      isDeleteOpen,
      setIsDeleteOpen,
    },
    selectedUser,
    deleteTarget,

    // Formulario y Acciones: La instancia de validación (form) y las funciones 
    // clave de negocio (crear, editar, borrar) agrupadas
    form,
    actions: {
      openAddForm,
      openEditForm,
      openDelete,
      handleFormSubmit,
      handleDeleteUser,
    },
  };
}

