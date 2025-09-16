"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/stores/user.store";
import useGetAuthenticatedUserQuery from "@/app/authentication/hooks/use-get-authenticated-user.query";

function GetAuthenticatedUser() {
  const { setUser } = useUserStore();
  const { data, isSuccess, isLoading } = useGetAuthenticatedUserQuery();

  useEffect(() => {
    if (isLoading) return;

    if (isSuccess && data) {
      setUser(data);
      redirect("/dashboard");
    } else {
      redirect("/welcome");
    }
  }, [isLoading, isSuccess, data]);

  return <></>;
}

export default GetAuthenticatedUser;
