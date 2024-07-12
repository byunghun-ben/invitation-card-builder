import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const AuthCodeErrorPage = () => {
  return (
    <div className="flex flex-col items-center px-8 py-16">
      <div className="max-w-80 w-full flex flex-col">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-bold">로그인 중 문제가 발생했어요.</h1>
          <p className="text-slate-700 font-medium">
            인증 코드가 유효하지 않습니다.
          </p>
        </div>

        <div className="flex flex-col gap-1 mb-10">
          <span className="flex text-sm text-slate-700">
            문제가 지속되면 관리자에게 문의해주세요.
          </span>
          <span className="flex text-sm text-slate-700">{`이메일 주소: figma@kakao.com`}</span>
        </div>

        <Link
          href="/auth/login"
          className="h-14 flex items-center gap-2 py-2 px-4 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100"
        >
          <span className="flex-1 font-bold">로그인 페이지로 돌아가기</span>
          <ArrowRightIcon className="flex-none w-4 h-4 text-slate-700" />
        </Link>
      </div>
    </div>
  );
};

export default AuthCodeErrorPage;
