export const TipoDocumentos = ['INFORME' , 'CONTRATO' , 'ACTA'] as const;;
export const EstadoDocumentos = ['PENDIENTE' , 'REGISTRADO' , 'VALIDADO' , 'ANULADO'] as const;;

export interface Documento {
  id: string;
  titulo: string;
  autor: string;
  tipo: string;
  estado: string;
  fechaRegistro: string; 
}

export interface PaginacionState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FiltrosBusqueda {
  autor: string;
}