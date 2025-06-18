import DashBoardMainWrapper from "@/components/app/dashboard/DashBoardMainWrapper";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const OverviewLayout = ({ children }: Props) => {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
};

export default OverviewLayout;
