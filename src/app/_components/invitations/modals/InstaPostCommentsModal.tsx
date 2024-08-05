"use client";

import { postWidgetComment } from "@/actions/invitations/comments";
import { useInvitationContext } from "@/app/_contexts/InvitationContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentType } from "@/types/invitation";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useModalContext } from "./ModalContext";

type Props = {
  widgetId: string;
  widgetComments: CommentType | null;
};

const CommentFormSchema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),
  content: z.string().min(1, "내용을 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

type CommentFormType = z.infer<typeof CommentFormSchema>;

const InstaPostCommentsModal = ({ widgetId, widgetComments }: Props) => {
  const comments = widgetComments?.comments || [];

  const { invitation } = useInvitationContext();
  const { isOpen, closeModal } = useModalContext();

  const [showForm, setShowForm] = useState(false);

  const form = useForm<CommentFormType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      name: "",
      content: "",
      password: "",
    },
  });

  const handleClose = useCallback(() => {
    closeModal();
    form.reset();
  }, [closeModal, form]);

  const toggleForm = useCallback(() => {
    setShowForm(prev => !prev);
  }, []);

  const onValidSubmit = useCallback(
    async (formValues: CommentFormType) => {
      const commentId = Math.random().toString(36).slice(2);

      await postWidgetComment(invitation.id, widgetId, {
        ...formValues,
        id: commentId,
      });

      toggleForm();
      form.reset();
    },
    [invitation.id, widgetId, toggleForm, form],
  );

  return (
    <>
      {isOpen && (
        <Dialog
          as="div"
          open={isOpen}
          onClose={handleClose}
          className="fixed inset-0 z-50"
        >
          <Dialog.Backdrop className="fixed z-10 inset-0 bg-black/50" />
          <div className="fixed inset-0 px-6">
            <Dialog.Panel className="relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full max-w-[420px] bg-white rounded shadow-md z-50 overflow-hidden">
              <div className="flex-none flex items-center p-4">
                <Dialog.Title className="flex-1 text-xl font-black">
                  댓글 보기
                </Dialog.Title>

                <button onClick={handleClose}>
                  <XIcon size={24} className="text-slate-700" />
                </button>
              </div>

              <ul className="flex-1 flex flex-col overflow-y-auto">
                {comments.length === 0 && (
                  <li className="p-4">
                    <span>첫 댓글을 남겨주세요 :)</span>
                  </li>
                )}
                {comments.map(comment => (
                  <li key={comment.id} className="flex items-start p-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-sm whitespace-pre-line text-slate-700">
                        {comment.content}
                      </span>

                      <span className="text-sm text-slate-500">
                        {comment.name}
                      </span>
                    </div>
                    {/* <button>
                      <XIcon size={16} className="text-slate-200" />
                    </button> */}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 p-4">
                <button
                  type="button"
                  className="flex items-center text-left"
                  onClick={toggleForm}
                >
                  <h3 className="flex-1 font-bold text-slate-700">
                    댓글 남기기
                  </h3>
                  <ChevronsUpDownIcon size={16} className="text-slate-700" />
                </button>

                {showForm && (
                  <Form {...form}>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={form.handleSubmit(onValidSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder="내용" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="이름"
                                autoComplete="username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="비밀번호"
                                type="password"
                                autoComplete="one-time-code"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">작성</Button>
                    </form>
                  </Form>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default InstaPostCommentsModal;
