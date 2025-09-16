import { ReactNode } from "react";
import DashBoardMainWrapper from "@/app/dashboard/components/dashboard-main-wrapper";

interface Props {
  children: ReactNode;
}

const TransactionsLayout = ({ children }: Props) => {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
};

export default TransactionsLayout;
