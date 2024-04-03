import { getSupabaseUser } from "@/app/action";
import Link from "next/link";

const Header = async () => {
  const user = await getSupabaseUser();

  return (
    <header className="h-14 border-b px-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-bold">
        Bora-n-maria
      </Link>
      <div className="items-center gap-2 hidden md:flex">
        {user ? (
          <Link href="/edit" className="text-sm font-medium px-2">
            청첩장 수정하기
          </Link>
        ) : (
          <>
            <Link href="/sample" className="text-sm font-medium px-2">
              샘풀 청첩장 보기
            </Link>
            <Link href="/auth/signup" className="text-sm font-medium px-2">
              회원가입
            </Link>
            <Link href="/auth/login" className="text-sm font-medium px-2">
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
