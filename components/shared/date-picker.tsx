"use client";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Input from "@/components/shared/input";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CreateTransactionFormValues } from "@/app/dashboard/transactions/hooks/create-transaction.schema";
import { formatToLocaleDate, isValidDate } from "@/lib/utils";

interface Props {
  field: ControllerRenderProps<CreateTransactionFormValues, "date">;
}

export function DatePicker({ field }: Props) {
  const date = field.value ? new Date(field.value) : new Date();
  const value = formatToLocaleDate(date);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-3 border border-black rounded-md">
      <div className="relative flex items-center gap-2">
        <div className="basis-full">
          <Input
            {...field}
            id="date"
            name="date"
            value={value}
            placeholder="Select a date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              if (isValidDate(date)) {
                field.onChange(date?.toString());
                setMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            borderless
            disabled
          />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              {...field}
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setOpen(false);
                field.onChange(date?.toString());
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default DatePicker;
