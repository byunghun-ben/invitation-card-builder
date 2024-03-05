import { instaTemplateSchema } from "@/schemas/instagram";
import InnerPage from "./InnerPage";
import { headers } from "next/headers";

type PageProps = {
  params: {
    id: string;
  };
};

export const revalidate = 1;

const Page = async (props: PageProps) => {
  const templateCode = props.params.id;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  try {
    const res = await fetch(url);

    const body = await res.json();
    const data = instaTemplateSchema.parse(body);

    return <InnerPage defaultValue={data} />;
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
