import Link from "next/link";

const Header = () => {
  return (
    <header className="h-14 border-b px-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-bold">
        Bora-n-maria
      </Link>
      <div className="items-center gap-2 hidden md:flex">
        <Link href="/sample" className="text-sm font-medium px-2">
          샘풀 청첩장 보기
        </Link>
        <Link href="/auth/signup" className="text-sm font-medium px-2">
          청첩장 만들기
        </Link>
      </div>
    </header>
  );
};

export default Header;
