"use client";

import { InputHTMLAttributes, ReactNode, useCallback, useState } from "react";
import CommonInput from "./CommonInput";
import { Dialog } from "@headlessui/react";
import DatePickerModal from "./DatePickerModal";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const DateInput = ({
  value,
  onChange,
  error = "",
  leftIcon = null,
  rightIcon = null,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = useCallback(
    (date: Date, time: string) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const ampm = Number(hour) < 12 ? "오전" : "오후";
      onChange(`${year}년 ${month}월 ${day}일 ${ampm} ${hour}시 ${minute}분`);
    },
    [onChange],
  );

  return (
    <>
      <CommonInput
        value={value}
        // onChange={e => onChange(e.target.value)}
        onClick={() => {
          console.log("clicked");
          setIsOpen(true);
        }}
        error={error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      />
      <DatePickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleChange}
      />
    </>
  );
};

export default DateInput;
