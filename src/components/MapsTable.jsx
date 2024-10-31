import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useOutletContext } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Edit } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useMapsData } from '../hooks/useMapsData';

const MapsTable = () => {
  const { handleEdit } = useOutletContext();
  const {
    data,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    toggleStatus,
  } = useMapsData();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("title", {
      header: "Título",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor("category", {
      header: "Categoría",
      cell: (info) => <span className="whitespace-normal">{info.getValue()}</span>,
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha",
      cell: (info) => (
        <span className="whitespace-normal">
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
      ),
    }),
    columnHelper.accessor("image_url", {
      header: "Imagen",
      cell: (info) => (
        <PhotoProvider>
          <PhotoView src={info.getValue()}>
            <div className="avatar cursor-pointer">
              <div className="w-12 md:w-16 rounded">
                <img src={info.getValue()} alt="Mapa" className="object-cover" />
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
          <div className="flex flex-col xs:flex-row gap-2">
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(map)}
              aria-label="Editar"
            >
              <Edit className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <button
              className={`btn btn-xs ${map.status ? 'btn-error' : 'btn-success'} text-xs`}
              onClick={() => toggleStatus(map)}
            >
              {map.status ? "Inactivar" : "Activar"}
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
    <div className="w-full p-2 md:p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-2 md:p-6">
          <h2 className="card-title text-xl md:text-2xl font-bold mb-4">Tabla de Mapas</h2>
          
          {/* Search Bar and Page Size Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="form-control w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="input input-bordered w-full pl-10 text-sm"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm whitespace-nowrap">Registros por página:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="select select-bordered select-xs md:select-sm text-xs md:text-sm"
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="table table-zebra w-full text-sm md:text-base">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th 
                        key={header.id} 
                        className="bg-primary text-primary-content text-xs md:text-sm p-2 md:p-4"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer select-none flex items-center"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="ml-1 text-xs">
                              {{
                                asc: "↑",
                                desc: "↓",
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
                      <td key={cell.id} className="p-2 md:p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-1">
              <button
                className="btn btn-xs md:btn-sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-3 w-3 md:h-4 md:w-4" />
              </button>
              <button
                className="btn btn-xs md:btn-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
              </button>
              <button
                className="btn btn-xs md:btn-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </button>
              <button
                className="btn btn-xs md:btn-sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-3 w-3 md:h-4 md:w-4" />
              </button>
            </div>

            <span className="text-xs md:text-sm whitespace-nowrap">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsTable;