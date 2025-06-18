import { UserStorageKey } from "@/features/stores/user.store";
import { axiosInstance } from "@/lib/axios-instance";
import { endpoints } from "@/lib/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
      if (error?.response?.data)
        toast.error(`${error?.response?.data as string}.`);
    },
  });
};

export default useLogoutMutation;
