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
   const [filtrado_PaginadoDocs, setFiltrado_PaginadoDocs] = useState<Documento[]>([]);
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
 

  /* const filtrado_PaginadoDocs = useMemo(() => {
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
  }, [data, filters.autor, pagination.itemsPerPage, pagination.currentPage]); */

 useEffect(() => {
   if (!data) return;

    const datos = Array.isArray(data) ? data : data?.datos ?? [];
    const tamano_pagina = Array.isArray(data) ? data.length : data?.tamano_pagina ?? pagination.itemsPerPage;
    const total = Array.isArray(data) ? data.length : data?.total ?? 0;
    
    // Aplicar filtros y ordenamiento
    const filtered = Array.from(datos)
      .filter(doc => filters.autor === '' || doc.autor.toLowerCase().includes(filters.autor.toLowerCase()))
      .sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime());
    
    // Actualizar documentos filtrados
    setFiltrado_PaginadoDocs(filtered);
    
    // Calcular y actualizar paginación
    const totalItems = total;
    const totalPages = Math.ceil(totalItems / tamano_pagina);
    const currentPage = Math.min(pagination.currentPage, totalPages > 0 ? totalPages : 1);

    setPagination(prev => ({
      ...prev,
      totalItems,
      totalPages,
      currentPage,
    }));
  }, [data, filters.autor, pagination.itemsPerPage, pagination.currentPage]);

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
          setFiltrado_PaginadoDocs(prev => prev.filter(doc => doc.id !== id));
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
          setFiltrado_PaginadoDocs(prev => 
            prev.map(d => d.id === doc.id ? doc : d)
          );
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
