// components/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "base" | "outline" | "ghost" | "danger";
  fullWidth?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  disabled?: boolean;
}

function Button({
  children,
  type = "button",
  size = "md",
  variant = "base",
  fullWidth = false,
  rounded = false,
  disabled = false,
  ...props
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
        variant === "secondary" && "text-white bg-dodger"
      } ${variant === "primary" && "text-white bg-caribbean"} ${
        variant === "ghost" && "text-black bg-transparent"
      } ${variant === "danger" && "text-white bg-crimson"} ${
        rounded && "rounded-full"
      } ${disabled && "opacity-60 cursor-not-allowed"}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
