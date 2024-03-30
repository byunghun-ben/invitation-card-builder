import { User } from "@supabase/supabase-js";
import Link from "next/link";

type Props = {
  user: User | null;
};

const NavSection = ({ user }: Props) => {
  return (
    <section className="py-20">
      <div className="flex flex-col gap-4 items-center">
        {user ? (
          <Link
            href="/edit"
            className="border border-slate-700 rounded-full py-2 px-4"
          >
            청첩장 수정하기
          </Link>
        ) : (
          <>
            <Link
              href="/sample"
              className="border border-slate-700 rounded-full py-2 px-4"
            >
              샘플 청첩장 보기
            </Link>
            <Link
              href="/auth/signup"
              className="border border-slate-700 rounded-full py-2 px-4"
            >
              회원가입
            </Link>
            <Link
              href="/auth/login"
              className="border border-slate-700 rounded-full py-2 px-4"
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default NavSection;
