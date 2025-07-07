"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useUserStore } from "@/lib/stores/user.store";
import useLogoutMutation from "@/features/app/authentication/logout/useLogout";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

function DashboardSidebarSettings() {
  const { user } = useUserStore();
  const { mutateAsync, isPending } = useLogoutMutation();

  const handleLogout = async () => {
    await mutateAsync();
  };

  return (
    <>
      <div className="px-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
              <div className="max-w-[80%] flex items-center gap-2">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="not-found.png" />
                  <AvatarFallback className="text-sm font-bold text-caribbean bg-white">
                    MA
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-bold truncate">{user?.username}</p>
                  <p className="text-xs truncate">{user?.email}</p>
                </div>
              </div>
              <ChevronUpDownIcon className="size-5 flex-shrink-0" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white text-black"
            align="end"
            side="right"
          >
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
            <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* PREMIUM OR PORTFOLIO */}
      {/* <div className="px-4">
        <div className="py-2 px-4 border border-white rounded-lg">
          <div className="mb-2">
            <p className="font-bold">Like what you see?</p>
            <p className="text-xs">
              You can check my portfolio to get more insight about me.
            </p>
          </div>
          <Link
            href=""
            className="flex items-center gap-1 font-medium underline"
          >
            <span className="text-xs">Jo Harijaonina</span>
            <ArrowLongRightIcon className="size-4" />
          </Link>
        </div>
      </div> */}
    </>
  );
}

export default DashboardSidebarSettings;
