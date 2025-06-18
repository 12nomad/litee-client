"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Props {
  isForward?: boolean;
}

function NavButton({ isForward = true }: Props) {
  const router = useRouter();

  const move = () => (isForward ? router.forward() : router.back());

  return (
    <div
      onClick={move}
      className="h-8 w-8 grid place-items-center bg-black/5 rounded-lg cursor-pointer"
    >
      {isForward ? (
        <ChevronRightIcon className="size-4 text-black" />
      ) : (
        <ChevronLeftIcon className="size-4 text-black" />
      )}
    </div>
  );
}

export default NavButton;
