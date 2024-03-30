import Header from "@/components/Header";
import NavSection from "./ui/NavSection";
import { getSupabaseUser } from "./action";

const Page = async () => {
  const user = await getSupabaseUser();

  return (
    <div className="flex flex-col">
      <Header />
      <section className="h-[260px] border-b flex items-center justify-center bg-pink-200">
        <h1 className="font-bold">우쥬 메크 청첩장 위드 어스?</h1>
      </section>
      <NavSection user={user} />
    </div>
  );
};

export default Page;
