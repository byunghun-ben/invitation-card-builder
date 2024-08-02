import InstaPostItem from "@/app/_components/invitations/InstaPostItem";
import { InstaPostWidgetType } from "@/types/invitation";
import EditInstaPostWidgetModal from "./editModal/EditInstaPostWidgetModal";
import WidgetReorderer from "./WidgetReorderer";

type Props = {
  widget: InstaPostWidgetType;
  index: number;
};

const InstaPostWidget = async ({ widget, index }: Props) => {
  const images = widget.images;
  const isImageEmpty = images.length === 0;

  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">게시물</span>
        </div>
        <div className="flex-none flex items-center gap-1">
          <WidgetReorderer widgetIndex={index} />
          <EditInstaPostWidgetModal widget={widget} index={index} />
        </div>
      </div>

      <div className="flex flex-col bg-slate-100">
        <InstaPostItem widget={widget} />
      </div>
    </div>
  );
};

export default InstaPostWidget;
