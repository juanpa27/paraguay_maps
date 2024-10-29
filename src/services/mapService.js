import { supabase } from "../config/supabaseClient";

export const addMap = async (mapData, image) => {
  try {
    // 1. Subir la imagen a Supabase Storage
    let image_url = "";
    if (image) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("maps_images")
        .upload(`${Date.now()}_${image.name}`, image);

      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError.message);
        throw new Error("Error al subir la imagen");
      }

      // Obtener la URL pública de la imagen
      const { data: urlData, error: urlError } = supabase.storage
        .from("maps_images")
        .getPublicUrl(uploadData.path);

      if (urlError) {
        console.error("Error al obtener la URL pública de la imagen:", urlError.message);
        throw new Error("Error al obtener la URL pública de la imagen");
      }

      image_url = urlData.publicUrl || "";
      console.log("URL de la imagen:", image_url);
    }

    // 2. Insertar el registro en la tabla "maps"
    // Aquí aseguramos que no se pasa el campo `id`
    const { id, ...mapDataWithoutId } = mapData;

    const { error: insertError } = await supabase
      .from("maps")
      .insert([{ ...mapDataWithoutId, image_url }]);

    if (insertError) {
      console.error("Error al insertar los datos en la tabla maps:", insertError.message);
      throw new Error("Error al insertar los datos");
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const editMap = async (mapData, image) => {
  try {
    let image_url = mapData.image_url;

    // Si se proporciona una nueva imagen, primero la subimos
    if (image) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("maps_images")
        .upload(`${Date.now()}_${image.name}`, image);

      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError.message);
        throw new Error("Error al subir la imagen");
      }

      // Obtener la URL pública de la nueva imagen
      const { data: urlData, error: urlError } = supabase.storage
        .from("maps_images")
        .getPublicUrl(uploadData.path);

      if (urlError) {
        console.error("Error al obtener la URL pública de la imagen:", urlError.message);
        throw new Error("Error al obtener la URL pública de la imagen");
      }

      image_url = urlData.publicUrl || '';
    }

    // Actualizar el registro en la tabla `maps`
    const { error: updateError } = await supabase
      .from("maps")
      .update({
        title: mapData.title,
        description: mapData.description,
        source: mapData.source,
        extradata: mapData.extradata,
        category: mapData.category,
        status: mapData.status,
        image_url: image_url,
      })
      .eq("id", mapData.id) // Usar `id` solo para identificar el registro
      .eq("user_id", mapData.user_id); // Validar que el usuario autenticado sea el propietario

    if (updateError) {
      console.error("Error al actualizar los datos en la tabla maps:", updateError.message);
      throw new Error("Error al actualizar los datos");
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};