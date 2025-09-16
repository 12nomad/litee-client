"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Props {
  data: { id: number; name: string; userId: number }[];
  type: "accounts" | "categories";
}

function DashboardSubMenu({ data, type }: Props) {
  const pathname = usePathname();

  const getClassName = (value: string) =>
    cn(
      "flex items-center gap-2 h-8",
      (type === "categories" &&
        pathname === `/dashboard/categories/${value}`) ||
        (type === "accounts" && pathname === `/dashboard/accounts/${value}`)
        ? "relative text-white bg-white/10 rounded-r-xs before:content-[''] before:w-1 before:h-8 before:bg-white before:rounded-xs before:block before:relative"
        : "text-white/60"
    );

  return (
    <div className="mx-4">
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0 m-0 text-xs text-white font-bold cursor-pointer hover:no-underline [&>*]:text-white">
            {type === "accounts" ? "Accounts" : "Categories"}
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-2">
            {data?.map((el) => (
              <div key={el.id}>
                <Link
                  href={
                    type === "accounts"
                      ? `/dashboard/accounts/${el.id}`
                      : `/dashboard/categories/${el.id}`
                  }
                  className={
                    type === "accounts"
                      ? getClassName(el?.id?.toString())
                      : getClassName(el?.id?.toString())
                  }
                >
                  <Wallet className="size-5" />
                  <p className="text-sm font-medium truncate">{el.name}</p>
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
