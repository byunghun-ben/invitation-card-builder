"use client";

import { useRef } from "react";
import { z } from "zod";
import SubmitButton from "./CreateCommentSubmitButton";
import { createComment } from "./actions";

type Props = {
  postId: string;
};

// 생성 폼에 대한 zod schema
const createCommentSchema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  password: z.string().min(1),
});

const CreateCommentForm = ({ postId }: Props) => {
  const createCommentWithPostId = createComment.bind(null, postId);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const content = formData.get("content") as string;
    const password = formData.get("password") as string;

    const parsedData = createCommentSchema.safeParse({
      name,
      content,
      password,
    });

    if (!parsedData.success) {
      alert("입력값을 확인해주세요.");
      return;
    }

    await createCommentWithPostId(formData);
    formRef.current?.reset();
  };

  return (
    <form
      className="flex flex-col gap-2 px-2"
      action={handleAction}
      ref={formRef}
    >
      <p className="font-bold">댓글 작성하기</p>
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
  );
};

export default CreateCommentForm;
