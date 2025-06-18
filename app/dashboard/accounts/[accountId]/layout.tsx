import { ReactNode } from "react";
import DashBoardMainWrapper from "@/components/app/dashboard/DashBoardMainWrapper";

interface Props {
  children: ReactNode;
}

function DashboardAccountsLayout({ children }: Props) {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
}

export default DashboardAccountsLayout;
