import type { Documento } from "../Entidades/Documento";

interface TablaProps {
    documents: Documento[];
    onEdit: (document: Documento) => void;
    onDelete: (id: string) => void;
}

const Tabla = ( {   documents, onEdit, onDelete}: TablaProps ) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Autor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Fecha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {documents.length > 0 ? (
                    documents.map(doc => (
                        <tr key={doc.id} className="hover:bg-indigo-50 transition duration-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.titulo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            <div className="flex items-center">{doc.autor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            <div className="flex items-center">{doc.tipo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full `}>
                              {doc.estado}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{doc.fechaRegistro}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => onEdit(doc)}
                                className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition duration-150"
                                title="Editar"
                                aria-label={`Editar documento ${doc.titulo}`}
                            >
                                Editar
                            </button>
                            <button
                             onClick={() => onDelete(doc.id)}
                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition duration-150"
                                title="Eliminar"
                                aria-label={`Eliminar documento ${doc.titulo}`}
                            >
                                Eliminar
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : 
                    (
                    <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No se encontraron documentos que coincidan con los filtros.
                        </td>
                    </tr>
                    )
                }
            </tbody>
            </table>
        </div>
    );
};

export default Tabla;