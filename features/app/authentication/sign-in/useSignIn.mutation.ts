import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { UseFormReset } from "react-hook-form";

interface ISignInDto {
  email: string;
  password: string;
}

const signIn = async (signInDto: ISignInDto) => {
  const response = await axiosInstance.post(
    endpoints.authentication.signin,
    signInDto
  );
  return response.data;
};

const useSignInMutation = (reset: UseFormReset<ISignInDto>) => {
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
