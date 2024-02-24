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

const signupSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
  passwordConfirmation: z.string().min(1, "비밀번호를 다시 입력하세요."),
  invitationCode: z.string().min(1, "청첩장 주소로 사용할 코드를 입력하세요."),
});

export const signUp = async (formData: FormData) => {
  "use server";
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
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) {
    console.group("========> error");
    console.error(signupError);
    console.groupEnd();
    return;
  }

  const { data: newTemplate, error: templateError } = await supabase
    .schema("insta_template")
    .from("template")
    .insert({
      user_id: signupData?.user?.id,
      code: invitationCode,
    });

  if (templateError) {
    console.group("========> error");
    console.error(templateError);
    console.groupEnd();
    return;
  }

  console.log(newTemplate);
  // redirect("/invitations");

  // if (error) {
  //   console.log(error);
  //   redirect("/auth/signup");
  // }
  // revalidatePath("/create", "layout");
  // redirect(`/create`);
};
