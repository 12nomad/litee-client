import {
  UserGroupIcon,
  InboxStackIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import DashboardSubMenu from "@/components/dashboard/DashboardSubMenu";
import DashboardMainMenu from "@/components/dashboard/DashboardMainMenu";

const MainMenu = [
  {
    id: 1,
    label: "Teams",
    icon: <UserGroupIcon className="size-5" />,
  },
  {
    id: 2,
    label: "Notifications",
    icon: <BellAlertIcon className="size-5" />,
  },
];

const Projects = [
  {
    id: 100,
    label: "Project 100",
    icon: <InboxStackIcon className="size-5" />,
  },
  {
    id: 101,
    label: "Project 101",
    icon: <InboxStackIcon className="size-5" />,
  },
  {
    id: 102,
    label: "Project 102",
    icon: <InboxStackIcon className="size-5" />,
  },
  {
    id: 103,
    label: "Project 103",
    icon: <InboxStackIcon className="size-5" />,
  },
  {
    id: 104,
    label: "Project 104",
    icon: <InboxStackIcon className="size-5" />,
  },
];

const Tasks = [
  {
    id: 101,
    label: "High",
    icon: <ExclamationTriangleIcon className="size-5" />,
  },
  {
    id: 102,
    label: "Medium",
    icon: <ShieldExclamationIcon className="size-5" />,
  },
  {
    id: 103,
    label: "Low",
    icon: <ExclamationCircleIcon className="size-5" />,
  },
];

interface Props {
  params?: { projectId: string };
}

function DashboardSidebar({ params }: Props) {
  console.log("params", params);

  return (
    <aside className="py-4 space-y-4 col-span-2 border-r border-black/10 overflow-y-auto">
      <DashboardMainMenu data={MainMenu} />
      <DashboardSubMenu type="task" title="Tasks" data={Tasks} />
      <DashboardSubMenu type="project" title="Projects" data={Projects} />
    </aside>
  );
}

export default DashboardSidebar;
