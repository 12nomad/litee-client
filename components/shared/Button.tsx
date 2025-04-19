// components/Button.tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
}

function Button({ children, type = "button", size = "md" }: Props) {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 text-white bg-black rounded-lg cursor-pointer ${
        size === "md" ? "px-4 py-2 text-base" : "px-2 py-1 text-sm"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
