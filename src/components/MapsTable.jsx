import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { supabase } from "../config/supabaseClient";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

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
        <PhotoProvider>
          <PhotoView src={info.getValue()}>
            <div className="avatar cursor-pointer">
              <div className="w-16 rounded">
                <img src={info.getValue()} alt="Mapa" />
              </div>
            </div>
          </PhotoView>
        </PhotoProvider>
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
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(map)}
            >
              Editar
            </button>
            <button
              className={`btn btn-xs ${map.status ? 'btn-error' : 'btn-success'}`}
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
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    enableGlobalFilter: true,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Tabla de Mapas</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="form-control w-full max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="input input-bordered w-full max-w-xs pl-10"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="bg-primary text-primary-content">
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
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
            <span className="flex items-center gap-1">
              <div>Página</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} de{' '}
                {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="select select-bordered select-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsTable;