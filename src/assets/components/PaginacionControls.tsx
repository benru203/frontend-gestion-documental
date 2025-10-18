import type { PaginacionState } from "../Entidades/Documento";

interface PaginacionControlsProps {
    pagination: PaginacionState;
    onPageChange: (newPage: number) => void;
}
const PaginacionControls = ({ pagination, onPageChange }: PaginacionControlsProps) => {

    return(
         <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-md">
            <div className="text-sm text-gray-600">
            Mostrando {pagination.totalItems > 0 ? (pagination.currentPage - 1) * pagination.itemsPerPage + 1 : 0} a{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} de{' '}
            {pagination.totalItems} documentos
            </div>
            <div className="flex items-center space-x-2">
            <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                aria-label="Página anterior"
            >
                &lt;
            </button>

            <span className="text-gray-700 font-medium">
                Página {pagination.totalPages > 0 ? pagination.currentPage : 0} de {pagination.totalPages}
            </span>

            <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                aria-label="Página siguiente"
            >
                &gt;
            </button>
            </div>
        </div>
    );
}

export default PaginacionControls;