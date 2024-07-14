"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ChangeEvent } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

type Props = {
  value: {
    date: Date;
    time: string;
  };
  onChange: (value: { date: Date; time: string }) => void;
};

const DateTimePickerInput = ({ value, onChange }: Props) => {
  const { date, time } = value;

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, time: e.target.value });
  };

  const onChangeDate: SelectSingleEventHandler = (_, selectedDay) => {
    onChange({ date: selectedDay, time });
  };

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
            value={value.time}
            onChange={onChangeTime}
          />
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onChangeDate}
              locale={ko}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimePickerInput;
