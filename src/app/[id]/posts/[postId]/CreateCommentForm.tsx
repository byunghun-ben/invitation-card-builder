"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "./CreateCommentSubmitButton";
import { createComment } from "./actions";

type Props = {
  postId: string;
};

// 생성 폼에 대한 zod schema
const createCommentSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  content: z.string().min(1, "댓글 내용을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

const CreateCommentForm = ({ postId }: Props) => {
  const createCommentWithPostId = createComment.bind(null, postId);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name");
    const content = formData.get("content");
    const password = formData.get("password");

    const parsedData = createCommentSchema.safeParse({
      name,
      content,
      password,
    });

    if (!parsedData.success) {
      toast.error(parsedData.error.errors[0].message, {
        position: "bottom-right",
      });
      return;
    }

    try {
      await createCommentWithPostId(formData);
      formRef.current?.reset();
      toast.success("댓글 작성 완료!", { position: "bottom-right" });
    } catch (error) {
      toast.error("댓글 작성에 실패했습니다.", { position: "bottom-right" });
    }
  };

  return (
    <Disclosure as="div" className="flex flex-col gap-2">
      <Disclosure.Button className="flex items-center justify-between px-2 py-1">
        {({ open }) => (
          <>
            <span className="font-bold">댓글 작성하기</span>
            <ChevronUpDownIcon className="w-5 h-5 text-slate-700" />
          </>
        )}
      </Disclosure.Button>
      <Disclosure.Panel>
        <form
          className="flex flex-col gap-2 px-2"
          action={handleAction}
          ref={formRef}
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="이름"
              className="px-2 py-1 rounded border"
              autoComplete="off"
            />
            <textarea
              name="content"
              placeholder="댓글을 입력해주세요."
              className="px-2 py-1 rounded border"
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className="px-2 py-1 rounded border"
              autoComplete="one-time-code"
            />
          </div>
          <SubmitButton />
        </form>
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default CreateCommentForm;
