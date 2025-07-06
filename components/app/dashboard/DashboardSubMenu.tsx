"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import useGetAccounts from "@/features/app/accounts/getAccounts/useGetAccounts";

// const Categories = [
//   {
//     id: 100,
//     label: "Housing",
//     icon: <HomeIcon className="size-5" />,
//   },
//   {
//     id: 101,
//     label: "Utilities",
//     icon: <ShoppingCartIcon className="size-5" />,
//   },
//   {
//     id: 102,
//     label: "Food",
//     icon: <CakeIcon className="size-5" />,
//   },
//   {
//     id: 103,
//     label: "Transportation",
//     icon: <PaperAirplaneIcon className="size-5" />,
//   },
// ];

// const Accounts = [
//   {
//     id: 200,
//     label: "Account 100",
//   },
//   {
//     id: 201,
//     label: "Account 101",
//   },
//   {
//     id: 202,
//     label: "Account 102",
//   },
// ];

// interface Props {
//   type: "accounts" | "categories";
//   title: string;
//   data: {
//     id: number;
//     label: string;
//     icon: ReactNode;
//   }[];
// }

type TMenu = "accounts" | "categories";
const type: TMenu = "accounts";

function DashboardSubMenu() {
  const pathname = usePathname();
  const { data } = useGetAccounts();

  const getClassName = (value: string) =>
    cn(
      "flex items-center gap-2 h-8",
      pathname === `/dashboard/categories/${value}` ||
        pathname === `/dashboard/accounts/${value}`
        ? "relative text-white bg-white/10 rounded-r-xs before:content-[''] before:w-1 before:h-8 before:bg-white before:rounded-xs before:block before:relative"
        : "text-white/60"
    );

  return (
    <div className="mx-4">
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0 m-0 text-xs text-white font-bold cursor-pointer hover:no-underline [&>*]:text-white">
            Accounts
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-2">
            {data?.map((el) => (
              <div key={el.id}>
                <Link
                  href={
                    type === "accounts"
                      ? `/dashboard/accounts/${el.id}`
                      : `/dashboard/categories/${el.name.toLowerCase()}`
                  }
                  className={
                    type === "accounts"
                      ? getClassName(el.id.toString())
                      : getClassName(el.name.toLowerCase())
                  }
                >
                  <Wallet className="size-5" />
                  <span className="text-sm font-medium">{el.name}</span>
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
