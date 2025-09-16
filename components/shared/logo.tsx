import { cn } from "@/lib/utils";
import { SwatchIcon } from "@heroicons/react/24/solid";

interface Props {
  variant?: "primary" | "ligth" | "dark";
}

function Logo({ variant = "primary" }: Props) {
  const className =
    variant === "primary"
      ? "text-caribbean"
      : variant === "dark"
      ? "text-black"
      : "text-white";

  return (
    <div className="flex items-center">
      <SwatchIcon className={cn("size-6", className)} />
      <h2 className={cn("font-lobster text-2xl italic", className)}>
        LiteeFin.
      </h2>
    </div>
  );
}

export default Logo;
