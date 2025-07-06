import DashboardSubMenu from "@/components/app/dashboard/DashboardSubMenu";
import DashboardMainMenu from "@/components/app/dashboard/DashboardMainMenu";
import LiteeFin from "@/components/app/shared/LiteeFin";
import DashboardSidebarSettings from "@/components/app/dashboard/DashboardSidebarSettings";

function DashboardSidebar() {
  return (
    <aside className="h-full flex flex-col justify-between">
      {/* TOP */}
      <div className="space-y-4">
        <div className="px-4">
          <LiteeFin variant="ligth" />
        </div>
        <DashboardMainMenu />
        <DashboardSubMenu />
      </div>

      {/* BOTTOM */}
      <DashboardSidebarSettings />
    </aside>
  );
}

export default DashboardSidebar;
