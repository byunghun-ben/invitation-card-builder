"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const EditForm = () => {
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

  const checkInvitationId = useCallback(() => {
    const localStorageData = localStorage.getItem("invitationIds") || "[]";
    const parsedData = JSON.parse(localStorageData) as {
      id: string;
      password: string;
    }[];
    const isExist = parsedData.some(item => {
      return item.id === invitationId && item.password === password;
    });

    return isExist;
  }, [invitationId, password]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const isValid = checkInvitationId();
      if (!isValid) {
        alert("주소와 비밀번호를 다시 확인해주세요.");
        return;
      }

      router.push(`/create/${invitationId}`);
    },
    [checkInvitationId, invitationId, router],
  );

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">만들던 청첩장이 있다면?</h1>
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
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
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
          className="flex-none border rounded py-1 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          만들기
        </button>
      </form>
    </div>
  );
};

export default EditForm;
