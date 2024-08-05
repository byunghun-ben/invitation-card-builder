import InstaPostItem from "@/app/_components/invitations/InstaPostItem";
import { InstaPostWidgetType } from "@/types/invitation";
import EditInstaPostWidgetModal from "./editModal/EditInstaPostWidgetModal";
import WidgetReorderer from "./WidgetReorderer";
import DeleteAlertDialog from "./DeleteAlertDialog";

type Props = {
  widget: InstaPostWidgetType;
  index: number;
};

const InstaPostWidget = async ({ widget, index }: Props) => {
  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">게시물</span>
        </div>
        <div className="flex-none flex items-center gap-1">
          <WidgetReorderer widgetIndex={index} />
          <EditInstaPostWidgetModal widget={widget} index={index} />
          <DeleteAlertDialog widgetId={widget.id} />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <InstaPostItem widget={widget} />
      </div>
    </div>
  );
};

export default InstaPostWidget;
