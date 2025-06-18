import { SwatchIcon } from "@heroicons/react/24/solid";

interface Props {
  variant?: "primary" | "ligth" | "dark";
}

function LiteeFin({ variant = "primary" }: Props) {
  return (
    <div className="flex items-center">
      <SwatchIcon
        className={`size-6 ${
          variant === "primary"
            ? "text-caribbean"
            : variant === "dark"
            ? "text-black"
            : "text-white"
        }`}
      />
      <h2
        className={`font-lobster text-2xl italic ${
          variant === "primary"
            ? "text-caribbean"
            : variant === "dark"
            ? "text-black"
            : "text-white"
        }`}
      >
        LiteeFin.
      </h2>
    </div>
  );
}

export default LiteeFin;
