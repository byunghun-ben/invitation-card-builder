import Link from "next/link";
import { signUp } from "../actions";

const SignupForm = () => {
  return (
    <div className="flex-1 px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">회원가입</h1>
      <form action={signUp} className="w-full flex-1 flex flex-col gap-4 mb-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>이메일</p>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                name="email"
                className={`
                flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white placeholder:text-sm
                `}
                placeholder="이메일을 입력하세요."
                autoComplete="one-time-code"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>비밀번호</p>
            <input
              type="password"
              name="password"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="비밀번호를 입력하세요."
              autoComplete="one-time-code"
            />
            <input
              type="password"
              name="password-confirmation"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="비밀번호를 다시 입력하세요."
              autoComplete="one-time-code"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <p>모바일 청첩장 주소</p>
              <p className="text-xxs">
                https://bora-n-maria.com/ 뒤에 입력한 코드가 붙어서 생성됩니다.
              </p>
            </div>
            <input
              type="text"
              name="invitation-code"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="청첩장 주소로 사용할 코드를 입력하세요."
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          회원가입
        </button>
      </form>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm">이미 만들던 청첩장이 있나요?</p>
        <Link href="/auth/login" className="hover:underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
