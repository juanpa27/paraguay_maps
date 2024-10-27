import React, { useEffect, useState } from 'react';
import { supabase } from "../config/supabaseClient";
import MapCard from './MapCard';

const MapList = () => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("maps").select("*");
      if (error) throw error;
      setMaps(data);
    } catch (error) {
      setError("Error al cargar los mapas. Por favor, intente de nuevo más tarde.");
      console.error("Error fetching maps:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">Mapas de Paraguay</h1>
      <div className="space-y-6">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
    </div>
  );
};

export default MapList;