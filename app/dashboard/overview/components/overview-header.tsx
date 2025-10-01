"use client";

import { useUserStore } from "@/lib/stores/user.store";
import CreateAccountFromButton from "@/app/dashboard/accounts/components/create-account-from-button";
import useGetAccountsQuery from "@/app/dashboard/accounts/hooks/use-get-accounts.query";

function OverviewHeader() {
  const { user } = useUserStore();
  const { data, isPending, isLoading } = useGetAccountsQuery(true);

  return (
    <div className="flex justify-between items-center mb-4">
      {!isPending && !isLoading && data && data?.length > 0 ? (
        <h1 className="text-xl font-bold">
          Welcome in, <span className="capitalize">{user?.username}</span>
        </h1>
      ) : (
        <>
          <div>
            <h1 className="text-xl font-bold capitalize">
              Welcome in, {user?.username}
            </h1>
            {/* <p className="text-black/70">This is your financial overview report</p> */}
            <p className="text-black/70">
              Looks like you have no accounts registered yet, let&apos;s get
              started by creating one...
            </p>
          </div>
          <CreateAccountFromButton />
        </>
      )}
    </div>
  );
}

export default OverviewHeader;
