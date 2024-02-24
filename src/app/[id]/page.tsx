import { InstaTemplateSchema } from "@/schemas/instagram";
import ViewSection from "./ViewSection/ViewSection";
import { z } from "zod";

export const revalidate = 1;

const NEXT_SERVER_URL = process.env.NEXT_SERVER_URL || "";

const instaTemplateResponseSchema = z.object({
  message: z.string(),
  instaTemplate: InstaTemplateSchema,
});

const getInstagramTemplate = async (id: string) => {
  try {
    const res = await fetch(`${NEXT_SERVER_URL}/api/instagram-templates/${id}`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    const parsedData = instaTemplateResponseSchema.safeParse(data);

    if (!parsedData.success) {
      console.error(parsedData.error);
      return null;
    }

    return parsedData.data.instaTemplate;
  } catch (error) {
    return null;
  }
};

type Props = {
  params: {
    id: string;
  };
};

const Page = async (props: Props) => {
  const id = props.params.id;

  const instaTemplate = await getInstagramTemplate(id);

  if (!instaTemplate) {
    return (
      <div>
        <h1>Failed to fetch insta template</h1>
      </div>
    );
  }

  return <ViewSection instaTemplate={instaTemplate} />;
};

export default Page;
