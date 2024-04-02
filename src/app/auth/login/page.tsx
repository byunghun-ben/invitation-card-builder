import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "../action";
import LoginForm from "./LoginForm";

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
          <LoginForm />

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
