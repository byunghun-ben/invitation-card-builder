"use server";

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

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/create", "layout");
  redirect(`/create`);
};

// 영어, 숫자, -, _ 만 입력 가능
const INVITATION_CODE_REGEX = /^[a-zA-Z0-9-_]*$/;

const signupSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  passwordConfirmation: z.string().min(1, "비밀번호를 다시 입력하세요."),
  invitationCode: z.string().min(1, "청첩장 주소로 사용할 코드를 입력하세요."),
});

export const signUp = async (formData: FormData) => {
  console.log("signup function called");

  const parsedSignupDto = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("password-confirmation"),
    invitationCode: formData.get("invitation-code"),
  });

  if (!parsedSignupDto.success) {
    console.error(parsedSignupDto.error);
    return;
  }

  const { email, password, invitationCode } = parsedSignupDto.data;

  // 비밀번호 확인
  if (
    parsedSignupDto.data.password !== parsedSignupDto.data.passwordConfirmation
  ) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // 이메일 중복 확인
  const { error: emailError, count: emailCount } = await supabase.rpc(
    "get_email_from_auth_users",
    { user_email: email },
    { count: "exact" },
  );

  if (emailError) {
    throw new Error("이메일 중복 확인 중 오류가 발생했습니다.");
  }

  if (typeof emailCount === "number" && emailCount > 0) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  // 청첩장 주소 중복 확인
  const { error: codeError, count: codeCount } = await supabase
    .schema("insta_template")
    .from("template")
    .select("code", { count: "exact" })
    .eq("code", invitationCode);

  if (codeError) {
    throw new Error("청첩장 주소 중복 확인 중 오류가 발생했습니다.");
  }

  if (typeof codeCount === "number" && codeCount > 0) {
    throw new Error("이미 사용 중인 청첩장 주소입니다.");
  }

  // 회원가입
  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        invitationCode,
      },
    },
  });

  if (signupError) {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }

  revalidatePath("/create", "layout");
  redirect(`/create/${invitationCode}`);
};
