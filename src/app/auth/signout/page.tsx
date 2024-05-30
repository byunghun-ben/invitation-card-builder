import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = createClient();

  // 로그아웃 처리
  await supabase.auth.signOut();

  // 로그아웃 후 메인 페이지로 리다이렉트
  revalidatePath("/", "layout");
  redirect("/");
};

export default Page;
