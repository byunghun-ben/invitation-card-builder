import Header from "@/components/Header";
import Link from "next/link";
import SignupForm from "./SignupForm";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="w-full max-w-sm mx-auto py-20">
        <div className="flex-1 px-4 py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold mb-10">회원가입</h1>
          <SignupForm />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-sm">이미 만들던 청첩장이 있나요?</p>
            <Link href="/auth/login" className="hover:underline">
              로그인하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
