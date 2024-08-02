"use client";

import { WIDGET_TYPES } from "@/constants";
import { InvitationType, WidgetType } from "@/types/invitation";
import { convertEventAtToDate } from "@/utils/helpers";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import { PlusIcon, XIcon } from "lucide-react";
import { MouseEvent, useState } from "react";
import { onAddWidget } from "../_actions/addWidget";
import { useInvitationContext } from "../_contexts/InvitationContext";

// 위젯 종류

const widgetFactory = (
  widgetType: string,
  invitation: InvitationType,
): WidgetType => {
  switch (widgetType) {
    case "INSTA_COVER": {
      const locationLabel = invitation.location
        ? `${invitation.location?.placeName} (${invitation.location?.placeDetail})`
        : "";
      const eventAtDate = convertEventAtToDate(invitation.eventAt);
      const eventAtString = format(eventAtDate, "yyyy년 MM월 dd일 HH시 mm분");
      return {
        type: "INSTA_COVER",
        id: Math.random().toString(36).slice(2),
        title: "표지",
        url: "",
        content: `💌 ${eventAtString}\n📍 ${locationLabel}`,
      };
    }

    case "INSTA_POST": {
      return {
        type: "INSTA_POST",
        id: Math.random().toString(36).slice(2),
        images: [],
        title: "포스트",
        content: "",
      };
    }

    case "INSTA_MAP": {
      return {
        type: "INSTA_MAP",
        id: Math.random().toString(36).slice(2),
        title: "지도",
        address: invitation.location?.address || "",
        coord: invitation.location?.coord || [],
        placeName: invitation.location?.placeName || "",
        placeDetail: invitation.location?.placeDetail || "",
        roadAddress: invitation.location?.roadAddress || "",
      };
    }

    case "INSTA_GREETING": {
      return {
        type: "INSTA_GREETING",
        id: Math.random().toString(36).slice(2),
        title: "인사말",
        greetingContent:
          "결혼을 하게 되었습니다.\n감사한 마음을 담아 초대하오니\n참석하시어 자리를 빛내주시기를 바랍니다.",
        hosts: invitation.owners.map(owner => ({
          name: owner.name,
          description: `[아버지 · 어머지]의 ${owner.role === "groom" ? "장남" : "장녀"}`,
        })),
      };
    }

    default: {
      throw new Error(`Unknown widget type: ${widgetType}`);
    }
  }
};

const AddWidgetModal = () => {
  const { invitation } = useInvitationContext();
  const invitationId = invitation.id;

  const [isOpen, setIsOpen] = useState(false);

  const handleClickAddWidget = async (e: MouseEvent<HTMLButtonElement>) => {
    const widgetType = e.currentTarget.dataset["widgetType"];

    if (!widgetType) {
      return;
    }

    const newWidget = widgetFactory(widgetType, invitation);

    await onAddWidget({ invitationId, newWidget });
    // TODO: 에러 처리
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="group fixed z-10 bottom-4 right-4 flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <p className="text-sm font-bold text-slate-700">위젯 추가하기</p>
        <PlusIcon className="w-5 h-5 text-slate-500" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        as="div"
        className="fixed inset-0 z-50"
      >
        <Dialog.Backdrop className="fixed z-10 inset-0 bg-black/50" />
        <div className="fixed inset-0 px-6">
          <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[640px] bg-white rounded shadow-md z-50 overflow-hidden">
            <div className="flex-none flex items-center p-4">
              <Dialog.Title className="flex-1 text-xl font-black text-slate-900">
                위젯 추가하기
              </Dialog.Title>

              <button type="button" onClick={() => setIsOpen(false)}>
                <XIcon className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col divide-y divide-slate-200">
                {WIDGET_TYPES.map(widget => (
                  <button
                    key={widget.id}
                    type="button"
                    className="flex items-center gap-4 py-4 px-4 hover:bg-slate-50"
                    data-widget-type={widget.type}
                    onClick={handleClickAddWidget}
                  >
                    {/* <div className="w-6 h-6 bg-slate-200" /> */}
                    <div className="flex-1 flex flex-col gap-1 text-left">
                      <span className="font-bold text-slate-900">
                        {widget.name}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {widget.description}
                      </span>
                    </div>
                    <PlusIcon className="w-6 h-6 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AddWidgetModal;
