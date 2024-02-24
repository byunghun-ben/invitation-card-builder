import Header from "@/components/Header";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="h-[260px] border-b flex items-center justify-center bg-pink-200">
        <h1 className="font-bold">우쥬 메크 청첩장 위드 어스?</h1>
      </section>
      <section className="py-20">
        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/sample"
            className="border border-slate-700 rounded-full py-2 px-4"
          >
            샘플 청첩장 보기
          </Link>
          <Link
            href="/auth/signup"
            className="border border-slate-700 rounded-full py-2 px-4"
          >
            우리 청첩장 만들기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
