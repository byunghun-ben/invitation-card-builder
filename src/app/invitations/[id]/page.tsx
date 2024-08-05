import { getInvitation } from "@/actions/invitations/invitations";
import InstaCoverItem from "@/app/_components/invitations/InstaCoverItem";
import InstaGreetingItem from "@/app/_components/invitations/InstaGreetingItem";
import InstaMapItem from "@/app/_components/invitations/InstaMapItem";
import InstaPostItem from "@/app/_components/invitations/InstaPostItem";
import { InvitationContextProvider } from "@/app/_contexts/InvitationContext";
import { getMetadataFromInvitation } from "@/utils/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const invitation = await getInvitation(params.id);

  if (!invitation) {
    return {};
  }

  return getMetadataFromInvitation(invitation);
}

type PageProps = {
  params: {
    id: string;
  };
};

const InvitationPage = async ({ params: { id } }: PageProps) => {
  const invitation = await getInvitation(id);

  if (!invitation) {
    notFound();
  }

  return (
    <InvitationContextProvider invitation={invitation}>
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col p-4">
        <div className="flex-1 flex flex-col gap-4">
          {invitation.widgets.map(widget => {
            switch (widget.type) {
              case "INSTA_COVER": {
                return <InstaCoverItem key={widget.id} widget={widget} />;
              }

              case "INSTA_GREETING": {
                return <InstaGreetingItem key={widget.id} widget={widget} />;
              }

              case "INSTA_POST": {
                return <InstaPostItem key={widget.id} widget={widget} />;
              }

              case "INSTA_MAP": {
                return <InstaMapItem key={widget.id} widget={widget} />;
              }

              default: {
                return null;
              }
            }
          })}
        </div>
      </div>
    </InvitationContextProvider>
  );
};

export default InvitationPage;
