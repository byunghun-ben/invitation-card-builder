import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const supabase = createClient();

  // 로그인 상태인 경우, 메인 페이지로 리다이렉트 합니다.
  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session) {
    redirect("/");
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      <Header />
      <section className="flex-1 w-full mx-auto flex-center max-w-md">
        <div className="flex-1 px-6 py-10 flex flex-col items-center">
          <div className="w-full text-center mb-8">
            <h1 className="text-2xl font-black text-slate-700">로그인하기</h1>
          </div>

          <LoginForm />

          <div className="flex flex-col gap-1 items-center mt-2">
            <Button asChild variant="link">
              <Link href="/auth/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
