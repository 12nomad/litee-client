import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const signUp = async (signUpDto: {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}) => {
  const response = await axiosInstance.post(
    endpoints.authentication.signup,
    signUpDto
  );
  return response.data;
};

const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      redirect("/");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.data)
        toast.error(`${error?.response?.data as string}.`);
    },
  });
};

export default useSignUpMutation;
