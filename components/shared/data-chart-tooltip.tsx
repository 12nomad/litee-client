import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface Props {
  active?: boolean;
  payload?: { [key: string]: string } & {
    payload: {
      income?: number;
      expense?: number;
      dateKey?: string;
      categoryKey?: string;
      remain?: number;
    };
    name: string;
  }[];
  label?: string;
}

function DataChartTooltip({ active, payload, label }: Props) {
  const isVisible = active && payload && payload.length;

  return (
    <div
      className="p-2 px-4 rounded bg-white shadow-sm text-sm"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="mb-1 font-medium">
            {format(label || "", "dd MMMM, yyyy")}
          </p>
          <div className="space-y-0.5">
            <p>
              <span className="text-caribbean">&#11044; </span>
              Income:{" "}
              <span className="font-medium">
                {formatCurrency(payload[0]?.payload?.income || 0)}
              </span>
            </p>
            <p>
              <span className="text-crimson">&#11044; </span>
              Expense:{" "}
              <span className="font-medium">
                {payload[0]?.payload?.expense === 0 ? "" : "-"}
                {formatCurrency(payload[0]?.payload?.expense || 0)}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default DataChartTooltip;
