import { getInstaTemplateByCode } from "@/app/[id]/api";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import InstaHeader from "./Components/InstaHeader";
import StorySection from "./Components/StorySection";

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async (props: PageProps) => {
  const templateId = props.params.id;
  const template = await getInstaTemplateByCode(templateId);

  return (
    <div className="flex-1 flex flex-col">
      <nav className="sticky top-0 bg-white flex items-center h-10 border-b pl-2">
        <div className="flex items-center px-2">
          <h1 className="text-sm font-bold text-slate-700">나의 청첩장</h1>
        </div>
        <div className="flex items-center gap-1 px-2">
          <span className="text-sm font-bold text-red-500">편집</span>
          <ChevronRightIcon className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-bold text-slate-400">공유하기</span>
          <ChevronRightIcon className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-bold text-slate-400">결제</span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col bg-slate-100">
        <div className="flex-1 flex flex-col pt-4 px-4">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 mx-auto w-full max-w-md bg-blue-100">
              <InstaHeader metaTitle={template.metadata.title} />
              <StorySection stories={template.stories} />
            </div>
          </div>
          <div className="hidden lg:flex">Hidden on mobile</div>
        </div>
        <div className="bg-red-200 self-end sticky bottom-0 flex items-center justify-end gap-4 pb-4 pr-4">
          <Button>미리보기</Button>
          <Button>다음</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
