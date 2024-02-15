import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

// 영어, 숫자, -, _ 만 입력 가능
const INVITATION_CODE_REGEX = /^[a-zA-Z0-9-_]*$/;

const handleSubmit = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("password-confirmation") as string;
  const invitationCode = formData.get("invitation-code") as string;

  // 아이디 확인
  if (
    email.length === 0 ||
    password.length === 0 ||
    passwordConfirmation.length === 0
  ) {
    alert("아이디, 비밀번호를 입력하세요.");
    return;
  }

  // 비밀번호 확인
  if (password !== passwordConfirmation) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 청첩장 주소 확인
  const isCodeNotValid = !INVITATION_CODE_REGEX.test(invitationCode);

  if (isCodeNotValid) {
    alert("코드는 영어, 숫자, -, _ 만 입력 가능합니다.");
    return;
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        invitationCode,
      },
    },
  });

  if (error) {
    redirect("/auth/signup");
  }
  revalidatePath("/create", "layout");
  redirect(`/create`);
};

const SignupForm = () => {
  return (
    <div className="flex-1 px-4 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-10">회원가입</h1>
      <form className="w-full flex-1 flex flex-col gap-4 mb-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>이메일</p>
            <div className="flex flex-col gap-1">
              <input
                type="email"
                name="email"
                className={`
                flex-1 w-full border px-2 py-1 rounded dark:bg-slate-900 dark:text-white placeholder:text-sm
                `}
                placeholder="이메일을 입력하세요."
                autoComplete="one-time-code"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>비밀번호</p>
            <input
              type="password"
              name="password"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="비밀번호를 입력하세요."
              autoComplete="one-time-code"
            />
            <input
              type="password"
              name="password-confirmation"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="비밀번호를 다시 입력하세요."
              autoComplete="one-time-code"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <p>모바일 청첩장 주소</p>
              <p className="text-xxs">
                https://bora-n-maria.com/ 뒤에 입력한 코드가 붙어서 생성됩니다.
              </p>
            </div>
            <input
              type="text"
              name="invitation-code"
              className="flex-1 w-full border px-2 py-1 rounded"
              placeholder="청첩장 주소로 사용할 코드를 입력하세요."
            />
          </div>
        </div>
        <button
          formAction={handleSubmit}
          className="flex-none border rounded py-2 px-2 text-center hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          회원가입
        </button>
      </form>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm">이미 만들던 청첩장이 있나요?</p>
        <Link href="/auth/login" className="hover:underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
