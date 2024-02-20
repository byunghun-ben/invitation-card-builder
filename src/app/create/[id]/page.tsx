import { instaTemplateSchema } from "@/schemas/instagram";
import InnerPage from "./InnerPage";

type PageProps = {
  params: {
    id: string;
  };
};

export const revalidate = 1;

const Page = async (props: PageProps) => {
  const templateCode = props.params.id;

  try {
    const res = await fetch(
      `http://localhost:3000/api/insta-templates/${templateCode}`,
    );

    const body = await res.json();
    const data = instaTemplateSchema.parse(body);

    return <InnerPage defaultValue={data} />;
  } catch (error) {
    console.log("error", error);
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
