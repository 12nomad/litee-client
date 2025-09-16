"use client";

import { Row } from "@tanstack/react-table";
import useGetCategoryQuery from "@/app/dashboard/categories/hooks/use-get-category.query";
import useBulkDeleteMutation from "@/app/dashboard/transactions/hooks/use-bulk-delete-transactions.mutation";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { categoryDataColumns } from "@/app/dashboard/categories/[categoryId]/components/category-data-columns";
import { DataTable } from "@/components/shared/data-table";
import CategoryHeader from "@/app/dashboard/categories/[categoryId]/components/category-header";

interface Props {
  categoryId: number;
}

function Category({ categoryId }: Props) {
  const { data: transactions, isLoading } = useGetCategoryQuery(categoryId);
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
