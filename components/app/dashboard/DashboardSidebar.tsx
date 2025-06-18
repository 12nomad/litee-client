import {
  PresentationChartLineIcon,
  CubeTransparentIcon,
  ArrowPathRoundedSquareIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import DashboardSubMenu from "@/components/app/dashboard/DashboardSubMenu";
import DashboardMainMenu from "@/components/app/dashboard/DashboardMainMenu";
import { Wallet } from "lucide-react";
import LiteeFin from "@/components/app/shared/LiteeFin";
import DashboardSidebarSettings from "@/components/app/dashboard/DashboardSidebarSettings";

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

const Accounts = [
  {
    id: 200,
    label: "Account 100",
    icon: <Wallet className="size-5" />,
  },
  {
    id: 201,
    label: "Account 101",
    icon: <Wallet className="size-5" />,
  },
  {
    id: 202,
    label: "Account 102",
    icon: <Wallet className="size-5" />,
  },
];

interface Props {
  params?: { accountId: string };
}

function DashboardSidebar({ params }: Props) {
  console.log("params", params);

  return (
    <aside className="h-full flex flex-col justify-between">
      {/* TOP */}
      <div className="space-y-4">
        <div className="px-4">
          <LiteeFin variant="ligth" />
        </div>
        <DashboardMainMenu data={MainMenu} />
        {/* <DashboardSubMenu
          type="categories"
          title="Categories"
          data={Categories}
          /> */}
        <DashboardSubMenu type="accounts" title="Accounts" data={Accounts} />
      </div>

      {/* BOTTOM */}
      <DashboardSidebarSettings />
    </aside>
  );
}

export default DashboardSidebar;
