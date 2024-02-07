"use client";

import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type Props = {
  setIsCreate: Dispatch<SetStateAction<boolean>>;
};

const EditForm = ({ setIsCreate }: Props) => {
  const router = useRouter();

  const [invitationId, setInvitationId] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeInvitationId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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
        const response = await fetch("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            id: invitationId,
            password,
          }),
        });

        const body = await response.json();

        if (response.status !== 200) {
          alert(body.message);
          return;
        }

        console.log("success", body);
        router.push(`/create/${invitationId}`);
      } catch (error) {
        console.log("error", error);
      }
    },
    [invitationId, password, router],
  );

  return (
    <div className="flex-1 px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">로그인</h1>
      <form
        className="w-full flex-1 flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>아이디</p>
            <input
              type="text"
              className="flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white"
              placeholder="주소를 입력하세요"
              value={invitationId}
              onChange={handleChangeInvitationId}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>비밀번호</p>
            <input
              className="border px-2 py-1 rounded w-full dark:bg-slate-900 dark:text-white"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={handleChangePassword}
              type="password"
              autoComplete="one-time-code"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          로그인
        </button>
      </form>

      <div className="flex flex-col gap-1 items-center">
        {/* <p className="text-sm">이미 만들던 청첩장이 있나요?</p> */}
        <button
          type="button"
          className="hover:underline"
          onClick={() => {
            setIsCreate(true);
          }}
        >
          <span className="text-sm">회원가입</span>
        </button>
      </div>
    </div>
  );
};

export default EditForm;
