import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellAlertIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import NavButton from "@/components/shared/nav-button";
import SearchInput from "@/components/shared/search-input";

function DashboardNavbar() {
  return (
    <div className="h-16 p-4 flex items-center border-b border-black/10">
      <div className="w-full">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <NavButton isForward={false} />
              <NavButton isForward />
            </div>
            <SearchInput />
          </div>
          <ul className="flex items-center gap-4">
            <li className="cursor-pointer">
              <BellAlertIcon className="size-5" />
            </li>
            <li className="cursor-pointer">
              <LifebuoyIcon className="size-5 scale-x-[-1]" />
            </li>
            <li>
              <div className="w-[1px] h-5 bg-black/10 rounded-lg" />
            </li>
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="not-found.png" />
                    <AvatarFallback className="text-sm font-bold text-white bg-caribbean">
                      JH
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" side="bottom">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DashboardNavbar;
