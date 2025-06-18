"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  data: {
    id: number;
    label: string;
    icon: ReactNode;
  }[];
}

function DashboardMainMenu({ data }: Props) {
  const pathname = usePathname();

  const getClassName = (menuLabel: string) => {
    return pathname === `/dashboard/${menuLabel}`
      ? "relative flex items-center gap-2 h-8 text-white bg-white/10 rounded-r-xs before:content-[''] before:w-1 before:h-8 before:bg-white before:rounded-xs before:block"
      : "flex items-center gap-2 h-8 text-white/60";
  };

  return (
    <div className="px-4 space-y-2">
      <p className="text-xs text-white font-bold">General</p>
      <ul>
        {data.map((menu) => (
          <Link
            href={`/dashboard/${menu.label.toLowerCase()}`}
            key={menu.id}
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
