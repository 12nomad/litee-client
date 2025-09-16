import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex items-center justify-center gap-1 font-medium text-sm rounded-lg cursor-pointer transition-colors duration-200",
  {
    variants: {
      variant: {
        primary: "text-white bg-caribbean hover:bg-caribbean/90",
        secondary: "text-white bg-dodger hover:bg-dodger/90",
        base: "text-white bg-black hover:bg-black/80",
        outline:
          "text-black bg-transparent border font-bold border-black hover:bg-caribbean/10",
        ghost: "text-black bg-transparent hover:bg-black/10",
        danger: "text-white bg-crimson hover:bg-crimson/90",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        true: "rounded-full",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "md",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: ReactNode;
  disabled?: boolean;
}

function Button({
  children,
  type = "button",
  variant,
  size,
  fullWidth,
  rounded,
  disabled,
  className,
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={twMerge(
        buttonVariants({ variant, size, fullWidth, rounded, disabled }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
