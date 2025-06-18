import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ErrorMessages({ children }: Props) {
  return (
    <div className="text-crimson text-xs font-medium">
      <sup>* </sup>
      {children}
    </div>
  );
}

export default ErrorMessages;
