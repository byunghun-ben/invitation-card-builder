import { getInvitation } from "@/actions/invitations";
import Link from "next/link";
import InstaMapItem from "./_components/InstaMapItem";
import InstaPostItem from "./_components/InstaPostItem";
import InstaCoverItem from "./_components/InstaCoverItem";

type PageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
};

const Page = async ({ params: { id } }: PageProps) => {
  const invitation = await getInvitation(id);

  return (
    <div className="flex-1 max-w-lg flex flex-col gap-4 py-6 overflow-y-auto">
      {/* Header */}
      <header className="flex-none h-10 px-3 flex items-center">
        <Link href={`/mypage/invitations/${id}/preview`}>
          <span className="font-bold">내 청첩장 미리보기</span>
        </Link>
      </header>
      {/* Header */}

      {/* Widget */}
      <section className="flex-1 flex flex-col gap-10 px-3">
        {invitation.widgets.map(widget => {
          if (widget.type === "INSTA_POST") {
            return <InstaPostItem key={widget.id} widget={widget} />;
          } else if (widget.type === "INSTA_MAP") {
            return <InstaMapItem key={widget.id} widget={widget} />;
          } else if (widget.type === "INSTA_COVER") {
            return <InstaCoverItem key={widget.id} widget={widget} />;
          }
        })}
      </section>
      {/* Widget */}

      {/* Footer */}
      <footer className="flex-none px-3">
        <Link
          href={`/mypage/invitations/${id}/edit`}
          className="w-full flex-center p-3 bg-slate-500 rounded-lg"
        >
          <span className="font-bold text-white">청첩장 수정하기</span>
        </Link>
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Page;
