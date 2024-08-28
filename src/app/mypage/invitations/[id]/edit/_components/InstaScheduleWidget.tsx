import InstaScheduleItem from "@/app/_components/invitations/InstaScheduleItem";
import { InstaScheduleWidgetType } from "@/types/invitation";
import DeleteAlertDialog from "./DeleteAlertDialog";
import WidgetReorderer from "./WidgetReorderer";

type Props = {
  widget: InstaScheduleWidgetType;
  index: number;
};

const InstaScheduleWidget = ({ widget, index }: Props) => {
  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">일정</span>
        </div>
        <div className="flex-none flex items-center gap-1">
          <WidgetReorderer widgetIndex={index} />
          {/* <EditInstaCoverWidgetModal widget={widget} index={index} /> */}
          <DeleteAlertDialog widgetId={widget.id} />
        </div>
      </div>

      <InstaScheduleItem widget={widget} />
    </div>
  );
};

export default InstaScheduleWidget;
