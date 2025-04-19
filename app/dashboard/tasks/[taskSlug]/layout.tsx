import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function DashboardTaskLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default DashboardTaskLayout;
