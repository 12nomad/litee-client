"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import Button from "@/components/app/shared/Button";
import Actions from "@/components/app/dashboard/account/Actions";
import { formatToLocaleDate, fromMiliUnits } from "@/lib/utils";

export const accountDataColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="-ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(
        fromMiliUnits(row.getValue("amount"))?.toString()
      );
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className={`${amount < 0 ? "text-crimson" : "text-caribbean"}`}>
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "payee",
    header: "Payee",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = formatToLocaleDate(new Date(row.getValue("date")));

      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];
