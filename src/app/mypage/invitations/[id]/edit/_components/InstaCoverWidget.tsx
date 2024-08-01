import { InstaCoverWidgetType } from "@/types/invitation";
import EditInstaCoverWidgetModal from "./EditInstaCoverWidgetModal";
import Image from "next/image";
import WidgetReorderer from "./WidgetReorderer";

type Props = {
  widget: InstaCoverWidgetType;
  index: number;
};

const InstaCoverWidget = ({ widget, index }: Props) => {
  const { title, content } = widget;

  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">표지</span>
        </div>
        <div className="flex-none flex items-center gap-1">
          <WidgetReorderer widgetIndex={index} />
          <EditInstaCoverWidgetModal widget={widget} index={index} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-4">
          <span className="font-bold mb-2">{title}</span>
          <span className="text-sm text-slate-500 whitespace-pre-line">
            {content}
          </span>
        </div>
        <div className="relative aspect-[9/16] bg-yellow-100">
          {widget.url && (
            <Image
              src={widget.url}
              alt="표지 이미지"
              width={450}
              height={800}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InstaCoverWidget;
