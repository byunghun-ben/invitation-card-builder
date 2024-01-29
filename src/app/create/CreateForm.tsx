"use client";

import { InstagramTemplateAPI } from "@/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

// 영어, 숫자, -, _ 만 입력 가능
const INVITATION_ID_REGEX = /^[a-zA-Z0-9-_]*$/;

const CreateForm = () => {
  const router = useRouter();

  const [invitationId, setInvitationId] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeInvitationId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isNotValid = !INVITATION_ID_REGEX.test(event.target.value);
      if (isNotValid) {
        alert("영어, 숫자, -, _ 만 입력 가능합니다.");
        return;
      }

      setInvitationId(event.target.value);

      const isDisabled =
        event.target.value.length === 0 || password.length === 0;
      setIsDisabled(isDisabled);
    },
    [password],
  );

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);

      const isDisabled =
        event.target.value.length === 0 || invitationId.length === 0;
      setIsDisabled(isDisabled);
    },
    [invitationId],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await InstagramTemplateAPI.create({
          id: invitationId,
          password,
        });

        router.push(`/create/${invitationId}`);
      } catch (error) {
        console.error("error", error);
        alert("청첩장을 만들지 못했습니다.");
        // TODO: 에러 처리
        // 1. 이미 존재하는 청첩장 주소
        // 2. 서버 에러
      }
    },
    [invitationId, password, router],
  );

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">처음 청첩장을 만든다면?</h1>
      <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <span className="flex-none">https://bora-n-maria.com/</span>
              <input
                type="text"
                className="flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white"
                placeholder="주소를 입력하세요"
                value={invitationId}
                onChange={handleChangeInvitationId}
                autoComplete="one-time-code"
              />
            </div>
            <div className="flex flex-col w-full text-xs">
              <p>청첩장을 보기 위해 접근하는 주소입니다.</p>
              <p>(결제 전에는 확인할 수 없어요.)</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div>
              <input
                type="password"
                className="border px-2 py-1 rounded w-full dark:bg-slate-900 dark:text-white"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={handleChangePassword}
                autoComplete="one-time-code"
              />
            </div>
            <div className="flex flex-col w-full text-xs">
              <span>청첩장을 수정할 때, 사용할 비밀번호를 입력하세요.</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex-none border rounded py-1 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          만들기
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
