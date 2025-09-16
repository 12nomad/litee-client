"use client";

import { Row } from "@tanstack/react-table";
import useGetAccountQuery from "@/app/dashboard/accounts/hooks/use-get-account.query";
import useBulkDeleteMutation from "@/app/dashboard/transactions/hooks/use-bulk-delete-transactions.mutation";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { accountDataColumns } from "@/app/dashboard/accounts/[accountId]/components/account-data-columns";
import { DataTable } from "@/components/shared/data-table";
import AccountHeader from "@/app/dashboard/accounts/[accountId]/components/account-header";

interface Props {
  accountId: number;
}

function Account({ accountId }: Props) {
  const { data: transactions, isLoading } = useGetAccountQuery(accountId);
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
