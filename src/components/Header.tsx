import Link from "next/link";

const Header = () => {
  return (
    <header className="h-14 border-b px-4 flex items-center">
      <Link href="/home" className="text-lg font-bold">
        Bora-n-maria
      </Link>
    </header>
  );
};

export default Header;
