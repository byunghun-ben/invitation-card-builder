"use client";

import KakaoLocationSearch from "@/components/KakaoLocationSearch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InstaMapWidgetType } from "@/types/invitation";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { updateInstaMapWidget } from "../_actions/updateInstaMapWidget";
import { useInvitationContext } from "../_contexts/InvitationContext";
import logger from "@/utils/logger";

type Props = {
  widget: InstaMapWidgetType;
  index: number;
};

const EditInstaMapWidgetModal = ({ widget, index }: Props) => {
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
        <Modal widget={widget} index={index} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

type ModalProps = {
  widget: InstaMapWidgetType;
  index: number;
  onClose: () => void;
};

const EditFormSchema = z.object({
  title: z.string(),
  placeName: z.string(),
  placeDetail: z.string(),
  coordX: z.number(),
  coordY: z.number(),
  address: z.string(),
  roadAddress: z.string(),
});

type EditFormValues = z.infer<typeof EditFormSchema>;

const Modal = ({ widget, index, onClose }: ModalProps) => {
  const { invitation } = useInvitationContext();
  const invitationId = invitation.id;

  const form = useForm<EditFormValues>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      title: widget.title,
      placeName: widget.placeName,
      placeDetail: widget.placeDetail,
      coordX: widget.coord[0],
      coordY: widget.coord[1],
      address: widget.address,
      roadAddress: widget.roadAddress,
    },
  });

  const { roadAddress } = useWatch({ control: form.control });

  const [showLocationSearch, setShowLocationSearch] = useState(false);

  const onSubmitSuccess = async (formValues: EditFormValues) => {
    console.log("onSubmitSuccess", formValues);
    try {
      await updateInstaMapWidget({
        formValues,
        widgetIndex: index,
        invitationId,
      });
      onClose();
    } catch (error) {
      logger.error(error);
      return;
    }
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

            <Form {...form}>
              <form
                className="flex-1 flex flex-col gap-6 p-4"
                onSubmit={form.handleSubmit(onSubmitSuccess, console.error)}
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">제목</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold">주소</h4>
                    <span className="text-sm text-slate-700">
                      {roadAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowLocationSearch(prev => !prev)}
                      className="w-full flex-center text-sm font-bold p-2 border bg-slate-100 rounded-lg"
                    >
                      위치 변경
                    </button>
                    {showLocationSearch && (
                      <>
                        <KakaoLocationSearch
                          onSelect={item => {
                            form.setValue("placeName", item.place_name);
                            form.setValue("address", item.address_name);
                            form.setValue(
                              "roadAddress",
                              item.road_address_name,
                            );
                            form.setValue("coordX", Number(item.x));
                            form.setValue("coordY", Number(item.y));
                          }}
                        />
                      </>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="placeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">장소 이름</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="placeDetail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">장소 상세</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-none">
                  <button
                    className="w-full flex-center p-2 border bg-green-600 rounded-lg"
                    type="submit"
                  >
                    <span className="font-bold text-white">저장</span>
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditInstaMapWidgetModal;
