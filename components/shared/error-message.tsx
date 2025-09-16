import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ErrorMessage({ children }: Props) {
  return (
    <div className="text-crimson text-xs font-medium">
      <sup>* </sup>
      {children}
    </div>
  );
}

export default ErrorMessage;
