"use client";

import useGetAccountsQuery from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import useGetCategories from "@/app/dashboard/categories/hooks/use-get-categories.query";
import DashboardSubMenu from "@/app/dashboard/components/dashboard-sub-menu";

function DashboardSubMenues() {
  const { data: accounts } = useGetAccountsQuery(true);
  const { data: categories } = useGetCategories();

  return (
    <>
      {accounts && <DashboardSubMenu data={accounts} type="accounts" />}
      {categories && <DashboardSubMenu data={categories} type="categories" />}
    </>
  );
}

export default DashboardSubMenues;
