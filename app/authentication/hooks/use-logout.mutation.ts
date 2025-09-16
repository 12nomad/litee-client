import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { UserStorageKey } from "@/lib/stores/user.store";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";

const logout = async () => {
  const response = await axiosInstance.post(endpoints.authentication.logout);
  return response.data;
};

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(UserStorageKey);
      redirect("/welcome");
    },
    onError: (error: AxiosError) => {
      if (
        error?.response?.data ||
        (error.message && error.message !== "NEXT_REDIRECT")
      )
        toast.error(`${(error?.response?.data as string) || error.message}.`);
    },
  });
};

export default useLogoutMutation;
