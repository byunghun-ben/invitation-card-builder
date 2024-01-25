import Header from "@/components/Header";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="container py-20">
        <div className="flex justify-center divide-x">
          <div className="p-4 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-10">처음 청첩장을 만든다면?</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <span className="flex-none">https://bora-n-maria.com/</span>
                  <input
                    type="text"
                    className="flex-1 border px-2 py-1 rounded dark:bg-slate-900 dark:text-white"
                    placeholder="주소를 입력하세요"
                  />
                </div>
                <div className="flex flex-col w-full text-xs">
                  <span>청첩장을 보기 위해 접근하는 주소입니다.</span>
                  <span>(결제 전에는 확인할 수 없어요.)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full dark:bg-slate-900 dark:text-white"
                  placeholder="비밀번호를 입력하세요."
                />
                <div className="flex flex-col w-full text-xs">
                  <span>청첩장을 수정할 때, 사용할 비밀번호를 입력하세요.</span>
                </div>
              </div>
              <Link
                href="/create/example"
                className="border rounded py-1 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                만들기
              </Link>
            </div>
          </div>

          <div className="p-4 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-10">만들던 청첩장이 있다면?</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <span className="flex-none">https://bora-n-maria.com/</span>
                  <input
                    type="text"
                    className="border px-2 py-1 rounded dark:bg-slate-900 dark:text-white"
                    placeholder="주소를 입력하세요"
                  />
                </div>
                <div className="flex flex-col w-full text-xs">
                  <span>청첩장을 보기 위해 접근하는 주소입니다.</span>
                  <span>(결제 전에는 확인할 수 없어요.)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full dark:bg-slate-900 dark:text-white"
                  placeholder="비밀번호를 입력하세요."
                />
                <div className="flex flex-col w-full text-xs">
                  <span>청첩장을 수정할 때, 사용할 비밀번호를 입력하세요.</span>
                </div>
              </div>
              <Link
                href="/create/example"
                className="border rounded py-1 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                만들기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
