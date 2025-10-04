import { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatCurrency, fromMiliUnits } from "@/lib/utils";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";

interface Props {
  title: string;
  value?: number;
  difference?: number;
  icon: JSX.Element;
  variant?: "default" | "success" | "danger";
  dateRange: string;
}

const DataCard = ({
  dateRange,
  icon,
  title,
  variant = "default",
  value = 0,
  difference = 0,
}: Props) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <div
          className={cn(
            "flex items-center gap-1",
            variant === "default" && "text-dodger",
            variant === "success" && "text-caribbean",
            variant === "danger" && "text-crimson"
          )}
        >
          <div className="shrink-0 size-5">{icon}</div>
          <CardTitle className="font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm">{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-2xl mb-2 break-all">
          {formatCurrency(fromMiliUnits(value))}
        </h3>
        <div className="text-sm flex items-center gap-1">
          <p
            className={cn(
              "flex items-center py-1 px-2 rounded-full text-white text-xs",
              difference >= 0 ? "bg-caribbean" : "bg-crimson"
            )}
          >
            {difference >= 0 ? (
              <ArrowLongUpIcon className="size-3" />
            ) : (
              <ArrowLongDownIcon className="size-3" />
            )}
            <span>{difference}%</span>
          </p>
          <p> compared to last period</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
