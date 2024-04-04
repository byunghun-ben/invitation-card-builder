"use client";

import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <h1>아이고 에러가 발생했어요</h1>
      <p>에러 내용: {error.message}</p>
      <Link href="/">돌아가기</Link>
      <button type="button" onClick={reset}>
        다시 시도하기
      </button>
    </div>
  );
};

export default ErrorPage;
