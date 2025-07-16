import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { fromMiliUnits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

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

const useGetReports = (query: Query) => {
  return useQuery<Reports>({
    queryFn: () => getReports(query),
    queryKey: [QueryKeys.useGetReports],
  });
};

export default useGetReports;
