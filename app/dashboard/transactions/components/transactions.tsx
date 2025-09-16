"use client";

import { Row } from "@tanstack/react-table";
import { transactionsDataColumns } from "@/app/dashboard/transactions/components/transactions-data-columns";
import useGetTransactionsQuery, {
  Transaction,
} from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import useBulkDeleteMutation from "@/app/dashboard/transactions/hooks/use-bulk-delete-transactions.mutation";
import { DataTable } from "@/components/shared/data-table";
import TransactionsHeader from "@/app/dashboard/transactions/components/transactions-header";

function Transactions() {
  const { data: transactions, isLoading } = useGetTransactionsQuery();
  const { mutateAsync, isPending } = useBulkDeleteMutation();

  const handleRowsDelete = (row: Row<Transaction>[]) => {
    const ids = row.map((r) => r.original.id);
    mutateAsync({ transactionIds: ids });
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <TransactionsHeader />
      <DataTable
        columns={transactionsDataColumns}
        data={transactions?.data || []}
        filterKey="description"
        handleRowsDelete={handleRowsDelete}
        isBulkDeleteDisabled={isPending}
        paginationData={{
          currentPage: transactions?.currentPage,
          pageSize: transactions?.pageSize,
          totalPages: transactions?.totalPages,
          totalCount: transactions?.totalCount,
        }}
      />
    </div>
  );
}

export default Transactions;
