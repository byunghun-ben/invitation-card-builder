"use client";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { uid } from "radash";
import { useCallback } from "react";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const signupFormSchema = z
  .object({
    email: z.string().email("이메일 형식으로 입력하세요."),
    password: z.string().min(6, "최소 6자 이상 입력하세요."),
    confirmPassword: z.string(),
    invitationCode: z.string(),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "비밀번호가 일치하지 않습니다.",
    },
  );

const signupFormResolver = zodResolver(signupFormSchema);

type SignupFormValues = z.infer<typeof signupFormSchema>;

const SignupForm = () => {
  const form = useForm<SignupFormValues>({
    resolver: signupFormResolver,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      invitationCode: uid(10, "wedding"),
    },
  });

  const onSubmit = useCallback<SubmitHandler<SignupFormValues>>(
    async values => {
      logger.log("values", values);

      const { email, password, invitationCode } = values;

      const supabase = createClient();
      const { error: emailError, count: emailCount } = await supabase.rpc(
        "get_email_from_auth_users",
        { user_email: email },
        { count: "exact" },
      );

      if (emailError) {
        form.setError("email", {
          type: "manual",
          message: "이메일 중복 확인 중 오류가 발생했습니다.",
        });
        return;
      }

      if (typeof emailCount === "number" && emailCount > 0) {
        form.setError("email", {
          type: "manual",
          message: "이미 사용 중인 이메일입니다.",
        });
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            invitationCode,
          },
        },
      });

      if (signUpError) {
        form.setError("email", {
          type: "manual",
          message: "회원가입 중 오류가 발생했습니다.",
        });
        return;
      }

      // 회원가입 성공
      form.reset();
    },
    [form],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호를 입력하세요."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="비밀번호를 다시 입력하세요."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="">
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
