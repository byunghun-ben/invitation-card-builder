import { getSupabaseUser } from "@/app/actions";
import Link from "next/link";
import SignoutButton from "./Header/SignoutButton";
import { Button } from "./ui/button";

const NavigationHeader = async () => {
  const user = await getSupabaseUser();
  const isLogged = user ? true : false;

  return (
    <header
      className="flex-none h-12 border-b px-4 flex items-center justify-between bg-white"
      key={`isLogged-${isLogged}`}
    >
      <Link href="/" className="text-lg font-bold">
        Bora-n-maria
      </Link>
      <div className="items-center gap-2">
        {isLogged ? (
          <div className="flex items-center gap-2 lg:gap-4">
            <Button asChild variant="ghost" className="px-2">
              <Link href="/edit" className="relative flex items-center">
                <span className="text-sm font-bold">청첩장 수정하기</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className="px-2">
              <Link href="/mypage" className="relative flex items-center">
                <span className="text-sm font-bold">마이페이지</span>
              </Link>
            </Button>
            <SignoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 lg:gap-4">
            <Button asChild variant="ghost" className="px-2">
              <Link href="/sample" className="relative flex items-center">
                <span className="text-sm font-bold">샘플보기</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="px-2">
              <Link href="/auth/login" className="relative flex items-center">
                <span className="text-sm font-bold">로그인</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;
