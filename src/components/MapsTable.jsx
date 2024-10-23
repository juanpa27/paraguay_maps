import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { supabase } from "../config/supabaseClient";

const MapsTable = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: mapsData, error } = await supabase.from("maps").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(mapsData);
    }
  };

  const handleEdit = (map) => {
    console.log("Editar:", map);
  };

  const handleToggleStatus = async (map) => {
    const { error } = await supabase
      .from("maps")
      .update({ status: !map.status })
      .eq("id", map.id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === map.id ? { ...item, status: !map.status } : item
        )
      );
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("title", {
      header: "Título",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("category", {
      header: "Categoría",
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("image_url", {
      header: "Imagen",
      cell: (info) => (
        <div className="avatar">
          <div className="w-16 rounded">
            <img src={info.getValue()} alt="Mapa" />
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => {
        const map = info.row.original;
        return (
          <div className="flex space-x-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(map)}
            >
              Editar
            </button>
            <button
              className={`btn btn-sm ${map.status ? 'btn-error' : 'btn-success'}`}
              onClick={() => handleToggleStatus(map)}
            >
              {map.status ? "Desactivar" : "Activar"}
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    enableGlobalFilter: true,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Tabla de Mapas</h2>
          <div className="form-control mb-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Buscar..."
                className="input input-bordered w-full"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer select-none flex items-center"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span className="ml-2">
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted()] ?? null}
                            </span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsTable;