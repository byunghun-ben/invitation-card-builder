"use client";

import { FormEvent, useCallback } from "react";

const CreateCommentForm = () => {
  const handleReplySubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const content = formData.get("content") as string;

    console.log({ name, content });
  }, []);

  return (
    <form className="flex flex-col gap-3 px-2" onSubmit={handleReplySubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="p-2 rounded border"
          autoComplete="off"
        />
        <input
          type="text"
          name="content"
          placeholder="댓글 달기..."
          className="p-2 rounded border"
          autoComplete="off"
        />
      </div>
      <button type="submit" className="border py-2 rounded">
        <span className="text-sm font-bold">게시</span>
      </button>
    </form>
  );
};

export default CreateCommentForm;
