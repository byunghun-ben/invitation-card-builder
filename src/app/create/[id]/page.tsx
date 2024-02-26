import { instaTemplateSchema } from "@/schemas/instagram";
import InnerPage from "./InnerPage";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

// export const revalidate = 1;

const Page = async (props: PageProps) => {
  const templateCode = props.params.id;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  try {
    const res = await fetch(url, {
      next: {
        tags: ["metadata", "posts", "stories", "wedding_hall"],
      },
    });

    const body = await res.json();
    const template = instaTemplateSchema.parse(body);

    console.log("data revalidate");

    return <InnerPage template={template} />;
  } catch (error) {
    return (
      <div>
        <h1>InstaTemplate</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
    // redirect("/");
  }
};

export default Page;
