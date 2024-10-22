import React, { useState } from 'react';
import { addMap } from '../services/mapService';
import { useAuthStore } from '../store/useAuthStore';

const MapForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [extraData, setExtraData] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const user = useAuthStore((state) => state.user);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mapData = {
        title,
        description,
        source,
        extraData,
        category,
        isActive,
        createdBy: user?.id, // Asegurarnos de que guardamos al usuario creador
        createdAt: new Date().toISOString(),
      };

      await addMap(mapData, image);

      // Mensaje de éxito
      setMessage('Mapa agregado correctamente.');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Agregar un nuevo mapa</h2>
      {message && <div className="alert alert-info mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Fuente</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Extra Data</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={extraData}
            onChange={(e) => setExtraData(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Categoría</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Seleccionar categoría</option>
            <option value="Turismo">Turismo</option>
            <option value="Geografía">Geografía</option>
            <option value="Cultura">Cultura</option>
          </select>
        </div>
        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Activo</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Imagen</span>
          </label>
          <input
            type="file"
            className="file-input w-full"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Agregar Mapa
        </button>
      </form>
    </div>
  );
};

export default MapForm;
