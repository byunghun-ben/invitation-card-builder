import Link from "next/link";

type Props = {
  templateCode: string;
  metaTitle: string;
};

const InstaHeader = ({ templateCode, metaTitle }: Props) => {
  return (
    <div className="flex-none h-10 px-3 flex items-center">
      <Link href={`/${templateCode}`}>
        <span className="font-bold">{metaTitle}</span>
      </Link>
    </div>
  );
};

export default InstaHeader;
