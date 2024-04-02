import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "../action";

const Page = async () => {
  const supabase = createClient();

  // 로그인 상태인 경우, 메인 페이지로 리다이렉트 합니다.
  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        <div className="flex-1 px-4 py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold mb-10">로그인</h1>
          <form
            className="w-full flex-1 flex flex-col gap-4 mb-4"
            action={login}
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
            <button
              type="submit"
              className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              로그인
            </button>
          </form>

          <div className="flex flex-col gap-1 items-center">
            <Link href="/auth/signup" className="hover:underline">
              <span className="text-sm">회원가입</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
