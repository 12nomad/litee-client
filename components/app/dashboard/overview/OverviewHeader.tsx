"use client";

import CreateAccountFromButton from "@/components/app/dashboard/account/CreateAccountFromButton";
import useGetReports from "@/features/app/reports/useGetReports";
import { useUserStore } from "@/lib/stores/user.store";
import { useEffect } from "react";

function OverviewHeader() {
  const { user } = useUserStore();
  const { data } = useGetReports({ accountId: "18", from: "", to: "" });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold text-caribbean">
          Welcome back, {user?.username}!
        </h1>
        {/* <p className="text-black/70">This is your financial overview report</p> */}
        <p className="text-black/70">
          Looks like you have no accounts registered yet, let&apos;s get started
          by creating one...
        </p>
      </div>
      <CreateAccountFromButton />
    </div>
  );
}

export default OverviewHeader;
