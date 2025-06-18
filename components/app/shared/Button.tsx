// components/Button.tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "base" | "outline";
  fullWidth?: boolean;
  rounded?: boolean;
  outlined?: boolean;
}

function Button({
  children,
  type = "button",
  size = "md",
  variant = "base",
  fullWidth = false,
  rounded = false,
}: Props) {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-1 font-medium text-sm rounded-lg cursor-pointer ${
        fullWidth && "w-full"
      } ${size === "md" ? "px-4 py-2" : "px-2 py-1"} ${
        variant === "outline" &&
        "text-black bg-transparent border font-bold border-black"
      } ${variant === "base" && "text-white bg-black"} ${
        variant === "primary" && "text-white bg-caribbean"
      } ${rounded && "rounded-full"}`}
    >
      {children}
    </button>
  );
}

export default Button;
