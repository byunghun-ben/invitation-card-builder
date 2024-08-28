"use client";

import { Calendar } from "@/components/ui/calendar";
import { InstaScheduleWidgetType } from "@/types/invitation";
import { differenceInCalendarDays, format } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
  widget: InstaScheduleWidgetType;
};

const InstaScheduleItem = ({ widget }: Props) => {
  const eventAtDate = new Date(`${widget.date} ${widget.time}`);
  const formattedDateString = format(eventAtDate, "yyyy년 M월 d일 (EEEE)", {
    locale: ko,
  });

  const formattedTimeString = format(eventAtDate, "a h:mm", { locale: ko });

  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex flex-col gap-1 items-center">
        <span className="flex text-lg font-bold">{widget.title}</span>
      </div>

      <div className="flex-center">
        <Calendar
          mode="single"
          selected={new Date(widget.date)}
          locale={ko}
          disableNavigation
          disabled
          footer={
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold text-slate-500">
                {formattedDateString}
              </p>
              <p className="text-sm font-bold text-slate-500">
                {formattedTimeString}
              </p>
            </div>
          }
        />
      </div>

      <DDay widget={widget} />
    </div>
  );
};

const DDay = ({ widget }: Props) => {
  const eventAtDate = new Date(`${widget.date} ${widget.time}`);
  const dday = differenceInCalendarDays(eventAtDate, new Date());

  if (widget.DDayType === "D_DAY") {
    if (dday === 0) {
      return (
        <div className="flex flex-col gap-1 items-center">
          <p className="flex font-bold text-slate-700">
            기다렸던 오늘, 결혼합니다.
          </p>
        </div>
      );
    }

    return (
      <div className="flex-center">
        <div className="flex gap-0.5 items-center">
          <p className="text-lg font-bold">
            {dday > 0 ? `D+${dday}` : `D-${dday}`}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default InstaScheduleItem;
