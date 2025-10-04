import { format } from "date-fns";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";
import DataChartTooltip from "@/components/shared/data-chart-tooltip";
import { FinanceSummary } from "@/app/dashboard/overview/hooks/use-get-reports.query";

interface Props {
  datesSummary: FinanceSummary[] | undefined;
}

function DataChartBarVariant({ datesSummary = [] }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={datesSummary.map((el) => ({
          ...el,
          expense: Math.abs(el.expense || 0),
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="dateKey"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Bar
          dataKey="income"
          stackId="income"
          fill="#216869"
          stroke="#f6fff8"
        />
        <Bar
          dataKey="expense"
          stackId="expense"
          fill="#d7263d"
          stroke="#f6fff8"
        />
        <Tooltip content={<DataChartTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DataChartBarVariant;
