import { supabase } from "../config/supabaseClient";

export const addMap = async (mapData, image) => {
  try {
    // 1. Subir la imagen a Supabase Storage
    let image_url = "";
    if (image) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("maps_images") // Reemplaza con el nombre de tu bucket
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
    const { error: insertError } = await supabase
      .from("maps")
      .insert([{ ...mapData, image_url }]);

    if (insertError) {
      console.error(
        "Error al insertar los datos en la tabla maps:",
        insertError.message
      );
      throw new Error("Error al insertar los datos");
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

