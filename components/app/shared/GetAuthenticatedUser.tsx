"use client";

import { useUserStore } from "@/lib/stores/user.store";
import useGetAuthenticatedUser from "@/features/app/authentication/get-authenticated-user/useGetAuthenticatedUser";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function GetAuthenticatedUser() {
  const { setUser } = useUserStore();
  const { data, isSuccess, isLoading } = useGetAuthenticatedUser();

  useEffect(() => {
    if (isLoading) return;

    if (isSuccess && data) {
      setUser(data);
      redirect("/dashboard");
    } else {
      redirect("/welcome");
    }
  }, [data, isSuccess, isLoading]);

  return <></>;
}

export default GetAuthenticatedUser;
