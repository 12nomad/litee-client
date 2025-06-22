import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const signIn = async (signInDto: { email: string; password: string }) => {
  const response = await axiosInstance.post(
    endpoints.authentication.signin,
    signInDto
  );
  return response.data;
};

const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      redirect("/");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.data)
        toast.error(
          `Verification unsuccessful. ${error?.response?.data as string}.`
        );
    },
  });
};

export default useSignInMutation;
