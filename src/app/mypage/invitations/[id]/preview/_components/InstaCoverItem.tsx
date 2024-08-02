import { InstaCoverWidgetType } from "@/types/invitation";
import Image from "next/image";

type Props = {
  widget: InstaCoverWidgetType;
};

const InstaCoverItem = ({ widget }: Props) => {
  return (
    <div className="flex flex-col px-10">
      <div className="flex flex-col items-center">
        <span className="flex">{widget.title}</span>
        <span>{widget.content}</span>
      </div>
      <Image
        className="aspect-[9/16] object-cover"
        src={widget.url}
        alt="커버 이미지"
        width={450}
        height={800}
      />
    </div>
  );
};

export default InstaCoverItem;
