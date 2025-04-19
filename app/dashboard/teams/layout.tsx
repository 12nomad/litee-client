import DashBoardMainWrapper from "@/components/dashboard/DashBoardMainWrapper";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TeamsLayout = ({ children }: Props) => {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
};

export default TeamsLayout;
