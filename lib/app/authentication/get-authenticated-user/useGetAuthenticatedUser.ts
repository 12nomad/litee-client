import { User } from "@/features/stores/user.store";
import { axiosInstance } from "@/lib/axios-instance";
import { endpoints } from "@/lib/endpoints";
import { QueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

const getAuthenticatedUser = async () => {
  const response = await axiosInstance.get(
    endpoints.authentication.getAuthenticatedUser
  );
  return response.data;
};

const useGetAuthenticatedUser = () => {
  return useQuery<User>({
    queryFn: getAuthenticatedUser,
    queryKey: [QueryKeys.useGetAuthenticatedUser],
  });
};

export default useGetAuthenticatedUser;
