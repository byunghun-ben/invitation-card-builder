"use client";

import logger from "@/utils/logger";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  logger.error(error);
  return (
    <div>
      <h1>청첩장을 불러오던 중에 문제가 발생했어요</h1>
      <button type="button" onClick={reset}>
        다시 시도하기
      </button>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
