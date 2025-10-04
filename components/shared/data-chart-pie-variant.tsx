import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import { FinanceSummary } from "@/app/dashboard/overview/hooks/use-get-reports.query";
import { formatCurrency } from "@/lib/utils";
import COLOR_PALETTE from "@/constants/color_palette";

interface Props {
  categoriesSummary: FinanceSummary[] | undefined;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

function DataChartPieVariant({ categoriesSummary = [] }: Props) {
  const data = categoriesSummary.map((el) => ({
    name: el?.categoryKey,
    value: Math.abs(el?.expense || 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#216869"
          stroke="#f6fff8"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
            />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          iconType="circle"
          content={({ payload }) => (
            <ul className="flex flex-col items-center gap-1 text-sm">
              {payload?.map((entry, index) => (
                <li
                  key={`legend-${entry.value}`}
                  className="flex items-center gap-1"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        COLOR_PALETTE[index % COLOR_PALETTE.length],
                    }}
                  />
                  <p>
                    {entry.value}:{" "}
                    <span className="font-medium">
                      {entry.payload?.value === 0 ? "" : "-"}
                      {formatCurrency(entry.payload?.value)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DataChartPieVariant;
