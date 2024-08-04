"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InstaCoverWidgetType } from "@/types/invitation";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { Dialog } from "@headlessui/react";
import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { updateInstaCoverWidget } from "../../_actions/updateInstaCoverWidget";
import { useInvitationContext } from "../../../../../../_contexts/InvitationContext";

type Props = {
  widget: InstaCoverWidgetType;
  index: number;
};

const BUKET_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images";

const EditInstaCoverWidgetModal = ({ widget, index }: Props) => {
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
  widget: InstaCoverWidgetType;
  index: number;
  onClose: () => void;
};

const Modal = ({ widget, index, onClose }: ModalProps) => {
  const { invitation } = useInvitationContext();
  const invitationId = invitation.id;

  const [isImageUploading, setIsImageUploading] = useState(false);

  const [title, setTitle] = useState(widget.title);
  const [imageUrl, setImageUrl] = useState(widget.url);
  const [content, setContent] = useState(widget.content);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) {
        return;
      }

      setIsImageUploading(true);
      const fileName = `${Date.now()}`;
      const supabase = createClient();

      try {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        const url = `${BUKET_URL}/${data.path}`;

        setImageUrl(url);
      } catch (error) {
        logger.error("Error uploading image", error);
      } finally {
        setIsImageUploading(false);
      }
    },
    [],
  );

  const handleImageError = useCallback(() => {
    setImageUrl("");
  }, []);

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
          <div className="flex-none flex items-center p-4">
            <h3 className="text-lg font-bold">위젯 수정하기</h3>
            <button type="button" className="ml-auto" onClick={onClose}>
              <XIcon />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col border">
                <div className="flex flex-col p-4">
                  <span className="font-bold mb-2">{title}</span>
                  <span className="text-sm text-slate-500 whitespace-pre-line">
                    {content}
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
                      className="aspect-[9/16] object-cover"
                      alt="이미지"
                      src={imageUrl}
                      onError={handleImageError}
                      width={450}
                      height={800}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="insta-cover-title">제목</Label>
              <Input
                id="insta-cover-title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="insta-cover-content">내용</Label>
              <Textarea
                id="insta-cover-content"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="flex-1">이미지</Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  size="sm"
                  variant="outline"
                  disabled={isImageUploading}
                >
                  {isImageUploading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <span className="text-sm">변경</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  onClick={() => {
                    setImageUrl("");
                  }}
                  size="sm"
                  variant="outline"
                >
                  <span className="text-sm text-red-600">삭제</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-none p-4">
            <Button
              className="w-full"
              size="lg"
              variant="default"
              color="green"
              onClick={async () => {
                await updateInstaCoverWidget({
                  title,
                  content,
                  imageUrl,
                  invitationId,
                  widgetIndex: index,
                });

                onClose();
              }}
            >
              <span className="font-bold">저장</span>
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditInstaCoverWidgetModal;
