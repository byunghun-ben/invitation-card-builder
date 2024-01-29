import Header from "@/components/Header";
import Link from "next/link";

const getInstagramTemplates = async () => {
  return fetch(process.env.API_URL + "/instagram-templates")
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const Page = async () => {
  const templates = await getInstagramTemplates();

  // 빌드 될 때 콘솔에 보일겁니다요
  console.log(templates);

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
            href="/create"
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
