"use client";

import { InstaPostWidgetType } from "@/types/invitation";
import { createClient } from "@/utils/supabase/client";
import { Dialog } from "@headlessui/react";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { editInstaPostWidget } from "../_actions/editInstaPostWidget";
import { InstaPostWidget } from "../types";
import { useInvitationContext } from "../_contexts/InvitationContext";

type Props = {
  widget: InstaPostWidgetType;
  index: number;
};

const BUKET_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images";

const EditInstaPostWidgetModal = ({ widget, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex py-2 px-3 text-xs font-bold bg-slate-100 rounded-md hover:bg-slate-200"
        onClick={() => setIsOpen(true)}
      >
        수정
      </button>

      {isOpen && (
        <Modal widget={widget} index={index} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

type ModalProps = {
  widget: InstaPostWidgetType;
  index: number;
  onClose: () => void;
};

const Modal = ({ widget, index, onClose }: ModalProps) => {
  const { invitation } = useInvitationContext();
  const invitationId = invitation.id;

  const [content, setContent] = useState(widget.content);
  const [images, setImages] = useState(
    widget.images.map(({ id, url }) => ({
      id,
      url,
    })),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}`;

    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    return `${BUKET_URL}/${data.path}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }

    const url = await uploadImage(file);
    if (!url) {
      return;
    }

    setImages(prevImages => {
      return [
        ...prevImages,
        {
          id: Math.random().toString(36).slice(2),
          url,
        },
      ];
    });
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      as="div"
      className="fixed inset-0 z-50"
    >
      <Dialog.Backdrop className="fixed z-10 inset-0 bg-black/50" />
      <div className="fixed inset-0 px-6">
        <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[640px] bg-white rounded shadow-md z-50 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex-none flex items-center p-4">
              <h3 className="text-lg font-bold">위젯 수정하기</h3>
              <button type="button" className="ml-auto" onClick={onClose}>
                <XIcon />
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-6 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <h4 className="flex-1 font-bold">이미지</h4>
                  <button
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                    className="flex items-center border p-2 rounded-lg"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </button>
                </div>
                <div className="relative border rounded-lg min-h-32 grid grid-cols-3 gap-2 p-2">
                  {images.length === 0 && (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                      사진을 등록해주세요
                    </span>
                  )}
                  {images.map(image => (
                    <div
                      key={image.url}
                      className="relative aspect-square border"
                    >
                      <Image
                        src={image.url}
                        alt="이미지"
                        className="object-cover w-full h-full"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-white rounded-full"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <h4 className="flex-1 font-bold">내용</h4>
                </div>
                <textarea
                  className="text-sm border p-2 rounded-lg resize-none"
                  value={content}
                  onChange={e => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex-none p-4">
              <button
                className="w-full flex-center p-2 border bg-green-600 rounded-lg"
                onClick={async () => {
                  await editInstaPostWidget({
                    invitationId,
                    widgetIndex: index,
                    content,
                    images,
                  });

                  onClose();
                }}
              >
                <span className="font-bold text-white">저장</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditInstaPostWidgetModal;
