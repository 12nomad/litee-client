import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

interface ISignUpDto {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

const signUp = async (signUpDto: ISignUpDto) => {
  const response = await axiosInstance.post(
    endpoints.authentication.signup,
    signUpDto
  );
  return response.data;
};

const useSignUpMutation = (reset: UseFormReset<ISignUpDto>) => {
  return useMutation({
    mutationFn: signUp,
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

export default useSignUpMutation;
