import React, { useEffect } from "react";
import { useMapForm } from "../hooks/useMapForm";
import categories from "../config/categories.json";

const MapForm = ({ mapData, onClose }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    source,
    setSource,
    extradata,
    setExtraData,
    category,
    setCategory,
    status,
    setStatus,
    message,
    isSubmitting,
    isButtonDisabled,
    fileInputRef,
    handleImageChange,
    handleSubmit,
  } = useMapForm(mapData); // Pasar mapData al hook personalizado para inicializar valores

  useEffect(() => {
    if (mapData) {
      setTitle(mapData.title);
      setDescription(mapData.description);
      setSource(mapData.source);
      setExtraData(mapData.extradata);
      setCategory(mapData.category);
      setStatus(mapData.status);
    }
  }, [
    mapData,
    setTitle,
    setDescription,
    setSource,
    setExtraData,
    setCategory,
    setStatus,
  ]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {mapData ? "Editar Mapa" : "Agregar un nuevo mapa"}
        </h2>
        {onClose && (
          <button onClick={onClose} className="btn btn-ghost btn-xs">
            Cerrar
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label htmlFor="titulo" className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="desciption" className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            id="desciption"
            name="desciption"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="source" className="label">
            <span className="label-text">Fuente</span>
          </label>
          <input
            id="source"
            name="source"
            type="text"
            className="input input-bordered w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="extradata" className="label">
            <span className="label-text">Extra Data</span>
          </label>
          <input
            id="extradata"
            name="extradata"
            type="text"
            className="input input-bordered w-full"
            value={extradata}
            onChange={(e) => setExtraData(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="category" className="label">
            <span className="label-text">Categoría</span>
          </label>
          <select
            id="category"
            name="category"
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar categoría
            </option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mb-4">
          <label htmlFor="status" className="cursor-pointer label">
            <span className="label-text">Activo</span>
            <input
              id="status"
              name="status"
              type="checkbox"
              className="toggle toggle-primary"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </label>
        </div>
        <div className="form-control mb-4">
          <label htmlFor="image_url" className="label">
            <span className="label-text">Imagen</span>
          </label>
          <input
            ref={fileInputRef}
            id="image_url"
            name="image_url"
            type="file"
            className="file-input file-input-bordered file-input-secondary w-full"
            onChange={handleImageChange}
            required={!mapData} // Solo requerido si estamos agregando un nuevo mapa
          />
        </div>
        {message.text && (
          <div
            className={`alert mt-4 mb-4 ${
              message.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{message.text}</span>
            </div>
          </div>
        )}
        <button
          type="submit"
          className={`btn w-full ${
            isButtonDisabled
              ? "btn btn-disabled bg-gray-300 text-gray-500"
              : "btn btn-primary"
          }`}
          disabled={isButtonDisabled}
        >
          {isSubmitting
            ? "Enviando..."
            : mapData
            ? "Guardar Cambios"
            : "Agregar Mapa"}
        </button>
      </form>
    </div>
  );
};

export default MapForm;
