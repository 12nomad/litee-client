import { JSX } from "react";

interface Props {
  title: string;
  value?: number;
  difference?: number;
  icon: JSX.Element;
  variant: "default" | "success";
  dateRange: string;
}

const DataCard = ({
  dateRange,
  icon,
  title,
  variant,
  value = 0,
  difference = 0,
}: Props) => {
  return <div>Overview data card...</div>;
};

export default DataCard;
