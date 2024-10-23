import React, { useState, useEffect, useRef } from "react";
import { addMap } from "../services/mapService";
import { useAuthStore } from "../store/useAuthStore";


const MapForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [extradata, setExtraData] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const user = useAuthStore((state) => state.user);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Efecto para ocultar el alert automáticamente después de 4 segundos
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000); // Oculta el alert después de 4 segundos
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsButtonDisabled(true);

    try {
      const mapData = {
        title,
        description,
        source,
        extradata,
        category,
        status,
        user_id: user?.id,
      };

      await addMap(mapData, image);

      // Mensaje de éxito
      setMessage({ text: "Mapa agregado correctamente.", type: "success" });
      // Limpiar el formulario
      setTitle("");
      setDescription("");
      setSource("");
      setExtraData("");
      setCategory("");
      setStatus(true);
      setImage(null);
      // Restablecer el campo de tipo `file`
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      setMessage({ text: `Error: ${err.message}`, type: "error" });
    } finally {
      setIsSubmitting(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Agregar un nuevo mapa</h2>

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
          <label htmlFor="categpry" className="label">
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
            <option value="Turismo">Turismo</option>
            <option value="Geografía">Geografía</option>
            <option value="Cultura">Cultura</option>
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
            required
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
          {isSubmitting ? "Enviando..." : "Agregar Mapa"}
        </button>
      </form>
    </div>
  );
};

export default MapForm;
