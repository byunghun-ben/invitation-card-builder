"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import CommonInput from "./CommonInput";

// onChange가 충돌이 되어 omit 처리
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      error = "",
      leftIcon = null,
      rightIcon = null,
      ...props
    },
    ref,
  ) => {
    return (
      <CommonInput
        value={value}
        onChange={e => onChange(e.target.value)}
        error={error}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        ref={ref}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
