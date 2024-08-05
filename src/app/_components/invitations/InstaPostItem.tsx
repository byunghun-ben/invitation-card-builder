import { getComments } from "@/actions/invitations/comments";
import { getWidgetLike } from "@/actions/invitations/likes";
import { InstaPostWidgetType } from "@/types/invitation";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import InstaPostLikeButton from "./InstaPostLikeButton";
import InstaPostCommentsModal from "./modals/InstaPostCommentsModal";
import { ModalProvider } from "./modals/ModalContext";
import ModalTrigger from "./modals/ModalTrigger";

type Props = {
  widget: InstaPostWidgetType;
};

const InstaPostItem = async ({ widget }: Props) => {
  const { images, content } = widget;

  const [widgetLike, widgetComments] = await Promise.all([
    getWidgetLike(widget.id),
    getComments(widget.id),
  ]);

  const widgetLikeCount = widgetLike?.likes.length || 0;
  const widgetCommentCount = widgetComments?.comments.length || 0;

  return (
    <div className="flex-none flex flex-col">
      <div className="flex items-center gap-2 p-2">
        <div className="flex-center w-6 h-6 bg-orange-100 rounded-full">
          <PhotoIcon width={16} height={16} color="#FFA500" />
        </div>
        <p className="text-sm">{widget.title}</p>
      </div>

      <div className="relative">
        <div className="w-full" style={{ paddingBottom: "100%" }} />
        <div className="absolute inset-0">
          <div className="w-full h-full relative overflow-hidden">
            <ul
              className="flex bg-yellow-50 h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar scrolling-touch"
              role="presentation"
            >
              {images.length === 0 && (
                <li className="w-full h-full flex-center">
                  <div>이미지가 없습니다.</div>
                </li>
              )}

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

      <ModalProvider>
        <div className="flex flex-col py-1">
          <div className="relative flex items-center">
            <InstaPostLikeButton widgetId={widget.id} widgetLike={widgetLike} />
            <ModalTrigger>
              <div className="flex p-2">
                <ChatBubbleOvalLeftIcon className="w-6 h-6" />
              </div>
            </ModalTrigger>
          </div>
          <div className="flex gap-2 px-3">
            <span className="text-sm font-medium">{`좋아요 ${widgetLikeCount}개`}</span>
            <ModalTrigger>
              <span className="text-sm font-medium">{`댓글 ${widgetCommentCount}개`}</span>
            </ModalTrigger>
          </div>
        </div>

        {!!content && (
          <div className="flex flex-col gap-1 py-1 px-3">
            <p className="text-sm whitespace-pre-line">{content}</p>
          </div>
        )}
        <InstaPostCommentsModal
          widgetComments={widgetComments}
          widgetId={widget.id}
        />
      </ModalProvider>
    </div>
  );
};

export default InstaPostItem;
