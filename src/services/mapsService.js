import { supabase } from '../config/supabaseClient';

export const fetchMapsData = async () => {
  const { data: mapsData, error } = await supabase.from("maps").select("*");
  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return mapsData;
};

export const updateMapStatus = async (mapId, newStatus) => {
  const { error } = await supabase.from("maps").update({ status: newStatus }).eq("id", mapId);
  if (error) {
    console.error("Error updating status:", error);
    return false;
  }
  return true;
};
