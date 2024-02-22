"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border py-2 rounded hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
      disabled={pending}
    >
      <span className="text-sm font-bold">댓글 남기기</span>
    </button>
  );
};

export default SubmitButton;
