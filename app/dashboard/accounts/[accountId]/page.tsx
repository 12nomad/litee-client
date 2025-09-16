import Account from "@/app/dashboard/accounts/[accountId]/components/account";

interface Props {
  params: {
    accountId: string;
  };
}

async function DashboardAccountsPage({ params }: Props) {
  const routeParams = await params;
  const accountId = routeParams.accountId;

  return <Account accountId={+accountId} />;
}

export default DashboardAccountsPage;
