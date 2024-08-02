import { InstaGreetingWidgetType } from "@/types/invitation";

type Props = {
  widget: InstaGreetingWidgetType;
};

const InstaGreetingItem = ({ widget }: Props) => {
  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-bold">{widget.title}</p>
        <p className="text-sm text-slate-700 whitespace-pre-line text-center leading-loose">
          {widget.greetingContent}
        </p>
      </div>

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
  );
};

export default InstaGreetingItem;
