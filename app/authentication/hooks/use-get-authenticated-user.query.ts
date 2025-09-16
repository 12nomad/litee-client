import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";
import { User } from "@/lib/stores/user.store";

const getAuthenticatedUser = async () => {
  const response = await axiosInstance.get(
    endpoints.authentication.getAuthenticatedUser
  );
  return response.data;
};

const useGetAuthenticatedUserQuery = () => {
  return useQuery<User>({
    queryFn: getAuthenticatedUser,
    queryKey: [QueryKeys.useGetAuthenticatedUser],
  });
};

export default useGetAuthenticatedUserQuery;
