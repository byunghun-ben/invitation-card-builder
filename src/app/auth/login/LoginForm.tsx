"use client";

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
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});
type FormValues = z.infer<typeof formSchema>;
const formResolver = zodResolver(formSchema);

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: formResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    logger.log("values", values);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signInError?.status === 400) {
      form.setError("email", {
        type: "manual",
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    if (signInError) {
      logger.error(signInError);
      form.setError("email", {
        type: "manual",
        message: "로그인 중 오류가 발생했습니다.",
      });
      return;
    }

    router.replace("/edit");
  };

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
                <Input
                  placeholder="이메일을 입력하세요"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
