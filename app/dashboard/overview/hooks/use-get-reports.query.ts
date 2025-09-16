import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";
import { fromMiliUnits } from "@/lib/utils";

interface FinanceSummary {
  categoryKey?: number;
  dateKey?: string;
  income?: number;
  expense?: number;
  remain?: number;
}

interface Reports {
  income: number;
  expense: number;
  remain: number;
  incomeDifference: number;
  expenseDifference: number;
  remainDifference: number;
  categoriesSummary: FinanceSummary[];
  datesSummary: FinanceSummary[];
}

interface Query {
  from: string;
  to: string;
  accountId: string;
}

const getReports = async ({ accountId, from, to }: Query): Promise<Reports> => {
  const response = await axiosInstance.get(
    `${endpoints.reports.getAll}?accountId=${accountId}&from=${from}&to=${to}`
  );
  const data = response.data as Reports;
  return {
    ...data,
    income: fromMiliUnits(data.income),
    expense: fromMiliUnits(data.expense),
    remain: fromMiliUnits(data.remain),
    categoriesSummary: data.categoriesSummary.map((c) => ({
      ...c,
      expense: fromMiliUnits(c.expense || 0),
    })),
    datesSummary: data.datesSummary.map((d) => ({
      ...d,
      expense: fromMiliUnits(d.expense || 0),
      income: fromMiliUnits(d.income || 0),
    })),
  };
};

const useGetReportsQuery = (query: Query) => {
  return useQuery<Reports>({
    queryFn: () => getReports(query),
    queryKey: [QueryKeys.useGetReports],
  });
};

export default useGetReportsQuery;
