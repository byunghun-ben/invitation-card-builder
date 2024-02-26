"use client";

import { signUp } from "../actions";

const SignupForm = () => {
  const handleAction = async (formData: FormData) => {
    try {
      await signUp(formData);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form
      action={handleAction}
      className="w-full flex-1 flex flex-col gap-4 mb-6"
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="input-email">이메일</label>
          <input
            id="input-email"
            type="email"
            name="email"
            className="w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="이메일을 입력하세요."
            autoComplete="one-time-code"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="input-password">비밀번호</label>
          <input
            id="input-password"
            type="password"
            name="password"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="비밀번호를 입력하세요."
            autoComplete="one-time-code"
          />
          <input
            type="password"
            name="password-confirmation"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="비밀번호를 다시 입력하세요."
            autoComplete="one-time-code"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <label htmlFor="input-template-code">모바일 청첩장 주소</label>
            <p className="text-xxs">
              https://bora-n-maria.com/ 뒤에 입력한 코드가 붙어서 생성됩니다.
            </p>
          </div>
          <input
            id="input-template-code"
            type="text"
            name="invitation-code"
            className="flex-1 w-full border px-2 py-1 rounded placeholder:text-sm"
            placeholder="청첩장 주소로 사용할 코드를 입력하세요."
            autoComplete="off"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
