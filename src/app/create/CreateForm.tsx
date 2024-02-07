"use client";

import { InstagramTemplateAPI } from "@/api";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

// 영어, 숫자, -, _ 만 입력 가능
const INVITATION_ID_REGEX = /^[a-zA-Z0-9-_]*$/;

type Props = {
  setIsCreate: Dispatch<SetStateAction<boolean>>;
};

const CreateForm = ({ setIsCreate }: Props) => {
  const router = useRouter();

  const [invitationId, setInvitationId] = useState("");
  const [isIdError, setIsIdError] = useState<null | string>(null);

  const [password, setPassword] = useState("");

  const isDisabled = useMemo(() => {
    return invitationId.length === 0 || password.length === 0 || !!isIdError;
  }, [invitationId, password, isIdError]);

  const handleChangeInvitationId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInvitationId(event.target.value);

      const isNotValid = !INVITATION_ID_REGEX.test(event.target.value);
      if (isNotValid) {
        setIsIdError("영어, 숫자, -, _ 만 입력 가능합니다.");
      } else {
        setIsIdError(null);
      }
    },
    [password],
  );

  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
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
    <div className="flex-1 px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">회원가입</h1>
      <form
        className="w-full flex-1 flex flex-col gap-4 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>아이디</p>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                className={`
                flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white placeholder:text-sm
                ${isIdError ? "border-red-500" : ""}
                `}
                placeholder="청첩장 주소로 사용할 아이디를 입력하세요."
                value={invitationId}
                onChange={handleChangeInvitationId}
                autoComplete="one-time-code"
              />
              {isIdError && (
                <span className="text-xxs text-red-500">{isIdError}</span>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-xxs">청첩장 주소:</p>
              <p className="text-xxs">{`https://bora-n-maria.com/${invitationId}`}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>비밀번호</p>
            <input
              type="password"
              className="flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={handleChangePassword}
              autoComplete="one-time-code"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          회원가입
        </button>
      </form>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm">이미 만들던 청첩장이 있나요?</p>
        <button
          type="button"
          className="hover:underline"
          onClick={() => {
            setIsCreate(false);
          }}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
