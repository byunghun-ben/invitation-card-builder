import Link from "next/link";
import RolesFieldset from "./components/RolesFieldset";
import RolesRadio from "./components/RolesRadio";
import WeddingHallSection from "./components/WeddingHallSection/WeddingHallSection";
import SubmitButton from "./components/SubmitButton";
import { EventFormContextProvider } from "./hooks/EventFormContext";

const Page = async () => {
  return (
    <EventFormContextProvider>
      <nav className="flex-none z-10 sticky top-0 flex items-center border-b h-12 px-4 bg-white">
        <Link href="/" className="font-bold text-sm">
          보란말이야
        </Link>
      </nav>
      <div className="flex flex-1 flex-col bg-slate-50">
        <div className="flex flex-col max-w-md mx-auto py-20">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">호스트 정보 입력</h3>
              <p className="text-sm text-slate-400">
                미리 잘 입력해두면 청첩장 편집이 편리해져요.
              </p>
            </div>

            <RolesRadio />
            <RolesFieldset />
          </section>

          <div className="flex-center gap-4 py-4">
            <div className="h-px w-4 bg-slate-400" />
            <div className="h-1 w-1 bg-slate-400 rounded-full" />
            <div className="h-1 w-1 bg-slate-400 rounded-full" />
            <div className="h-1 w-1 bg-slate-400 rounded-full" />
            <div className="h-px w-4 bg-slate-400" />
          </div>

          <WeddingHallSection />
        </div>

        <SubmitButton />
      </div>
    </EventFormContextProvider>
  );
};

export default Page;
