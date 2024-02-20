import { InstaTemplate } from "@/schemas/instagram";
import Link from "next/link";

type Props = {
  instaTemplate: InstaTemplate;
};

const InstaHeader = ({ instaTemplate }: Props) => {
  const { id } = instaTemplate;

  return (
    <div className="flex-none h-10 px-3 flex items-center">
      <Link href={`/${id}`}>
        <span className="font-bold">{instaTemplate.metadata.title}</span>
      </Link>
    </div>
  );
};

export default InstaHeader;
