"use client";

import Button from "@/components/app/shared/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import CurrencyInputComponent, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";

interface Props {
  value: string;
  name: string;
  onValueChange: (
    value: string | undefined,
    name?: string,
    values?: CurrencyInputOnChangeValues
  ) => void;
  placeholder?: string;
  disabled?: boolean;
}

function CurrencyInput({
  onValueChange,
  value,
  name,
  disabled = false,
  placeholder = "$0.00",
}: Props) {
  const isIncome = parseFloat(value) > 0;

  const handleReverseValue = () => {
    if (!value) return;
    onValueChange((parseFloat(value) * -1)?.toString());
  };

  return (
    <div className="relative">
      {value && (
        <Tooltip>
          <TooltipTrigger
            asChild
            className="absolute inset-y-0 end-9 flex items-center"
          >
            <Button variant="ghost" onClick={handleReverseValue}>
              {isIncome ? (
                <ArrowPathIcon
                  className="size-4 
                  text-crimson
                "
                />
              ) : (
                <ArrowPathIcon
                  className="size-4 
                    text-caribbean
                  "
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isIncome ? (
              <p>Invert to (-) negative</p>
            ) : (
              <p>Invert to (+) positive</p>
            )}
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger
          asChild
          className="absolute inset-y-0 end-3 flex items-center"
        >
          <Button variant="ghost" onClick={handleReverseValue}>
            <InformationCircleIcon className="size-5 ml-2 text-dodger" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>(+) Positive number is valued as income</p>
          <p>(-) Negative number is valued as expense</p>
        </TooltipContent>
      </Tooltip>

      <CurrencyInputComponent
        name={name}
        prefix="$"
        className="block w-full p-2 ps-4 text-black rounded-lg text-sm border-black focus:outline-caribbean border"
        placeholder={placeholder}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={(value) => onValueChange(value || "")}
        disabled={disabled}
        value={value}
      />
    </div>
  );
}

export default CurrencyInput;
