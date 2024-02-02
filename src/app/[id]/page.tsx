import ViewSection from "./ViewSection/ViewSection";

export const revalidate = 1;

type Props = {
  params: {
    id: string;
  };
};

const API_URL = process.env.API_URL || "";

const Page = async (props: Props) => {
  console.log("props", props);
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

    return (
      <div className="container mx-auto">
        <div className="flex">
          <div className="md:block hidden min-h-screen h-full flex-none w-80 bg-white mr-auto"></div>
          <ViewSection />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Failed to parse insta template</h1>
      </div>
    );
  }
};

export default Page;
