"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowPathRoundedSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataChartAreaVariant from "@/components/shared/data-chart-area-variant";
import DataChartBarVariant from "@/components/shared/data-chart-bar-variant";
import DataChartLineVariant from "@/components/shared/data-chart-line-variant";
import { FinanceSummary } from "@/app/dashboard/overview/hooks/use-get-reports.query";

interface Props {
  datesSummary: FinanceSummary[] | undefined;
}

type ChartValue = "area" | "bar" | "line";

const ChartType = [
  { name: "Area", value: "area" },
  { name: "Line", value: "line" },
  { name: "Bar", value: "bar" },
];

function DataTransaction({ datesSummary = [] }: Props) {
  const [chartVariant, setChartVariant] = useState<ChartValue>("area");

  const selectChartVariant = (value: ChartValue) => {
    setChartVariant(value);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ArrowPathRoundedSquareIcon className="size-5" />
          <CardTitle className="font-medium">Transactions</CardTitle>
        </div>
        <div>
          <Select
            onValueChange={selectChartVariant}
            value={chartVariant}
            defaultValue="area"
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue defaultValue="area" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ChartType.map((c) => (
                  <SelectItem key={c?.name} value={c?.value}>
                    {c.value === "area" && <AreaChart className="size-4" />}
                    {c.value === "line" && <LineChart className="size-4" />}
                    {c.value === "bar" && <BarChart className="size-4" />}
                    {c?.name} chart
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {datesSummary.length === 0 ? (
          <div className="w-full h-[350px] flex flex-col gap-y-4 items-center justify-center">
            <DocumentMagnifyingGlassIcon className="size-8" />
            <p className="text-sm">No data available for this period</p>
          </div>
        ) : (
          <>
            {chartVariant === "area" && (
              <DataChartAreaVariant datesSummary={datesSummary} />
            )}
            {chartVariant === "line" && (
              <DataChartLineVariant datesSummary={datesSummary} />
            )}
            {chartVariant === "bar" && (
              <DataChartBarVariant datesSummary={datesSummary} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DataTransaction;
