import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signInWithKakao } from "./_actions/signInWithKakao";

type Props = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

const Page = async ({ searchParams }: Props) => {
  console.log("로그인 페이지", searchParams);
  // 로그인 후 리다이렉트할 URL을 가져옵니다.
  const next = searchParams.next ?? "/";

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

          <form action={signInWithKakao.bind(null, { next })}>
            <button type="submit">카카오로 로그인하기</button>
          </form>

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
