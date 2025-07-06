"use client";

import { DataColumns } from "@/components/app/dashboard/account/DataColumns";
import AccountHeader from "@/components/app/dashboard/accounts/AccountHeader";
import { DataTable } from "@/components/app/shared/DataTable";
import useGetAccount from "@/features/app/accounts/getAccount/useGetAccount";
import useBulkDeleteMutation from "@/features/app/transactions/useBulkDeleteTransactions";
import { Transaction } from "@/features/app/transactions/useGetTransactions";
import { Row } from "@tanstack/react-table";

interface Props {
  accountId: string;
}

// const data: IAccount[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "828ax58f",
//     amount: 102,
//     status: "processing",
//     email: "a@example.com",
//   },
// ];

function Account({ accountId }: Props) {
  console.log("accountId :", accountId);

  const { data: account, isLoading } = useGetAccount(accountId);
  const { mutateAsync, isPending } = useBulkDeleteMutation();

  if (isLoading) return <p>loading...</p>;

  const handleRowsDelete = (row: Row<Transaction>[]) => {
    const ids = row.map((r) => r.original.id);
    mutateAsync({ transactionIds: ids });
  };

  return (
    <div>
      <AccountHeader accountData={account?.data} />
      <DataTable
        columns={DataColumns}
        data={account?.data.transactions || []}
        filterKey="description"
        handleRowsDelete={handleRowsDelete}
        isBulkDeleteDisabled={isPending}
      />
    </div>
  );
}

export default Account;
