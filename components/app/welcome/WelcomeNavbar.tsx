import Button from "@/components/app/shared/Button";
import LiteeFin from "@/components/app/shared/LiteeFin";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function WelcomeNavbar() {
  return (
    <div className="h-[64px] flex items-center justify-between">
      <LiteeFin variant="primary" />
      <nav>
        <ul className="flex gap-4">
          <li className="cursor-pointer">
            <Button variant="primary" rounded>
              <Link href="/authentication/sign-in">Sign in</Link>
              <ArrowUpRight className="size-4" />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default WelcomeNavbar;
