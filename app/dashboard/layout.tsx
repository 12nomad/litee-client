import { ReactNode } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <DashboardWrapper>
      <DashboardNavbar />
      <div className="h-[calc(100%-64px)] grid grid-cols-12">
        <DashboardSidebar />

        {/* MAIN */}
        <main className="col-span-10 col-start-3">{children}</main>
      </div>
    </DashboardWrapper>
  );
}

export default DashboardLayout;
