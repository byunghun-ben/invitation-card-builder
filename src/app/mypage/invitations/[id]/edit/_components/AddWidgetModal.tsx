"use client";

import { Dialog } from "@headlessui/react";
import { PlusIcon, XIcon } from "lucide-react";
import { MouseEvent, useState } from "react";
import { onAddWidget } from "../_actions/addWidget";

// 위젯 종류
const WIDGET_TYPES = [
  {
    id: 1,
    name: "게시물",
    description: "사진과 본문으로 구성된 게시물이에요.",
    type: "INSTA_POST",
  },
  {
    id: 2,
    name: "지도",
    description: "위치를 표시하는 지도 위젯이에요.",
    type: "INSTA_MAP",
  },
] as const;

type Props = {
  widgetLastOrder: number;
  invitationId: number;
  weddingId: number;
};

const AddWidgetModal = ({
  widgetLastOrder,
  invitationId,
  weddingId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAddWidget = async (e: MouseEvent<HTMLButtonElement>) => {
    const widgetType = e.currentTarget.dataset["widgetType"];

    if (!widgetType) {
      return;
    }

    console.log("invitationId", invitationId, widgetType);
    await onAddWidget({ weddingId, invitationId, widgetType, widgetLastOrder });
    // TODO: 에러 처리
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="group fixed bottom-4 right-4 flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 shadow-md"
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
        <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
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