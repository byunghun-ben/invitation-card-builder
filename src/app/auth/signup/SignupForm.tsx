"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loading } from "@/components/Loading";
import { signUp } from "../action";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? <Loading /> : <span>회원가입</span>}
    </button>
  );
};

const SignupForm = () => {
  const [formState, signUpFormAction] = useFormState(signUp, { message: "" });

  const hasError = formState.message.length > 0;

  return (
    <form
      action={signUpFormAction}
      className="w-full flex-1 flex flex-col gap-4 mb-6"
    >
      <div className="flex-1 flex flex-col gap-4">
        <label htmlFor="input-email" className="flex flex-col gap-1">
          <span>이메일</span>
          <input
            id="input-email"
            type="email"
            name="email"
            className="w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="이메일을 입력하세요."
            autoComplete="one-time-code"
          />
        </label>

        <div className="flex flex-col gap-1">
          <label htmlFor="input-password" className="flex flex-col gap-1">
            <span>비밀번호</span>
            <input
              id="input-password"
              type="password"
              name="password"
              className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
              placeholder="비밀번호를 입력하세요."
              autoComplete="one-time-code"
            />
          </label>
          <input
            type="password"
            name="password-confirmation"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="비밀번호를 다시 입력하세요."
            autoComplete="one-time-code"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="input-template-code" className="flex flex-col gap-1">
            <span>모바일 청첩장 주소</span>
            <input
              id="input-template-code"
              type="text"
              name="invitation-code"
              className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
              placeholder="청첩장 주소로 사용할 코드를 입력하세요."
              autoComplete="off"
            />
          </label>
          <p className="text-xs text-slate-500">
            {`${DOMAIN} 뒤에 입력한 코드가 붙어서 생성됩니다.`}
          </p>
        </div>
      </div>

      {hasError && (
        <div className="text-red-500 text-sm text-center">
          {formState.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
};

export default SignupForm;
