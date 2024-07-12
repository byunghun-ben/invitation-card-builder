import Header from "@/components/Header";
import SampleView from "@/components/LandingPage/SampleView";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex flex-1 flex-col">
        <section className="px-6 py-12">
          <div className="w-full mx-auto flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-none flex flex-col gap-3 text-center md:flex-1">
              <p className="font-bold text-slate-500">
                결혼을 앞둔 개발자가 백수 때 만든 청첩장 에디터
              </p>
              <h1 className="text-3xl font-black text-slate-900 whitespace-normal">
                우리의 이야기를 담은 모바일 청첩장
              </h1>
              <p className="text-slate-700 font-medium">
                우리만의 피드를 만들고, 공유해보세요.
              </p>
              <Link
                href="/auth/login"
                className="flex-none mx-auto py-2 px-4 bg-green-700 rounded-xl"
              >
                <span className="text-white font-bold text-lg">시작하기</span>
              </Link>
            </div>

            <div className="relative flex-none mx-auto w-full max-w-96 aspect-[1/2] bg-white p-4 border border-slate-400 rounded-3xl">
              <SampleView />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
