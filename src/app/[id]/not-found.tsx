"use client";

import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <h1>청첩장을 찾을 수 없어요</h1>
      <p>입력하신 주소가 정확한지 다시 확인해주세요.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFoundPage;
