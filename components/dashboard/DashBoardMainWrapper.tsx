import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DashBoardMainWrapper({ children }: Props) {
  return <div className="py-4 mx-8">{children}</div>;
}

export default DashBoardMainWrapper;
