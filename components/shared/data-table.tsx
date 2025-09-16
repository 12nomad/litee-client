"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PaginatedData } from "@/interfaces/PaginatedData";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import useConfirm from "@/components/shared/hooks/useConfirm";
import CreateTransactionFromButton from "@/app/dashboard/transactions/components/create-transaction-from-button";
import CreateTransactionModal from "@/app/dashboard/transactions/components/create-transaction-modal";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";

type Filters = "description";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: Filters;
  handleRowsDelete: (rows: Row<TData>[]) => void;
  isBulkDeleteDisabled: boolean;
  paginationData: Partial<
    Pick<
      PaginatedData<Transaction, null>,
      "currentPage" | "pageSize" | "totalCount" | "totalPages"
    >
  >;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  handleRowsDelete,
  paginationData,
  isBulkDeleteDisabled = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });
  const [confirm, ConfirmDialog] = useConfirm({
    message:
      "Are you sure you want to delete the selected rows? This action cannot be undone.",
    title: "Delete row(s)?",
  });

  const handleDelete = async () => {
    const canProceed = await confirm();
    if (!canProceed) return;

    await handleRowsDelete(table.getFilteredSelectedRowModel().rows);
    table.resetRowSelection();
  };

  return (
    <div>
      <ConfirmDialog />
      <CreateTransactionModal />
      <div className="flex items-center justify-between py-4">
        <Input
          type="search"
          name="filter"
          placeholder={`Filter ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
        />
        <CreateTransactionFromButton />
      </div>
      <div className="rounded-md border">
        <Table className="border rounded-md overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2 flex justify-between items-center w-full">
        <p className="text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
        <p className="text-sm ml-auto">
          {paginationData.currentPage} of {paginationData.totalPages} page(s)
        </p>
        <div></div>
      </div>

      <div
        className={`flex items-center ${
          table.getFilteredSelectedRowModel().rows.length > 0
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            variant="danger"
            disabled={isBulkDeleteDisabled}
            onClick={handleDelete}
          >
            <TrashIcon className="size-4" />
            Delete {table.getFilteredSelectedRowModel().rows.length} row(s)
          </Button>
        )}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
