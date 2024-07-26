"use client";

import { createClient } from "@/utils/supabase/client";
import { Dialog } from "@headlessui/react";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { editInstaPostWidget } from "../_actions/editInstaPostWidget";
import { InstaPostWidget } from "../types";

type Props = {
  widget: InstaPostWidget;
  invitationId: number;
};

const BUKET_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images";

const EditInstaPostWidgetModal = ({ widget, invitationId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200"
        onClick={() => setIsOpen(true)}
      >
        위젯 수정
      </button>

      {isOpen && (
        <Modal
          invitationId={invitationId}
          widget={widget}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

type ModalProps = {
  invitationId: number;
  widget: InstaPostWidget;
  onClose: () => void;
};

const Modal = ({ invitationId, widget, onClose }: ModalProps) => {
  const [content, setContent] = useState(widget.instaPostWidget.content);
  const [images, setImages] = useState(
    widget.instaPostWidget.images.map(({ id, url }) => ({
      id,
      url,
      isNew: false,
    })),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      as="div"
      className="fixed inset-0 z-50"
    >
      <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 px-6">
        <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[640px] bg-white rounded shadow-md z-50 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex-none flex items-center p-4">
              <h3 className="text-lg font-bold">게시물 위젯 수정하기</h3>
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
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) {
                          return;
                        }

                        // 사용할 수 없는 문자열이 포함되어 있는 경우가 있음
                        // 파일 이름을 유지할 필요가 없다면, 파일 이름을 Date.now()로 변경하자.
                        const fileName = `${Date.now()}`;

                        const supabase = createClient();
                        const { data, error } = await supabase.storage
                          .from("images")
                          .upload(fileName, file);

                        if (error) {
                          console.error(error);
                          return;
                        }

                        const url = `${BUKET_URL}/${data.path}`;
                        const imagesRes = await supabase
                          .from("images")
                          .insert({
                            image_url: url,
                          })
                          .select(
                            `
                            id,
                            url:image_url
                            `,
                          )
                          .single();

                        if (imagesRes.error) {
                          console.error(imagesRes.error);
                          return;
                        }

                        setImages(prevImages => {
                          return [
                            ...prevImages,
                            {
                              id: imagesRes.data.id,
                              url: imagesRes.data.url,
                              isNew: true,
                            },
                          ];
                        });
                        // setImages(prevImages => {
                        //   return [...prevImages, { url: data.path }];
                        // });
                      }}
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
                  await editInstaPostWidget.bind(null, {
                    invitationId,
                    widgetId: widget.id,
                    content,
                    imageIds: images
                      .filter(({ isNew }) => isNew)
                      .map(image => image.id),
                  })();

                  // revalidatePath를 통해서, 위젯 수정 완료 후 페이지 컴포넌트를 다시 렌더링하도록 했음.
                  // 하지만, EditInstaPostWidgetModal 컴포넌트는 페이지 컴포넌트를 다시 렌더링하더라도 유지가 된다.
                  // 그래서, useState의 기본값이 새로 업데이트되어도, 이전 값을 유지하고 있다.
                  onClose();
                  // setImages(prev =>
                  //   prev.map(image => ({ ...image, isNew: false })),
                  // );
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
