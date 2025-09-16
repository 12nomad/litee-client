import Logo from "@/components/shared/logo";
import DashboardMainMenu from "@/app/dashboard/components/dashboard-main-menu";
import DashboardSubMenues from "@/app/dashboard/components/dashboard-sub-menues";
import DashboardSidebarSettings from "@/app/dashboard/components/dashboard-sidebar-settings";

function DashboardSidebar() {
  return (
    <aside className="h-full flex flex-col justify-between">
      {/* TOP */}
      <div className="space-y-4">
        <div className="px-4">
          <Logo variant="ligth" />
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
