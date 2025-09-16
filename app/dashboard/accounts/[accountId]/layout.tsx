import { ReactNode } from "react";
import DashBoardMainWrapper from "@/app/dashboard/components/dashboard-main-wrapper";

interface Props {
  children: ReactNode;
}

function DashboardAccountsLayout({ children }: Props) {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
}

export default DashboardAccountsLayout;
