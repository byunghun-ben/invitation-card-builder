import NavigationHeader from "@/components/NavigationHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signInWithKakao } from "./_actions/signInWithKakao";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

type Props = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

const Page = async ({ searchParams }: Props) => {
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
      <NavigationHeader />
      <section className="flex-1 w-full flex flex-col items-center px-8 py-16">
        <div className="max-w-80 w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-black text-slate-700">로그인하기</h1>
            <p className="text-slate-500 font-medium">
              모바일 청첩장을 만들기 위해서 로그인이 필요해요!
            </p>
          </div>

          <form
            action={signInWithKakao.bind(null, { next })}
            className="flex flex-col"
          >
            <button
              type="submit"
              className="h-14 flex items-center rounded-lg border pl-6 pr-4 bg-slate-50 hover:bg-slate-100"
            >
              <span className="flex-1 text-left font-bold">
                카카오 아이디로 로그인
              </span>
              <ArrowRightIcon className="w-4 h-4 text-slate-700" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Page;
