import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DashboardWrapper({ children }: Props) {
  return <div className="h-screen w-full">{children}</div>;
}

export default DashboardWrapper;
