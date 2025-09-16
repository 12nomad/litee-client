import { redirect } from "next/navigation";

function DashboardPage() {
  // ! chech if user is logged

  redirect("/dashboard/overview");

  return <></>;
}

export default DashboardPage;
