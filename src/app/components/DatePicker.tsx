"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import CommonDialog from "./CommonDialog";
import { TDatePickerModal } from "@/types";

const DatePicker = ({
  date,
  setDate,
  disableFutureDates = false,
}: TDatePickerModal) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  return (
    <>
      <div className="mb-5">
        <div className="text-text-primary text-sm font-medium mb-1">
          Course Completion Date
        </div>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </div>

      <CommonDialog
        open={open}
        classes="w-fit p-2"
        closeDialog={() => {
          setOpen(false);
        }}
      >
        <div className="w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
            }}
            initialFocus
            disabled={disableFutureDates ? (date) => date > today : undefined}
          />
        </div>
      </CommonDialog>
    </>
  );
};

export default DatePicker;
