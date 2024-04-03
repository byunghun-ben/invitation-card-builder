import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { first } from "radash";
import { getSupabaseUser } from "../action";
import { getTemplateByUserId } from "./action";

const CreatePage = async () => {
  const user = await getSupabaseUser();

  if (!user) {
    revalidatePath("/");
    redirect("/");
  }

  const myTemplates = await getTemplateByUserId(user.id);
  const template = first(myTemplates);

  if (!template) {
    throw new Error("템플릿을 찾을 수 없습니다");
  }

  revalidatePath(`/edit`, "layout");
  redirect(`/edit/${template.code}`);
};

export default CreatePage;
