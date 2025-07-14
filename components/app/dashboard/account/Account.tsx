"use client";

import { accountDataColumns } from "@/components/app/dashboard/account/AccountDataColumns";
import AccountHeader from "@/components/app/dashboard/account/AccountHeader";
import { DataTable } from "@/components/app/shared/DataTable";
import useGetAccount from "@/features/app/accounts/getAccount/useGetAccount";
import useBulkDeleteMutation from "@/features/app/transactions/bulk-delete/useBulkDeleteTransactions";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { Row } from "@tanstack/react-table";

interface Props {
  accountId: string;
}

function Account({ accountId }: Props) {
  const { data: transactions, isLoading } = useGetAccount(accountId);
  const { mutateAsync, isPending } = useBulkDeleteMutation();

  const handleRowsDelete = (row: Row<Transaction>[]) => {
    const ids = row.map((r) => r.original.id);
    mutateAsync({ transactionIds: ids });
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <AccountHeader accountData={transactions?.extra || null} />
      <DataTable
        columns={accountDataColumns}
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

export default Account;
