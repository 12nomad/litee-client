"use client";

import { transactionsDataColumns } from "@/components/app/dashboard/transactions/TransactionsDataColumns";
import TransactionsHeader from "@/components/app/dashboard/transactions/TransactionsHeader";
import { DataTable } from "@/components/app/shared/DataTable";
import useBulkDeleteMutation from "@/features/app/transactions/bulk-delete/useBulkDeleteTransactions";
import useGetTransactions, {
  Transaction,
} from "@/features/app/transactions/getTransactions/useGetTransactions";
import { Row } from "@tanstack/react-table";

function Transactions() {
  const { data: transactions, isLoading } = useGetTransactions();
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
