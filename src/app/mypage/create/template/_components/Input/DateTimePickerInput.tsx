"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const DateTimePickerInput = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");

  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-12 justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date ? (
              `${format(date, "yyyy년 MM월 dd일")} ${time}`
            ) : (
              <span>예식일을 선택해주세요.</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2 p-2">
          <input
            type="time"
            className="rounded-md border p-2"
            value={time}
            onChange={e => {
              setTime(e.target.value);
            }}
          />
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ko}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimePickerInput;
