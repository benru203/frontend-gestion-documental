
import { useState } from "react";
import { EstadoDocumentos, TipoDocumentos, type Documento } from "../Entidades/Documento";


interface FormularioProps {
    document: Documento | null;
    onSave: (document: Documento) => void;
    onClose: () => void;
}

const Formulario = ({ document, onSave, onClose }: FormularioProps) => {

    const [formData, setFormData] = useState<Omit<Documento, 'id'>>(() => ({
        titulo: document?.titulo || '',
        autor: document?.autor || '',
        tipo: document?.tipo || TipoDocumentos[0],
        estado: document?.estado || EstadoDocumentos[0],
        fechaRegistro: document?.fechaRegistro || new Date().toISOString(),
    }));
    const [errors, setErrors] = useState<Record<string, string>>({});

    const isEditing = !!document;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio.';
        if (!formData.autor.trim()) newErrors.autor = 'El autor es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }; 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const savedDoc: Documento = {
            ...formData,
            id: document?.id ?? '',
        };   
        onSave(savedDoc);
    };

    return(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEditing ? 'Editar Documento' : 'Crear Nuevo Documento'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition duration-150">
                    x
                </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Form fields (Title, Author, Date, Type, Status) - Mismo código que antes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="titulo">Título</label>
                        <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.titulo ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Título del documento"
                        />
                        {errors.titulo && <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="autor">Autor</label>
                        <input
                        type="text"
                        id="autor"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${errors.autor ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nombre del autor"
                        />
                        {errors.autor && <p className="text-xs text-red-500 mt-1">{errors.autor}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tipo">Tipo</label>
                        <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                        {TipoDocumentos.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="estado">Estado</label>
                        <select
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        >
                        {EstadoDocumentos.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                        </select>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 flex items-center"
                        >
                            { isEditing ? <>Actualizar</> :<>Crear</>}
                        </button>
                    </div>    
                   
                </form>
            </div>
        </div>

    );
};

export default Formulario;