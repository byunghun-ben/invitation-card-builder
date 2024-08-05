import { InstaGreetingWidgetType } from "@/types/invitation";
import { HandRaisedIcon } from "@heroicons/react/20/solid";

type Props = {
  widget: InstaGreetingWidgetType;
};

const InstaGreetingItem = ({ widget }: Props) => {
  return (
    <div className="flex-none flex flex-col">
      <div className="flex items-center gap-2 p-2">
        <div className="flex-center w-6 h-6 bg-orange-100 rounded-full">
          <HandRaisedIcon width={16} height={16} color="#FFA500" />
        </div>
        <p className="text-sm">{widget.title}</p>
      </div>

      <div className="flex flex-col gap-10 border rounded-xl p-3">
        <p className="text-sm text-slate-700 whitespace-pre-line text-center leading-loose">
          {widget.greetingContent}
        </p>

        <div className="flex gap-4 items-start justify-center mx-auto">
          {widget.hosts.map(host => (
            <div
              key={host.name}
              className="flex-1 flex flex-col gap-2 items-center"
            >
              <div className="text-slate-700 font-medium">{host.name}</div>
              <div className="text-slate-500 text-sm">{host.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstaGreetingItem;
