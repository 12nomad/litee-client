import DashBoardMainWrapper from "@/app/dashboard/components/dashboard-main-wrapper";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DashboardCategoriesLayout({ children }: Props) {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
}

export default DashboardCategoriesLayout;
