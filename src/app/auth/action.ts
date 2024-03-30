"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = async (formData: FormData) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const url = `${protocol}://${host}/api/auth/login`;

  const loginRequestResult = loginFormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!loginRequestResult.success) {
    throw new Error("이메일과 비밀번호를 입력하세요.");
  }

  const { email, password } = loginRequestResult.data;

  const supabase = createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw new Error("로그인 중 오류가 발생했습니다.");
  }

  revalidatePath("/edit", "layout");
  redirect("/edit");
};

const signupFormDataSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  passwordConfirmation: z.string().min(1, "비밀번호를 다시 입력하세요."),
  invitationCode: z.string().min(1, "청첩장 주소로 사용할 코드를 입력하세요."),
});

export const signUp = async (formData: FormData) => {
  const signupRequest = signupFormDataSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("password-confirmation"),
    invitationCode: formData.get("invitation-code"),
  });

  const { email, password, passwordConfirmation, invitationCode } =
    signupRequest;

  // 비밀번호 확인
  if (password !== passwordConfirmation) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const supabase = createClient();

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

  revalidatePath("/edit", "layout");
  redirect(`/edit/${invitationCode}`);
};
