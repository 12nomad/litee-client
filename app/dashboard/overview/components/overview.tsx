"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { formatDates } from "@/lib/utils";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import useGetReportsQuery from "@/app/dashboard/overview/hooks/use-get-reports.query";
import DataCard from "@/components/shared/data-card";
import DataCategory from "@/components/shared/data-category";
import DataTransaction from "@/components/shared/data-transaction";

function Overview() {
  // TODO: replace the accountId later
  const { data } = useGetReportsQuery({ accountId: "18", from: "", to: "" });
  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  const dateRange = formatDates({ from, to });

  useEffect(() => {
    console.log("data: ", data);
  }, [data, dateRange]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <DataCard
          title="Remaining"
          value={data?.remain}
          difference={data?.remainDifference}
          icon={<CurrencyDollarIcon />}
          dateRange={dateRange}
        />
        <DataCard
          title="Income"
          value={data?.income}
          difference={data?.incomeDifference}
          icon={<ArrowTrendingUpIcon />}
          dateRange={dateRange}
          variant="success"
        />
        <DataCard
          title="Expense"
          value={data?.expense}
          difference={data?.expenseDifference}
          icon={<ArrowTrendingDownIcon />}
          dateRange={dateRange}
          variant="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <DataTransaction datesSummary={data?.datesSummary} />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <DataCategory categoriesSummary={data?.categoriesSummary} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
