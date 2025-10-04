import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DocumentMagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { PieChart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataChartPieVariant from "@/components/shared/data-chart-pie-variant";

interface Props {
  categoriesSummary:
    | {
        categoryKey?: string;
        dateKey?: string;
        income?: number;
        expense?: number;
        remain?: number;
      }[]
    | undefined;
}

type ChartValue = "pie";

const ChartType = [{ name: "Pie", value: "pie" }];

function DataCategory({ categoriesSummary = [] }: Props) {
  const [chartVariant, setChartVariant] = useState<ChartValue>("pie");

  const selectChartVariant = (value: ChartValue) => {
    setChartVariant(value);
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex items-center justify-between">
        {/* !FIXME: if you want to add another chart remove the "h-[36px]" class AND the "hidden" class */}
        <div className="flex items-center gap-1 h-[36px]">
          <TagIcon className="size-5" />
          <CardTitle className="font-medium">Category Expenses</CardTitle>
        </div>
        <div className="hidden">
          <Select
            onValueChange={selectChartVariant}
            value={chartVariant}
            defaultValue="pie"
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue defaultValue="pie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ChartType.map((c) => (
                  <SelectItem key={c?.name} value={c?.value}>
                    {c.value === "pie" && <PieChart className="size-4" />}
                    {c?.name} chart
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {categoriesSummary.length === 0 ? (
          <div className="w-full h-[350px] flex flex-col gap-y-4 items-center justify-center">
            <DocumentMagnifyingGlassIcon className="size-8" />
            <p className="text-sm">No data available for this period</p>
          </div>
        ) : (
          <>
            {chartVariant === "pie" && (
              <DataChartPieVariant categoriesSummary={categoriesSummary} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DataCategory;
