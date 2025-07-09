import LiteeFin from "@/components/app/shared/LiteeFin";
import DashboardMainMenu from "@/components/app/dashboard/DashboardMainMenu";
import DashboardSidebarSettings from "@/components/app/dashboard/DashboardSidebarSettings";
import DashboardSubMenues from "@/components/app/dashboard/DashboardSubMenues";

function DashboardSidebar() {
  return (
    <aside className="h-full flex flex-col justify-between">
      {/* TOP */}
      <div className="space-y-4">
        <div className="px-4">
          <LiteeFin variant="ligth" />
        </div>
        <DashboardMainMenu />
        <DashboardSubMenues />
      </div>

      {/* BOTTOM */}
      <DashboardSidebarSettings />
    </aside>
  );
}

export default DashboardSidebar;
