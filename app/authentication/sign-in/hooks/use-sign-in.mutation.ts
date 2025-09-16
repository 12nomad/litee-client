import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { UseFormReset } from "react-hook-form";

interface SignInDto {
  email: string;
  password: string;
}

const signIn = async (signInDto: SignInDto) => {
  const response = await axiosInstance.post(
    endpoints.authentication.signin,
    signInDto
  );
  return response.data;
};

const useSignInMutation = (reset: UseFormReset<SignInDto>) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      reset();
      redirect("/");
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

export default useSignInMutation;
