import Image from "next/image";
import EditInstaPostWidgetModal from "./EditInstaPostWidgetModal";
import { InstaPostWidgetType } from "@/types/invitation";

type Props = {
  widget: InstaPostWidgetType;
};

const InstaPostWidget = async ({ widget }: Props) => {
  const images = widget.images;
  const isImageEmpty = images.length === 0;

  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">게시물</span>
        </div>
        <EditInstaPostWidgetModal widget={widget} />
      </div>

      <div className="flex flex-col border-b border-slate-200">
        {isImageEmpty && (
          <div className="flex-center py-20">
            <span className="text-sm font-medium text-slate-500">
              사진을 등록해주세요
            </span>
          </div>
        )}

        {!isImageEmpty && (
          <div className="relative">
            <div className="w-full" style={{ paddingBottom: "100%" }} />
            <div className="absolute inset-0">
              <div className="w-full h-full relative overflow-hidden">
                <ul
                  className="flex bg-yellow-50 h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar scrolling-touch"
                  role="presentation"
                >
                  {images.map((image, index) => (
                    <li
                      key={image.id}
                      className="relative flex-none h-full w-full snap-start"
                    >
                      <Image
                        src={image.url}
                        alt="이미지"
                        className="object-cover h-full w-full"
                        width={510}
                        height={510}
                        draggable={false}
                        priority={index === 0}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="text-sm text-slate-900">
          {widget.content || "내용을 입력해주세요"}
        </span>
      </div>
    </div>
  );
};

export default InstaPostWidget;
