import { InstaGreetingWidgetType } from "@/types/invitation";
import WidgetReorderer from "./WidgetReorderer";
import EditInstaGreetingWidgetModal from "./editModal/EditInstaGreetingWidgetModal";
import InstaGreetingItem from "@/app/_components/invitations/InstaGreetingItem";
import DeleteAlertDialog from "./DeleteAlertDialog";

type Props = {
  widget: InstaGreetingWidgetType;
  index: number;
};

const InstaGreetingWidget = async ({ widget, index }: Props) => {
  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">인사말</span>
        </div>
        <div className="flex-none flex items-center gap-1">
          <WidgetReorderer widgetIndex={index} />
          <EditInstaGreetingWidgetModal widget={widget} index={index} />
          <DeleteAlertDialog widgetId={widget.id} />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <InstaGreetingItem widget={widget} />
      </div>
    </div>
  );
};

export default InstaGreetingWidget;
