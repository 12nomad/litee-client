import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DashboardProjectLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default DashboardProjectLayout;
