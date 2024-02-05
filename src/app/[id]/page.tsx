import ViewSection from "./ViewSection/ViewSection";

export const revalidate = 1;

type Props = {
  params: {
    id: string;
  };
};

const API_URL = process.env.API_URL || "";

const Page = async (props: Props) => {
  const res = await fetch(`${API_URL}/instagram-templates/${props.params.id}`);

  if (!res.ok) {
    return (
      <div>
        <h1>Failed to fetch insta template</h1>
      </div>
    );
  }

  try {
    const data = await res.json();

    console.log("data", data);

    return <ViewSection />;
  } catch (error) {
    return (
      <div>
        <h1>Failed to parse insta template</h1>
      </div>
    );
  }
};

export default Page;
