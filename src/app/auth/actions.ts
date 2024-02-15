import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const login = async (formData: FormData) => {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");

  const result = loginSchema.safeParse({
    email: email as string,
    password: password as string,
  });

  if (!result.success) {
    console.error(result.error);
    return;
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  revalidatePath("/create", "layout");
  redirect(`/create`);
};

// 영어, 숫자, -, _ 만 입력 가능
const INVITATION_CODE_REGEX = /^[a-zA-Z0-9-_]*$/;

export const signUp = async (formData: FormData) => {
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
