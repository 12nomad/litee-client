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
  type: "task" | "project";
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
    return pathname === `/dashboard/projects/${value}` ||
      pathname === `/dashboard/tasks/${value}`
      ? "relative flex items-center gap-2 text-celestial before:content-[''] before:w-1 before:h-5 before:bg-celestial before:rounded-lg before:block"
      : "flex items-center gap-2";
  };

  return (
    <div className="mx-8">
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0 m-0 text-xs text-black font-bold cursor-pointer hover:no-underline [&>*]:text-black">
            {title}
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-4 space-y-4">
            {data.map((el) => (
              <div key={el.id}>
                <Link
                  href={
                    type === "project"
                      ? `/dashboard/projects/${el.id}`
                      : `/dashboard/tasks/${el.label.toLowerCase()}`
                  }
                  className={
                    type === "project"
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
