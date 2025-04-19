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
      ? "relative flex items-center gap-2 text-celestial before:content-[''] before:w-1 before:h-5 before:bg-celestial before:rounded-lg before:block"
      : "flex items-center gap-2";
  };

  return (
    <ul className="mx-8 space-y-4">
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
  );
}

export default DashboardMainMenu;
