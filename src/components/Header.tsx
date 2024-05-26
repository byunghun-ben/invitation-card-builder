import { getSupabaseUser } from "@/app/actions";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Header = async () => {
  const user = await getSupabaseUser();
  const isLogged = user ? true : false;

  return (
    <header className="h-12 border-b px-4 flex items-center justify-between bg-white">
      <Link href="/" className="text-lg font-bold">
        Bora-n-maria
      </Link>
      <div className="items-center gap-2">
        {isLogged ? (
          <Link href="/edit" className="text-sm font-medium px-2">
            청첩장 수정하기
          </Link>
        ) : (
          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/sample" className="relative flex items-center">
              <span className="text-sm font-bold">샘플보기</span>
            </Link>
            <Link href="/auth/login" className="relative flex items-center">
              <span className="text-sm font-bold">로그인</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
