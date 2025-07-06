"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  PresentationChartLineIcon,
  ArrowPathRoundedSquareIcon,
  CubeTransparentIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

const MainMenu = [
  {
    id: 1,
    label: "Overview",
    icon: <PresentationChartLineIcon className="size-5" />,
  },
  {
    id: 2,
    label: "Transactions",
    icon: <ArrowPathRoundedSquareIcon className="size-5" />,
  },
  {
    id: 3,
    label: "Majula",
    icon: <CubeTransparentIcon className="size-5" />,
  },
  {
    id: 4,
    label: "Notifications",
    icon: <BellAlertIcon className="size-5" />,
  },
];

// interface Props {
//   data: {
//     id: number;
//     label: string;
//     icon: ReactNode;
//   }[];
// }

function DashboardMainMenu() {
  const pathname = usePathname();

  const getClassName = (menuLabel: string) =>
    cn(
      "flex items-center gap-2 h-8",
      pathname === `/dashboard/${menuLabel}`
        ? "relative text-white bg-white/10 rounded-r-xs before:content-[''] before:w-1 before:h-8 before:bg-white before:rounded-xs before:block"
        : "text-white/60"
    );

  return (
    <div className="px-4 space-y-2">
      <p className="text-xs text-white font-bold">General</p>
      <ul>
        {MainMenu.map((menu) => (
          <Link
            href={`/dashboard/${menu.label.toLowerCase()}`}
            key={`${menu.id}-${menu.label}`}
            className={getClassName(menu.label.toLowerCase())}
          >
            {menu.icon}
            <span className="text-sm font-medium">{menu.label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default DashboardMainMenu;
