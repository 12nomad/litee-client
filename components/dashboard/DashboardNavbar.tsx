import SearchInput from "@/components/shared/SearchInput";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Workspace from "@/public/assets/workspace.jpg";

function DashboardNavbar() {
  return (
    <div className="h-[64px] px-8 flex items-center border-b border-black/10">
      <div className="w-full">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={Workspace}
              alt="workspace"
              className="w-10 h-10 rounded-lg object-cover"
              priority
            />
            <div>
              <p className="font-bold">Vulture</p>
              <p className="text-xs">Private</p>
            </div>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <SearchInput />
            </li>
            <li>|</li>
            <li>
              <Cog6ToothIcon className="size-5" />
            </li>
            <li>
              <UserCircleIcon className="size-5" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DashboardNavbar;
