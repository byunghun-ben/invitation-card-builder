import InnerPage from "./InnerPage";
import { getInstaTemplateByCode } from "./api";

type PageProps = {
  params: {
    templateCode: string;
  };
};

// export const revalidate = 1;

const Page = async (props: PageProps) => {
  const templateCode = props.params.templateCode;
  const instaTemplate = await getInstaTemplateByCode(templateCode);

  return <InnerPage template={instaTemplate} />;
};

export default Page;
