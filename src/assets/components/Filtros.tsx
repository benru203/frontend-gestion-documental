import type {  FiltrosBusqueda } from "../Entidades/Documento";


interface FiltrosProps {
    filters: FiltrosBusqueda;
    documents: string[];
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    onClearFilters: () => void;
    onCreateClick: () => void;
}

const Filtros = ({ filters, documents, onFilterChange, onClearFilters, onCreateClick }: FiltrosProps) => {

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      {/* Búsqueda General por título */}
     {/*  <div className="relative w-full sm:w-80 mb-4 sm:mb-0">
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={onFilterChange}
          placeholder="Buscar por título..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div> */}

      {/* Botón de Creación */}
      <button
        onClick={onCreateClick}
        className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 flex items-center justify-center"
      >
        Nuevo Documento
      </button>
    </div>

    {/* Búsqueda Avanzada */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
      <label htmlFor="filter-autor" className="sr-only">Autor</label>
      <select
        id="filter-autor"
        name="autor"
        value={filters.autor}
        onChange={onFilterChange}
        aria-label="Autor"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
      >
        <option value="">-- Autor (Todos) --</option>
        {documents.map(autor => (
            <option key={autor} value={autor}>{autor}</option>
        ))}
      </select>

      <button
        onClick={onClearFilters}
        className="px-4 py-2 text-sm bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150 flex items-center justify-center"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
    );

};

export default Filtros;