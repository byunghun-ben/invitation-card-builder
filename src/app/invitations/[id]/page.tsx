import { getInvitation } from "@/actions/invitations";
import InstaCoverItem from "@/app/_components/invitations/InstaCoverItem";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

const InvitationPage = async ({ params: { id } }: PageProps) => {
  const invitation = await getInvitation(id);
  console.log(invitation);

  if (!invitation) {
    notFound();
  }

  return (
    <div className="flex-1 flex-col overflow-y-auto">
      {invitation.widgets.map(widget => {
        switch (widget.type) {
          case "INSTA_COVER": {
            return <InstaCoverItem key={widget.id} widget={widget} />;
          }

          default: {
            return null;
          }
        }
      })}
    </div>
  );
};

export default InvitationPage;
