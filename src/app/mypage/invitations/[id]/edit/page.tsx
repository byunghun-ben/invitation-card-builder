import { getInvitation } from "@/actions/invitations/invitations";
import { InvitationContextProvider } from "@/app/_contexts/InvitationContext";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddWidgetModal from "./_components/AddWidgetModal";
import Widget from "./_components/Widget";
import { ExternalLinkIcon, NewspaperIcon } from "lucide-react";

type PageProps = {
  params: {
    id: string;
  };
};

const InvitationEditPage = async ({ params }: PageProps) => {
  const invitationId = params.id;
  const invitation = await getInvitation(invitationId);

  if (!invitation) {
    notFound();
  }

  return (
    <InvitationContextProvider invitation={invitation}>
      <div className="relative flex-1 flex flex-col pb-20 bg-slate-50 overflow-y-auto">
        <section className="flex-1 max-w-lg w-full mx-auto flex flex-col p-4">
          {/* 인스타그램 초대장 레이아웃 */}
          <div className="flex flex-col gap-3">
            {/* InstaHeader */}
            <div className="flex-none h-10 px-3 flex items-center">
              <p className="flex-1 flex font-bold">청첩장 수정하기</p>
              <div className="ml-auto flex items-center">
                <Link
                  className="flex items-start gap-0.5 text-slate-700"
                  href={`/invitations/${invitationId}`}
                  target="_blank"
                >
                  <span className="text-sm font-bold">미리보기</span>
                  <div className="pt-0.5">
                    <ExternalLinkIcon size={12} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Widgets */}
            <div className="flex-none flex flex-col gap-6">
              {invitation.widgets.map((widget, index) => (
                <Widget key={widget.id} widget={widget} index={index} />
              ))}
            </div>
          </div>
        </section>
        <AddWidgetModal />
      </div>
    </InvitationContextProvider>
  );
};

export default InvitationEditPage;
