import { supabase } from '../config/supabaseClient';

export const addMap = async (mapData, image) => {
  try {
    // 1. Subir la imagen a Supabase Storage
    let imageUrl = '';
    if (image) {
      const { data, error } = await supabase.storage
        .from('maps_images') // Reemplaza con el nombre del bucket que hayas creado
        .upload(`${Date.now()}_${image.name}`, image);

      if (error) {
        console.error('Error al subir la imagen:', error.message);
        throw new Error('Error al subir la imagen');
      }

      imageUrl = data?.path ? `${supabase.storage.from('maps_images').getPublicUrl(data.path).publicURL}` : '';
    }

    // 2. Insertar el registro en la tabla "maps"
    const { error: insertError } = await supabase
      .from('maps')
      .insert([{ ...mapData, imageUrl }]);

    if (insertError) {
      throw new Error('Error al insertar los datos');
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};
