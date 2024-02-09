import { InstaTemplateSchema } from "@/schemas/instagram";
import InnerPage from "./InnerPage";
import { redirect } from "next/navigation";
import { z } from "zod";

const NEXT_SERVER_URL = process.env.NEXT_SERVER_URL || "http://localhost:3000";

type PageProps = {
  params: {
    id: string;
  };
};

export const revalidate = 1;

const instaTemplateResponseSchema = z.object({
  message: z.string(),
  instaTemplate: InstaTemplateSchema,
});

const getInstaTemplateById = async (id: string) => {
  const res = await fetch(`${NEXT_SERVER_URL}/api/instagram-templates/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch insta template");
  }

  try {
    const data = await res.json();
    const parsedData = instaTemplateResponseSchema.parse(data);

    return parsedData.instaTemplate;
  } catch (error) {
    throw new Error("Failed to parse insta template");
  }
};

const Page = async (props: PageProps) => {
  const id = props.params.id;

  try {
    const data = await getInstaTemplateById(id);

    return <InnerPage defaultValue={data} />;
  } catch (error) {
    console.log("error", error);
    redirect("/home");
  }
};

export default Page;
