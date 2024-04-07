"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loading } from "@/components/Loading";
import { login } from "../action";

const FormSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? <Loading /> : <span>로그인</span>}
    </button>
  );
};

const initialState = {
  message: "",
};

const LoginForm = () => {
  const [state, loginFormAction] = useFormState(login, initialState);

  const hasError = state.message.length > 0;

  return (
    <form
      className="w-full flex-1 flex flex-col gap-4 mb-4"
      action={loginFormAction}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p>이메일</p>
          <input
            type="email"
            name="email"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="이메일을 입력하세요."
            autoComplete="one-time-code"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>비밀번호</p>
          <input
            type="password"
            name="password"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="비밀번호를 입력하세요."
            autoComplete="one-time-code"
          />
        </div>
      </div>

      {hasError && <p className="text-red-500">{state.message}</p>}

      <FormSubmitButton />
    </form>
  );
};

export default LoginForm;
