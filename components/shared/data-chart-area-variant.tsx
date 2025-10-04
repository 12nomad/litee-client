import { format } from "date-fns";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Area,
  Tooltip,
  AreaChart,
} from "recharts";
import DataChartTooltip from "@/components/shared/data-chart-tooltip";
import { FinanceSummary } from "@/app/dashboard/overview/hooks/use-get-reports.query";

interface Props {
  datesSummary: FinanceSummary[] | undefined;
}

function DataChartAreaVariant({ datesSummary = [] }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={datesSummary.map((el) => ({
          ...el,
          expense: Math.abs(el.expense || 0),
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#216869" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#216869" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#d7263d" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#d7263d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="dateKey"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#216869"
          fill="url(#income)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="expense"
          strokeWidth={2}
          stroke="#d7263d"
          fill="url(#expense)"
        />
        <Tooltip content={<DataChartTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default DataChartAreaVariant;
