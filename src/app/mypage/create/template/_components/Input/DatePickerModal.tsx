"use client";

import { Dialog } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactNode, useCallback, useEffect, useState } from "react";

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate(); // 변경된 부분: 월을 올바르게 계산
};

const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"] as const;

// 10:00, 10:10, 10:20, ..., 22:00
const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let hour = 10; hour <= 23; hour++) {
    for (let minute = 0; minute <= 50; minute += 10) {
      const time = `${hour}:${minute.toString().padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
})();

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: Date, time: string) => void;
};

const DatePickerModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const calendarLabel = `${currentYear}년 ${currentMonth + 1}월`;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // 오전 12시
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  const handleMonthChange = useCallback(
    (offset: number) => {
      const newMonth = currentMonth + offset;
      const LAST_MONTH_INDEX = 11;

      if (newMonth < 0) {
        setCurrentMonth(LAST_MONTH_INDEX);
        setCurrentYear(prev => prev - 1);
      } else if (newMonth > LAST_MONTH_INDEX) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(newMonth);
      }
    },
    [currentMonth],
  );

  const handleChange = useCallback(() => {
    onSubmit(selectedDate, selectedTime);
  }, [onSubmit, selectedDate, selectedTime]);

  const handleDateClick = useCallback(
    (day: number) => {
      const newDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newDate);
      handleChange();
    },
    [currentYear, currentMonth, handleChange],
  );

  const handleTimeClick = useCallback(
    (time: string) => {
      setSelectedTime(time);
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    onSubmit(selectedDate, selectedTime);
  }, [selectedDate, selectedTime, onSubmit]);

  const renderCalendar = () => {
    const days: ReactNode[] = [];
    const date = new Date(currentYear, currentMonth, 1);

    const prevLastDay = daysInMonth(currentYear, currentMonth - 1);
    const firstDayIndex = date.getDay();
    const lastDay = daysInMonth(currentYear, currentMonth);
    const lastDayIndex = new Date(currentYear, currentMonth, lastDay).getDay();

    for (let x = firstDayIndex; x > 0; x--) {
      const thisDate = new Date(date);
      thisDate.setMonth(date.getMonth() - 1);
      thisDate.setDate(prevLastDay - x + 1);
      const year = thisDate.getFullYear();
      const month = thisDate.getMonth() + 1;
      const day = thisDate.getDate();
      const dayOfWeek = DAY_OF_WEEK[thisDate.getDay()];
      const label = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;

      const isSelected =
        thisDate.toDateString() === selectedDate.toDateString();
      days.push(
        <div
          key={`prev-${x}`}
          className="flex-center text-slate-400 w-10 aspect-square cursor-default"
          onClick={() => handleMonthChange(-1)}
          role="option"
          aria-label={label}
          aria-selected={isSelected}
        >
          {prevLastDay - x + 1}
        </div>,
      );
    }

    for (let i = 1; i <= lastDay; i++) {
      const thisDate = new Date(date);
      thisDate.setDate(i);
      const year = thisDate.getFullYear();
      const month = thisDate.getMonth() + 1;
      const day = thisDate.getDate();
      const dayOfWeek = DAY_OF_WEEK[thisDate.getDay()];

      const label = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
      const isSelected =
        thisDate.toDateString() === selectedDate.toDateString();
      days.push(
        <div
          key={i}
          className="flex-center text-slate-700 w-10 aspect-square hover:bg-slate-100 cursor-pointer"
          onClick={() => handleDateClick(i)}
          role="option"
          aria-selected={isSelected}
          aria-label={label}
        >
          <div
            className={`flex-center w-8 h-8 rounded-full ${isSelected ? "bg-indigo-600 text-white font-bold" : "bg-transparent"}`}
          >
            {i}
          </div>
        </div>,
      );
    }

    for (let y = 1; y < 7 - lastDayIndex; y++) {
      const thisDate = new Date(date);
      thisDate.setMonth(date.getMonth() + 1);
      thisDate.setDate(y);
      const year = thisDate.getFullYear();
      const month = thisDate.getMonth() + 1;
      const day = thisDate.getDate();
      const dayOfWeek = DAY_OF_WEEK[thisDate.getDay()];

      const label = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
      const isSelected =
        thisDate.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={`next-${y}`}
          className="flex-center text-slate-400 w-10 aspect-square cursor-default"
          onClick={() => handleMonthChange(1)}
          role="option"
          aria-label={label}
          aria-selected={isSelected}
        >
          {y}
        </div>,
      );
    }

    return days;
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="w-96 flex bg-white rounded h-96">
          <section className="flex-none w-[280px]">
            <div className="flex items-center py-2">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                className="flex-none flex-center w-10 h-10"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <span className="flex-1 flex-center font-medium">
                {calendarLabel}
              </span>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="flex-none flex-center w-10 h-10"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
            {/* 요일 */}
            <div className="flex justify-between">
              {DAY_OF_WEEK.map(day => (
                <div key={day} className="flex-1 flex-center select-none py-2">
                  {day}
                </div>
              ))}
            </div>
            {/* Date */}
            <div className="flex flex-wrap justify-between w-full">
              {renderCalendar()}
            </div>
          </section>
          <section className="flex-1 flex flex-col">
            <div className="flex-none">시간</div>
            <ul className="flex-1 overflow-auto no-scrollbar">
              {TIME_SLOTS.map(time => (
                <li
                  key={time}
                  className="flex-center w-full h-12 border-b border-slate-100"
                  onClick={() => {
                    handleTimeClick(time);
                  }}
                >
                  {time}
                </li>
              ))}
            </ul>
          </section>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DatePickerModal;
