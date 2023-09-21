"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useId } from "react";

type Props = {
  label?: string;
  date?: Date;
  setDate: (date?: Date) => void;
};

export function DatePicker({ label, date, setDate }: Props) {
  const inputId = useId();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="space-y-0.5 w-full max-w-xs group flex flex-col">
          {label && (
            <label
              className="font-medium text-sm text-dimmed"
              htmlFor={inputId}
            >
              {label}
            </label>
          )}
          <Button
            type="button"
            variant={"secondary"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "LLL dd, yyyy") : <span>Pick a date</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
