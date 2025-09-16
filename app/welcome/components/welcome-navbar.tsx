import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/shared/button";
import Logo from "@/components/shared/logo";

function WelcomeNavbar() {
  return (
    <div className="h-[64px] flex items-center justify-between">
      <Logo variant="primary" />
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
