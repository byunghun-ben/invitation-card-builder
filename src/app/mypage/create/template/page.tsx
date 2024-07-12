import RolesFieldset from "./_components/RolesFieldset";
import RolesRadio from "./_components/RolesRadio";
import WeddingHallSection from "./_components/WeddingHallSection/WeddingHallSection";
import { EventFormContextProvider } from "./_hooks/EventFormContext";

const CreateTemplatePage = async () => {
  return (
    <div className="flex flex-col">
      <EventFormContextProvider>
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
      </EventFormContextProvider>
    </div>
  );
};

export default CreateTemplatePage;
