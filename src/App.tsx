import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Tabla from './assets/components/Tabla';
import type { Documento, FiltrosBusqueda, PaginacionState } from './assets/Entidades/Documento';
import Formulario from './assets/components/Formulario';
import Filtros from './assets/components/Filtros';
import PaginacionControls from './assets/components/PaginacionControls';
import { useFetch } from './assets/hooks/useFetch';

const  { VITE_API_URL } = import.meta.env;

interface SuccessResponse {
  datos: Documento[],
  pagina: number,
  tamano_pagina: number,
  total: number,
}

function App() {
  /* const documentos = [
    { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', titulo: 'Informe Anual Q4 2024', autor: 'Ana López', tipo: 'INFORME', estado: 'VALIDADO', fechaRegistro: '2024-10-01' },
    { id: '9c858901-8a57-4791-81fe-4c455b099bc9', titulo: 'Contrato Proveedor X', autor: 'Carlos Ruiz', tipo: 'CONTRATO', estado: 'PENDIENTE', fechaRegistro: '2024-09-15' },
    { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', titulo: 'Manual de Usuario V1.2', autor: 'Marta Sanz', tipo: 'ACTA', estado: 'REGISTRADO', fechaRegistro: '2024-08-20' },
    { id: 'e7b8c3a2-1d64-4a9f-9e0f-b4f9f2d3d999', titulo: 'Factura 2024-0015', autor: 'Juan Gómez', tipo: 'INFORME', estado: 'ARCHIVADO', fechaRegistro: '2024-07-25' },
    { id: '1c6f0b90-2b16-4b5c-b7d2-fc7a6d0a0e91', titulo: 'Informe de Viabilidad Proyecto Alfa', autor: 'Ana López', tipo: 'INFORME', estado: 'PENDIENTE', fechaRegistro: '2024-10-10' },
    { id: 'd3b07384-d9f0-4f6e-8f35-7a9a0f23a1b1', titulo: 'Contrato Empleado Nuevo', autor: 'Carlos Ruiz', tipo: 'CONTRATO', estado: 'VALIDADO', fechaRegistro: '2024-09-01' },
    { id: '4b825dc6-8b2b-4f44-a7b5-c7e2e0f9a12f', titulo: 'Guía Rápida de Implementación', autor: 'Marta Sanz', tipo: 'ACTA', estado: 'PENDIENTE', fechaRegistro: '2024-06-05' },
    { id: '6f4922f4-1e34-4dcb-b2d5-3a15e2f0c8a3', titulo: 'Factura 2024-0016', autor: 'Juan Gómez', tipo: 'INFORME', estado: 'VALIDADO', fechaRegistro: '2024-05-18' },
    { id: '37693cfc-7b1b-4d9b-8b5b-5f3a2b7f1a0c', titulo: 'Revisión Legal Contrato Y', autor: 'Carlos Ruiz', tipo: 'CONTRATO', estado: 'REGISTRADO', fechaRegistro: '2024-10-15' },
    { id: '1ff1de77-1f19-4e5b-9e90-9c2e2b2c1d3f', titulo: 'Manual de Mantenimiento', autor: 'Marta Sanz', tipo: 'ACTA', estado: 'ARCHIVADO', fechaRegistro: '2024-04-10' },
    { id: '8e296a06-1c60-4f64-a5d3-4c2b9b0e0e5b', titulo: 'Informe de Mercado Asia', autor: 'Ana López', tipo: 'INFORME', estado: 'VALIDADO', fechaRegistro: '2024-03-22' },
    { id: '4b227777-5a8a-4e3b-bc4f-1d2c3b2a1e6f', titulo: 'Factura 2024-0017', autor: 'Juan Gómez', tipo: 'INFORME', estado: 'VALIDADO', fechaRegistro: '2024-02-14' },
    { id: 'e1671797-5b12-4f18-bf49-5f6e7c2d3a8b', titulo: 'Informe de Cumplimiento Normativo', autor: 'Ana López', tipo: 'INFORME', estado: 'PENDIENTE', fechaRegistro: '2024-10-16' },
    { id: '9bf31c7f-1d7c-4e8e-85d9-3e6c5a1f9d2b', titulo: 'Contrato de Licencia de Software', autor: 'Carlos Ruiz', tipo: 'CONTRATO', estado: 'REGISTRADO', fechaRegistro: '2024-09-29' },
    { id: 'c9f0f895-9b25-4f1b-8f5d-1a2b3c4d5e6f', titulo: 'Manual de Integración API', autor: 'Marta Sanz', tipo: 'ACTA', estado: 'PENDIENTE', fechaRegistro: '2024-08-11' },
    { id: '45c48cce-2e2d-4b7a-b8f4-3f6e1d2a7b9f', titulo: 'Factura 2024-0018', autor: 'Juan Gómez', tipo: 'INFORME', estado: 'ARCHIVADO', fechaRegistro: '2024-07-03' },
    { id: 'd3d94468-2a5f-4b1b-8f5d-7c8b9e0f1a2b', titulo: 'Estudio de Riesgo Financiero', autor: 'Ana López', tipo: 'INFORME', estado: 'VALIDADO', fechaRegistro: '2024-06-19' },
    { id: '6512bd43-2c0f-4e2b-8b5f-3a1b2c3d4e5f', titulo: 'Acuerdo de Confidencialidad (NDA)', autor: 'Carlos Ruiz', tipo: 'CONTRATO', estado: 'PENDIENTE', fechaRegistro: '2024-05-07' },
    { id: 'c20ad4d7-3a3f-4b1a-b5d8-1c2e3f4b5d6a', titulo: 'Guía de Despliegue en Producción', autor: 'Marta Sanz', tipo: 'ACTA', estado: 'VALIDADO', fechaRegistro: '2024-04-25' },
    { id: 'c51ce410-c124-4b5d-bf1a-2d3f4e5b6a7c', titulo: 'Factura 2024-0019', autor: 'Juan Gómez', tipo: 'INFORME', estado: 'REGISTRADO', fechaRegistro: '2024-03-17' }
  ]; */
  const [pagination, setPagination] = useState<PaginacionState>({
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    totalPages: 0,
  });  
  const [filters, setFilters] = useState<FiltrosBusqueda>({
    autor: '',
  });
  
  const url = useMemo(() => {
    const hasFilters = filters.autor.trim() !== '';
    
    if (hasFilters) {
      // Ruta con búsqueda
      const params = new URLSearchParams({
        autor: filters.autor,
        pagina: pagination.currentPage.toString(),
        tamanoPagina: pagination.itemsPerPage.toString(),
      });
      return `${VITE_API_URL}/documentos/buscar?${params.toString()}`;
    } else {
      // Ruta normal sin búsqueda
      return `${VITE_API_URL}/documentos?pagina=${pagination.currentPage}&tamano_pagina=${pagination.itemsPerPage}`;
    }
  }, [pagination.currentPage, pagination.itemsPerPage, filters.autor]);

  const {data} = useFetch<SuccessResponse| Documento[]>(url);

  const [autoresUnicos, setAutoresUnicos] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (Array.isArray(data)) {
      setAutoresUnicos(prev => {
        const newSet = new Set(prev);
        data.forEach(doc => newSet.add(doc.autor));
        return newSet;
      });
    }else{
      setAutoresUnicos(prev => {
        const newSet = new Set(prev);
        Array.from(data?.datos ?? []).forEach(doc => newSet.add(doc.autor));
        return newSet;
      });

    }
  }, [data]);

  const [currentDocument, setCurrentDocument] = useState<Documento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const filtrado_PaginadoDocs = useMemo(() => {
    // 1. Filtrar y ordenar
    const datos = Array.isArray(data) ? data : data?.datos ?? [];
    const tamano_pagina = Array.isArray(data) ? data.length : data?.tamano_pagina ?? pagination.itemsPerPage;
    const total = Array.isArray(data) ? data.length : data?.total ?? 0;
    
    Array.from(datos ?? [])
      .filter(doc => filters.autor === '' || doc.autor.toLowerCase().includes(filters.autor.toLowerCase()))
      .sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime());
    
    // 2. Calcular paginación
   
  
    const totalItems = total;
    const totalPages = Math.ceil(totalItems / (tamano_pagina ?? pagination.itemsPerPage));
    const currentPage = Math.min(pagination.currentPage, totalPages > 0 ? totalPages : 1);

    setPagination(prev => ({
      ...prev,
      totalItems,
      totalPages,
      currentPage,
    }));

    return datos ?? [];
  }, [data, filters.autor, pagination.itemsPerPage, pagination.currentPage]);

 useEffect(() => {
  if (data) {
    setPagination(prev => ({
      ...prev,
      totalItems: data.total,
      totalPages: Math.ceil(data.total / prev.itemsPerPage)
    }));
  }
}, [data]);

  const handleDeleteDocument = useCallback(async (id: string) => {
    // Usamos una alerta simple ya que el entorno prohíbe window.confirm()
    const isConfirmed = window.prompt('Para confirmar la eliminación, escriba "ELIMINAR"');
    if (isConfirmed === 'ELIMINAR') {
       const response = await fetch(`${VITE_API_URL}/documentos/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error(`Error al Eliminar: ${response.status}`);
          }

          console.log(`Documento ${id} eliminado exitosamente`);
    }
  }, []);

   const handleSaveDocument = useCallback( async(doc: Documento) => {
      try {
        if (doc.id) {
          const response = await fetch(`${VITE_API_URL}/documentos/${doc.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(doc),
          });

          if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.status}`);
          }

          console.log(`Documento ${doc.id} actualizado exitosamente`);
        } else {
          const nuevoDoc = { ...doc };          
          const response = await fetch(`${VITE_API_URL}/documentos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoDoc),
          });

          if (!response.ok) {
            throw new Error(`Error al crear: ${response.status}`);
          }

          const documentoCreado = await response.json();
          console.log('Documento creado:', documentoCreado);
        }
        
        // Cerrar modal
        setIsModalOpen(false);
        setCurrentDocument(null);
        
        // Recargar los datos para reflejar los cambios
        // Puedes forzar una recarga cambiando la URL o usando un estado de refresh
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Volver a página 1
        
      } catch (error) {
        console.error('Error al guardar documento:', error);
        alert(`Error al guardar el documento: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters(prev => ({ ...prev, autor: value }));
  };

  const handleClearFilters = () => {
    setFilters({ autor: ''});
  };

  const handleCreateClick = () => {
    setCurrentDocument(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (doc: Documento) => {
    setCurrentDocument(doc);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center">
        {/*   <FileText size={32} className="text-indigo-600 mr-3" />
         */}  Gestión de Documentos
        </h1>
        <p className="text-gray-500 mt-1">Simulación de API modularizada para CRUD y paginación.</p>
      </header>

     { <Filtros
        filters={filters}
        documents={Array.from(autoresUnicos).sort()}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onCreateClick={handleCreateClick}
      />}

      <Tabla
        documents={filtrado_PaginadoDocs}
        onEdit={handleEditClick}
        onDelete={handleDeleteDocument}
      />

     { <PaginacionControls
        pagination={pagination}
        onPageChange={handlePageChange}
      />}

      {/* Modal para Crear/Editar Documento */}
     { isModalOpen && (
        <Formulario
          document={currentDocument}
          onSave={handleSaveDocument}
          onClose={() => setIsModalOpen(false)}
        />
      )
      }
    </div>
  )
}

export default App
