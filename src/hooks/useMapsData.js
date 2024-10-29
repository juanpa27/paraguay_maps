import { useState, useEffect } from 'react';
import { fetchMapsData, updateMapStatus } from '../services/mapsService';

export const useMapsData = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMapsData();
      setData(result);
    };
    fetchData();
  }, []);

  const toggleStatus = async (map) => {
    const success = await updateMapStatus(map.id, !map.status);
    if (success) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === map.id ? { ...item, status: !map.status } : item
        )
      );
    }
  };

  return {
    data,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    toggleStatus,
  };
};
