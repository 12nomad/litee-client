"use client";

import CategoryHeader from "@/components/app/dashboard/category/CategoryHeader";
import { categoryDataColumns } from "@/components/app/dashboard/transactions/CategoryDataColumns";
import { DataTable } from "@/components/app/shared/DataTable";
import useGetCategory from "@/features/app/categories/getCategory/useGetCategory";
import useBulkDeleteMutation from "@/features/app/transactions/bulk-delete/useBulkDeleteTransactions";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { Row } from "@tanstack/react-table";

interface Props {
  categoryId: string;
}

function Category({ categoryId }: Props) {
  const { data: transactions, isLoading } = useGetCategory(categoryId);
  const { mutateAsync, isPending } = useBulkDeleteMutation();

  const handleRowsDelete = (row: Row<Transaction>[]) => {
    const ids = row.map((r) => r.original.id);
    mutateAsync({ transactionIds: ids });
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <CategoryHeader categoryData={transactions?.extra || null} />
      <DataTable
        columns={categoryDataColumns}
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

export default Category;
