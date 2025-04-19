import Button from "@/components/shared/Button";
import { SwatchIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function LandingNavbar() {
  return (
    <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
      <h2 className="font-lobster text-2xl italic">Litee</h2>
      <nav>
        <ul className="flex gap-4">
          <li className="cursor-pointer">
            <Button>
              <SwatchIcon className="size-4" />
              <Link href="/auth/sign-in" className="font-medium">
                Sign in
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingNavbar;
