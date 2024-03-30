/* eslint-disable react/button-has-type */

"use client";

import MenuIcon from "@/foundation/icons/MenuIcon";
import { InstaComment } from "@/schemas/instaTemplate";
import { Dialog, Menu } from "@headlessui/react";
import { useState } from "react";
import { deleteComment } from "./actions";

type Props = {
  comment: InstaComment;
};

const CommentItem = ({ comment }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = async (formData: FormData) => {
    const password = formData.get("password") as string;

    deleteComment(comment.id, password);
    setShowDeleteDialog(false);
  };

  return (
    <li key={comment.id} className="flex items-start py-2">
      <div className="flex-1 flex flex-col gap-1 pl-2">
        <p className="text-sm font-bold">{comment.name}</p>
        <p className="text-sm whitespace-pre-line">{comment.content}</p>
      </div>
      <Menu as="div" className="relative">
        <Menu.Button className="p-2 text-sm rounded active:bg-slate-50">
          <MenuIcon className="w-4 h-4" />
        </Menu.Button>
        <Menu.Items className="absolute z-10 right-2 top-8 flex flex-col rounded border bg-white shadow">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-slate-100" : ""
                } whitespace-pre flex text-sm px-3 py-1`}
                onClick={() => setShowDeleteDialog(true)}
              >
                삭제
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        open={showDeleteDialog}
        onClose={setShowDeleteDialog}
      >
        <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
        <Dialog.Panel className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-64 bg-white rounded shadow-md p-4 z-50">
          <p className="font-bold text-slate-700">댓글을 삭제하시겠습니까?</p>
          <form action={handleDelete} className="flex flex-col gap-2 mt-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                autoComplete="one-time-code"
                className="w-full px-4 py-2 bg-transparent text-sm text-slate-500 border border-slate-200 rounded"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xxs font-bold text-slate-500"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? "숨기기" : "보이기"}
              </button>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 text-sm text-slate-500 border border-slate-200 rounded font-bold"
                onClick={() => setShowDeleteDialog(false)}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-red-500 font-bold border border-red-500 rounded"
              >
                삭제
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </li>
  );
};

export default CommentItem;
