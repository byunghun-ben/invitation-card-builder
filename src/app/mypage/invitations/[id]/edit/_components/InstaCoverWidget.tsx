import { InstaCoverWidgetType } from "@/types/invitation";
import EditInstaCoverWidgetModal from "./EditInstaCoverWidgetModal";

type Props = {
  widget: InstaCoverWidgetType;
};

const InstaCoverWidget = ({ widget }: Props) => {
  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">표지</span>
        </div>
        <EditInstaCoverWidgetModal widget={widget} />
      </div>

      <div className="flex flex-col">
        <div className="aspect-[9/16] relative bg-yellow-100"></div>
      </div>
    </div>
  );
};

export default InstaCoverWidget;
