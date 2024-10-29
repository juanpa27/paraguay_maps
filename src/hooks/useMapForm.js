import { useState, useEffect, useRef } from "react";
import { addMap, editMap } from "../services/mapService";
import { useAuthStore } from "../store/useAuthStore";

export const useMapForm = (initialMapData = null) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [extradata, setExtraData] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fileInputRef = useRef(null);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (initialMapData) {
      setTitle(initialMapData.title);
      setDescription(initialMapData.description);
      setSource(initialMapData.source);
      setExtraData(initialMapData.extradata);
      setCategory(initialMapData.category);
      setStatus(initialMapData.status);
    }
  }, [initialMapData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsButtonDisabled(true);

    try {
      // Crear `mapData` sin el `id` para inserción
      const mapData = {
        title,
        description,
        source,
        extradata,
        category,
        status,
        user_id: user?.id, // Necesitamos asociar el mapa al usuario autenticado
        image_url: initialMapData?.image_url || "", // Mantiene la URL si ya existe
      };

      if (initialMapData) {
        // Modo edición
        // En modo edición, el `id` se utiliza para identificar el registro a actualizar, no para modificarlo
        await editMap({ ...mapData, id: initialMapData.id }, image);
        setMessage({
          text: "Mapa actualizado correctamente.",
          type: "success",
        });
      } else {
        // Modo agregar (inserción)
        await addMap(mapData, image);
        setMessage({ text: "Mapa agregado correctamente.", type: "success" });
      }

      // Limpiar el formulario
      setTitle("");
      setDescription("");
      setSource("");
      setExtraData("");
      setCategory("");
      setStatus(true);
      setImage(null);

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

  return {
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
    image,
    message,
    isSubmitting,
    isButtonDisabled,
    fileInputRef,
    handleImageChange,
    handleSubmit,
  };
};
