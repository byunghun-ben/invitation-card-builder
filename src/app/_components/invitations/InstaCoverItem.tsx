import { InstaCoverWidgetType } from "@/types/invitation";
import Image from "next/image";

type Props = {
  widget: InstaCoverWidgetType;
};

const InstaCoverItem = ({ widget }: Props) => {
  return (
    <div className="flex flex-col gap-6 py-12">
      <div className="flex flex-col gap-1 items-center">
        <span className="flex text-lg font-bold">{widget.title}</span>
      </div>

      <div className="flex px-10">
        <Image
          className="aspect-[3/4] object-cover rounded-full"
          src={widget.url}
          alt="커버 이미지"
          width={450}
          height={800}
        />
      </div>

      <div className="flex flex-col gap-1 items-center">
        <span className="flex text-sm text-slate-700 whitespace-pre-line">
          {widget.content}
        </span>
      </div>
    </div>
  );
};

export default InstaCoverItem;
