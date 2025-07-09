"use client";

import DashboardSubMenu from "@/components/app/dashboard/DashboardSubMenu";
import useGetAccounts from "@/features/app/accounts/getAccounts/useGetAccounts";
import useGetCategories from "@/features/app/categories/get-categories/useGetCategories";

function DashboardSubMenues() {
  const { data: accounts } = useGetAccounts(true);
  const { data: categories } = useGetCategories();

  return (
    <>
      {accounts && <DashboardSubMenu data={accounts} type="accounts" />}
      {categories && <DashboardSubMenu data={categories} type="categories" />}
    </>
  );
}

export default DashboardSubMenues;
