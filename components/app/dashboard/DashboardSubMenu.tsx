"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Props {
  type: "accounts" | "categories";
  title: string;
  data: {
    id: number;
    label: string;
    icon: ReactNode;
  }[];
}

function DashboardSubMenu({ data, title, type }: Props) {
  const pathname = usePathname();

  const getClassName = (value: string) => {
    return pathname === `/dashboard/categories/${value}` ||
      pathname === `/dashboard/accounts/${value}`
      ? "relative flex items-center gap-2 h-8 text-white bg-white/10 rounded-r-xs before:content-[''] before:w-1 before:h-8 before:bg-white before:rounded-xs before:block before:relative"
      : "flex items-center gap-2 h-8 text-white/60";
  };

  return (
    <div className="mx-4">
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0 m-0 text-xs text-white font-bold cursor-pointer hover:no-underline [&>*]:text-white">
            {title}
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-2">
            {data.map((el) => (
              <div key={el.id}>
                <Link
                  href={
                    type === "accounts"
                      ? `/dashboard/accounts/${el.id}`
                      : `/dashboard/categories/${el.label.toLowerCase()}`
                  }
                  className={
                    type === "accounts"
                      ? getClassName(el.id.toString())
                      : getClassName(el.label.toLowerCase())
                  }
                >
                  {el.icon}
                  <span className="text-sm font-medium">{el.label}</span>
                </Link>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default DashboardSubMenu;
