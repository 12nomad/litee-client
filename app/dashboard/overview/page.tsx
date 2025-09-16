import OverviewHeader from "@/app/dashboard/overview/components/overview-header";
import CreateAccountModal from "@/app/dashboard/accounts/components/create-account-modal";
import Overview from "@/app/dashboard/overview/components/overview";

function OverviewPage() {
  return (
    <div>
      <OverviewHeader />
      <CreateAccountModal />
      <Overview />
    </div>
  );
}

export default OverviewPage;
