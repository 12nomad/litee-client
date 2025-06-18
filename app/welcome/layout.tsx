import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function WelcomeLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default WelcomeLayout;
