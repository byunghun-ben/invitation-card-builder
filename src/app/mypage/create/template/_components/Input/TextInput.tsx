"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import CommonInput from "./CommonInput";

// onChange가 충돌이 되어 omit 처리
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const TextInput = ({
  value,
  onChange,
  error = "",
  leftIcon = null,
  rightIcon = null,
  ...props
}: Props) => {
  return (
    <CommonInput
      value={value}
      onChange={e => onChange(e.target.value)}
      error={error}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...props}
    />
  );
};

export default TextInput;
