import { ReactNode } from "react";
import DashboardSidebar from "@/components/app/dashboard/DashboardSidebar";
import DashboardWrapper from "@/components/app/dashboard/DashboardWrapper";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <DashboardWrapper>
      <div className="h-full w-full grid grid-cols-12">
        {/* SIDEBAR */}
        <div className="col-span-2 p-4 bg-caribbean text-white overflow-hidden">
          <DashboardSidebar />
        </div>

        {/* MAIN */}
        <div className="h-full w-full col-span-10 col-start-3 py-4 pr-4 bg-caribbean">
          <main className="h-full bg-white rounded-lg">
            <div className="overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default DashboardLayout;
