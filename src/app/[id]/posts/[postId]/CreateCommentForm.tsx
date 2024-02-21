"use client";

import { useRef } from "react";
import SubmitButton from "./CreateCommentSubmitButton";
import { createComment } from "./actions";

type Props = {
  postId: string;
};

const CreateCommentForm = ({ postId }: Props) => {
  const createCommentWithPostId = createComment.bind(null, postId);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    await createCommentWithPostId(formData);
    formRef.current?.reset();
  };

  return (
    <form
      className="flex flex-col gap-3 px-2"
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
          type="text"
          name="password"
          placeholder="비밀번호"
          className="px-2 py-1 rounded border"
          autoComplete="off"
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default CreateCommentForm;
