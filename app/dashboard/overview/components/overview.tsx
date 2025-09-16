"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { formatDates } from "@/lib/utils";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import useGetReportsQuery from "@/app/dashboard/overview/hooks/use-get-reports.query";
import DataCard from "@/components/shared/data-card";

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
      <DataCard
        title="Remaining Balance"
        value={data?.remain}
        difference={data?.remainDifference}
        icon={<CurrencyDollarIcon />}
        variant="default"
        dateRange={dateRange}
      />
    </div>
  );
}

export default Overview;
