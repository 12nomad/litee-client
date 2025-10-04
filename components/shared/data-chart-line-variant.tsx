import { format } from "date-fns";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";
import DataChartTooltip from "@/components/shared/data-chart-tooltip";
import { FinanceSummary } from "@/app/dashboard/overview/hooks/use-get-reports.query";

interface Props {
  datesSummary: FinanceSummary[] | undefined;
}

function DataChartLineVariant({ datesSummary = [] }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
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
        <Line dot={false} dataKey="income" stroke="#216869" strokeWidth={2} />
        <Line dot={false} dataKey="expense" stroke="#d7263d" strokeWidth={2} />
        <Tooltip content={<DataChartTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DataChartLineVariant;
