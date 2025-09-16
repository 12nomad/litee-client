import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";

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
