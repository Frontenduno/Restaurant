export interface DashboardData {
  ventasDelDia: {
    monto: number;
    tendencia: {
      valor: number;
      esPositiva: boolean;
      texto: string;
    };
  };
  usuariosActivos: {
    enTurno: number;
    avatares: string[]; // URLs de imágenes
    usuariosExtra: number;
  };
  ocupacionMesas: {
    ocupadas: number;
    disponibles: number;
    total: number;
    porcentaje: number;
  };
  ventasSemanales: {
    ventas: Array<{ dia: string; monto: number }>;
    platillos: Array<{ dia: string; cantidad: number }>;
  };
  alertas: {
    stockBajo: number;
    sinStock: number;
  };
}
