"use client";

import { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const CommonInput = ({
  error = "",
  inputProps = {},
  className = "",
  leftIcon = null,
  rightIcon = null,
  ...props
}: Props) => {
  return (
    <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200">
      <div className="flex-none flex items-center">{leftIcon}</div>
      <input
        className={`peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 1 ${className}`}
        {...inputProps}
        {...props}
      />
      <div className="flex-none flex items-center">{rightIcon}</div>
    </label>
  );
};

export default CommonInput;
