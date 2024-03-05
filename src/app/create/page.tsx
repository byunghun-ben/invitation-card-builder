import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { first } from "radash";

const CreatePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    redirect("/auth/login");
  }

  const { error: templatesError, data: templates } = await supabase
    .schema("insta_template")
    .from("template")
    .select("*")
    .eq("user_id", user.id);

  if (templatesError || !templates || !templates.length) {
    console.error(templatesError);
    redirect("/");
  }

  const template = first(templates);

  revalidatePath(`/create`, "layout");
  redirect(`/create/${template.code}`);
};

export default CreatePage;
