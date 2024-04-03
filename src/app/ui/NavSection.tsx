"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  user: User | null;
};

const NavSection = ({ user }: Props) => {
  return (
    <section className="py-20">
      <div className="flex flex-col gap-4 items-center">
        {user ? (
          <>
            <Link
              href="/edit"
              className="border border-slate-700 rounded-full py-2 px-4"
            >
              청첩장 수정하기
            </Link>

            <button
              type="button"
              className="border border-slate-700 rounded-full py-2 px-4"
              onClick={() => {
                const supabase = createClient();

                supabase.auth.signOut();

                revalidatePath("/");
                redirect("/");
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href="/sample"
              className="w-40 text-center border border-slate-700 rounded-full py-2 px-4"
            >
              샘플 청첩장 보기
            </Link>
            <Link
              href="/auth/signup"
              className="w-40 text-center border border-slate-700 rounded-full py-2 px-4"
            >
              내 청첩장 만들기
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default NavSection;
