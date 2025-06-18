import DashBoardMainWrapper from "@/components/app/dashboard/DashBoardMainWrapper";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MajulaLayout = ({ children }: Props) => {
  return <DashBoardMainWrapper>{children}</DashBoardMainWrapper>;
};

export default MajulaLayout;
