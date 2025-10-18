# 📂 Gestión de Documentos (React + Tailwind CSS)

Esta aplicación es un sistema de gestión de documentos simple (simulación de CRUD) desarrollado en React con TypeScript (.jsx), utilizando **Tailwind CSS** para un diseño responsivo y moderno. La estructura del código está modularizada en componentes funcionales para facilitar su comprensión y mantenimiento, a pesar de estar contenidos en un solo archivo.

---

## 🧱 Estructura de Componentes

La aplicación sigue un patrón de "contenedor/presentación" donde el componente principal (`App`) maneja el estado y la lógica de negocio, y los componentes hijos se encargan de la interfaz de usuario y la interacción.

### 1. App (Componente Contenedor Principal)

Es el corazón de la aplicación y maneja todo el estado global, la lógica de filtrado y la simulación de la comunicación con la API.

| Estado/Hook | Descripción |
|-------------|-------------|
| `filters` | Objeto que almacena los valores de búsqueda (`autor`). |
| `pagination` | Objeto que rastrea la página actual, ítems por página y totales. |
| `useEffect` (`data`) | Actualiza el estado de `filtrado_PaginadoDocs` con los datos de la API.
| `useState` (`filtrado_PaginadoDocs`) | Aplica secuencialmente filtrado, ordenación (por fecha) y paginación a la lista de documentos. |
| `handleSaveDocument` | Lógica para Crear (POST) o Actualizar (PUT) un documento en el array `filtrado_PaginadoDocs`.
| `handleDeleteDocument` | Lógica para Eliminar (DELETE) un documento en el array `filtrado_PaginadoDocs`.
| `handleFilterChange` | Envía los cambios de filtrado a la API para actualizar el estado `filtrado_PaginadoDocs`.
| `handleClearFilters` | Envía un evento a la API para limpiar los filtros.
| `handleCreateClick` | Envía un evento a la API para crear un nuevo documento.
| `handlePageChange` | Envía los cambios de paginación a la API para actualizar el estado `filtrado_PaginadoDocs`.
| `useMemo (`url`)` | Solicita los datos de la API y actualiza el estado `data`.

---

### 2. Formulario (Modal de CRUD)

Responsable de la interfaz para la creación y edición de documentos.

| Propósito | Detalles |
|-----------|---------|
| `documents` | Si se recibe un documento, el modal está en modo Edición. Si es `null`, está en modo Creación. |
| Validación | Incluye validación de campos (`titulo` y `autor`) antes de invocar la función `onSave`. |
| `onSave / onClose` | Recibe funciones del componente `App` para persistir los cambios o cerrar el modal. |

---

### 3. Filter (Barra de Búsqueda y Filtros)

Componente de presentación que gestiona la entrada de datos para la búsqueda y el filtrado avanzado.

| Interfaz | Función |
|-----------|--------|
| Filtros Avanzados | Selectores para filtrar por `autor`. |
| Botones | "Nuevo Documento" (`onCreateClick`) y "Limpiar Filtros" (`onClearFilters`). |
| `onFilterChange` | Envía los cambios de vuelta a `App` para actualizar el estado `filters`. |

---

### 4. Tabla (Tabla de Datos)

Se encarga únicamente de renderizar la tabla de documentos paginados y filtrados.

| Elemento | Función |
|----------|--------|
| Encabezados | Muestra las columnas del documento de forma responsiva (ocultando algunas en móviles). |
| Filas | Itera sobre el array de documentos (`documents`) recibido por props. |
| Acciones | Botones de Editar (`onEdit`) y Eliminar (`onDelete`), que comunican la acción al componente `App`. |
| Estado Visual | Utiliza clases de Tailwind dinámicas (`statusColors`) para mostrar el estado del documento con un color distintivo. |

---

### 5. PaginacionControls (Controles de Paginación)

Muestra información sobre la página actual y provee los botones para navegar.

| Datos Mostrados | Controles |
|-----------------|-----------|
| Rango de ítems | Muestra el rango actual de ítems (Ej: "Mostrando 1 a 10 de 20"). |
| Botones | "Anterior" (`&lt;`) y "Siguiente" (`&gt;`). |
| Estado de Página | Indica la página actual y el total (Ej: "Página 1 de 2"). |
| `onPageChange` | Llama a la función proporcionada por `App` para actualizar `currentPage`. |

---

## 🛠️ Tecnologías

- **React + Hooks**: Utiliza `useState`, `useEffect`, `useMemo` y `useCallback` para la gestión de estado y optimización.
- **TypeScript**: Tipado estricto (`interface`, `type`) para mejorar la robustez del código.
- **Tailwind CSS**: Estilizado moderno y totalmente responsivo.
