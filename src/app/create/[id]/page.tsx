import { InstaTemplateSchema } from "@/schemas/instagram";
import InnerPage from "./InnerPage";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

const API_URL = process.env.API_URL || "";

export const revalidate = 1;

const getInstaTemplateById = async (id: string) => {
  const res = await fetch(`${API_URL}/instagram-templates/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch insta template");
  }

  try {
    const data = await res.json();

    const parsedData = InstaTemplateSchema.parse(data);

    return parsedData;
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
    redirect("/create");
  }
};

export default Page;
