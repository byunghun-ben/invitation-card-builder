import Link from "next/link";

const MyPage = async () => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col py-10 px-6">
        <div className="flex items-center mb-10">
          <h2 className="flex-1 text-2xl font-black">청첩장 목록</h2>
          <Link
            href={`/mypage/create/template`}
            className="flex-center h-8 px-2 bg-slate-50 border border-slate-200 rounded select-none text-sm font-bold tracking-tight hover:bg-slate-100"
          >
            새 청첩장 만들기
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col p-3 bg-red-100">
              <h3 className="text-lg font-bold">청첩장 제목</h3>
              <p className="text-sm">청첩장 내용</p>
              <p className="text-sm">최근 수정일: 2021-08-01</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
