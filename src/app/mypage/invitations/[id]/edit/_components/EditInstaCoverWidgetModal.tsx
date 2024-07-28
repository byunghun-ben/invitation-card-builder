"use client";

import { InstaCoverWidgetType } from "@/types/invitation";
import { createClient } from "@/utils/supabase/client";
import { Dialog, RadioGroup } from "@headlessui/react";
import { format } from "date-fns";
import { PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInvitationContext } from "../_contexts/InvitationContext";

type Props = {
  widget: InstaCoverWidgetType;
};

const BUKET_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images";

const EditInstaCoverWidgetModal = ({ widget }: Props) => {
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

      {isOpen && <Modal widget={widget} onClose={() => setIsOpen(false)} />}
    </>
  );
};

type ModalProps = {
  widget: InstaCoverWidgetType;
  onClose: () => void;
};

const Modal = ({ widget, onClose }: ModalProps) => {
  const { invitation } = useInvitationContext();

  const { location, eventAt } = invitation;

  const locationLabel = location
    ? `${location?.placeName} (${location?.placeDetail})`
    : "";

  // 예식 날짜 + 시간
  const weddingDateTimeString = `${eventAt.date} ${eventAt.time}`;
  const date = new Date(weddingDateTimeString);

  const [title, setTitle] = useState(widget.title);
  const [imageUrl, setImageUrl] = useState(widget.url);
  const [dateFormatString, setDateFormatString] = useState("yyyy-MM-dd HH:mm");

  const formattedDate = format(date, dateFormatString);
  // const [content, setContent] = useState(widget.instaPostWidget.content);
  // const [images, setImages] = useState(
  //   widget.instaPostWidget.images.map(({ id, url }) => ({
  //     id,
  //     url,
  //     isNew: false,
  //   })),
  // );
  const fileInputRef = useRef<HTMLInputElement>(null);

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

                        setImageUrl(url);
                      }}
                    />
                  </button>
                </div>

                <div className="flex flex-col border">
                  <div className="flex flex-col p-4">
                    <span className="font-bold mb-2">{title}</span>
                    <span className="text-sm text-slate-500">
                      {locationLabel}
                    </span>
                    <span className="text-sm text-slate-500">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="relative rounded-lg min-h-32">
                    {!imageUrl && (
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                        사진을 등록해주세요
                      </span>
                    )}
                    {imageUrl && (
                      <Image
                        alt="이미지"
                        src={imageUrl}
                        onError={() => setImageUrl("")}
                        width={450}
                        height={800}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <RadioGroup
                  value={dateFormatString}
                  onChange={setDateFormatString}
                >
                  <RadioGroup.Label className="block text-sm font-bold">
                    날짜 형식
                  </RadioGroup.Label>
                  <div className="flex gap-4">
                    {[
                      "yyyy-MM-dd HH:mm",
                      "yyyy년 MM월 dd일 HH시 mm분",
                      "yyyy년 MM월 dd일",
                    ].map(formatString => (
                      <RadioGroup.Option
                        key={formatString}
                        value={formatString}
                        className="flex items-center gap-2"
                      >
                        <RadioGroup.Label>{formatString}</RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex-none p-4">
              <button
                className="w-full flex-center p-2 border bg-green-600 rounded-lg"
                onClick={async () => {
                  // await editInstaPostWidget.bind(null, {
                  //   invitationId,
                  //   widgetId: widget.id,
                  //   content,
                  //   imageIds: images
                  //     .filter(({ isNew }) => isNew)
                  //     .map(image => image.id),
                  // })();

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

export default EditInstaCoverWidgetModal;
