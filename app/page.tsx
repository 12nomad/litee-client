import { redirect } from "next/navigation";

export default function Home() {
  // TODO: Check if user is logged in
  // redirect("/landing");
  redirect("/dashboard");

  return <></>;
}
