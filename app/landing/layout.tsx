import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function LandingLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default LandingLayout;
