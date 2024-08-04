"use client";

import { Dialog } from "@headlessui/react";
import { useInvitationContext } from "../../../../../../_contexts/InvitationContext";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstaGreetingWidgetType } from "@/types/invitation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logger from "@/utils/logger";
import { updateInstaGreetingWidget } from "../../_actions/updateInstaGreetingWidget";
import toast from "react-hot-toast";

type Props = {
  widget: InstaGreetingWidgetType;
  index: number;
};

const EditInstaGreetingWidgetModal = ({ widget, index }: Props) => {
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
  widget: InstaGreetingWidgetType;
  index: number;
  onClose: () => void;
};

const formSchema = z.object({
  title: z.string(),
  greetingContent: z.string(),
  hosts: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

const Modal = ({ widget, index, onClose }: ModalProps) => {
  const { invitation } = useInvitationContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: widget.title,
      greetingContent: widget.greetingContent,
      hosts: widget.hosts,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const hostFieldArray = useFieldArray({
    control,
    name: "hosts",
  });

  const handleSubmitSuccess = useCallback<SubmitHandler<FormValues>>(
    async values => {
      await updateInstaGreetingWidget(invitation.id, index, values);
      toast.success("위젯이 수정되었습니다.");
      onClose();
    },
    [onClose, invitation.id, index],
  );

  const handleClickSubmitButton = useCallback(() => {
    handleSubmit(handleSubmitSuccess, logger.error)();
  }, [handleSubmit, handleSubmitSuccess]);

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
          <header className="flex-none flex items-center p-4">
            <h3 className="text-lg font-bold">위젯 수정하기</h3>
            <button type="button" className="ml-auto" onClick={onClose}>
              <XIcon />
            </button>
          </header>

          <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
            <Form {...form}>
              <form className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="greetingContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hostFieldArray.fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2">
                      <p className="flex font-bold">
                        호스트 정보 ({index + 1})
                      </p>

                      <FormField
                        control={form.control}
                        name={`hosts.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>이름</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hosts.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>설명</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="resize-none" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </form>
            </Form>
          </div>

          <footer className="flex-none flex flex-col p-4">
            <Button
              className="self-end"
              size="lg"
              variant="default"
              color="green"
              onClick={handleClickSubmitButton}
              disabled={isSubmitting}
            >
              저장
            </Button>
          </footer>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditInstaGreetingWidgetModal;
