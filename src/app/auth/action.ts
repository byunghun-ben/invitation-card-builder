"use server";

import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginFormDataSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

export const login = async (
  prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  const loginRequestResult = loginFormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!loginRequestResult.success) {
    return {
      message: loginRequestResult.error.errors[0].message,
    };
  }

  const { email, password } = loginRequestResult.data;

  const supabase = createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError?.status === 400) {
    return {
      message: "이메일 또는 비밀번호가 일치하지 않습니다.",
    };
  }

  if (signInError) {
    logger.error(signInError);
    return {
      message: "로그인 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/edit", "layout");
  redirect("/edit");
};

const signupFormDataSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  passwordConfirmation: z.string().min(1, "비밀번호 확인을 입력하세요."),
  invitationCode: z.string().min(1, "청첩장 주소로 사용할 코드를 입력하세요."),
});

export const signUp = async (
  prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  const signupRequest = signupFormDataSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("password-confirmation"),
    invitationCode: formData.get("invitation-code"),
  });

  if (!signupRequest.success) {
    return {
      message: signupRequest.error.errors[0].message,
    };
  }

  const { email, password, passwordConfirmation, invitationCode } =
    signupRequest.data;

  // 비밀번호 확인
  if (password !== passwordConfirmation) {
    return {
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  const supabase = createClient();

  // 이메일 중복 확인
  const { error: emailError, count: emailCount } = await supabase.rpc(
    "get_email_from_auth_users",
    { user_email: email },
    { count: "exact" },
  );

  if (emailError) {
    return {
      message: "이메일 중복 확인 중 오류가 발생했습니다.",
    };
  }

  if (typeof emailCount === "number" && emailCount > 0) {
    return {
      message: "이미 가입된 이메일입니다.",
    };
  }

  // 청첩장 주소 중복 확인
  const { error: codeError, count: codeCount } = await supabase
    .schema("insta_template")
    .from("template")
    .select("code", { count: "exact" })
    .eq("code", invitationCode);

  if (codeError) {
    return {
      message: "청첩장 주소 중복 확인 중 오류가 발생했습니다.",
    };
  }

  if (typeof codeCount === "number" && codeCount > 0) {
    return {
      message: "이미 사용 중인 청첩장 주소입니다.",
    };
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
    return {
      message: "회원가입 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/edit", "layout");
  redirect(`/edit/${invitationCode}`);
};
