import { redirect } from "next/navigation";

function DashboardPage() {
  redirect("/dashboard/teams");

  return <></>;
}

export default DashboardPage;
