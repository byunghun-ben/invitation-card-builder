import { InvitationType } from "@/types/invitation";
import { format } from "date-fns";
import { Metadata } from "next";

export const checkIfError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getURL = () => {
  let url =
    process.env?.NEXT_PUBLIC_SITE_URL ??
    process.env?.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    "http://localhost:3000";

  url = url.startsWith("http") ? url : `https://${url}`;

  // 끝에 슬래시가 있으면 제거합니다.
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  return url;
};

export const convertEventAtToDate = (eventAt: {
  date: string;
  time: string;
}) => {
  const date = new Date(`${eventAt.date} ${eventAt.time}`);
  return date;
};

export const getMetadataFromInvitation = (
  invitation: InvitationType,
): Metadata => {
  const title = `${invitation.owners[0].name}, ${invitation.owners[1].name} 결혼합니다`;

  const eventAt = convertEventAtToDate(invitation.eventAt);
  const eventAtString = format(eventAt, "yy.MM.dd HH:mm");
  const descriptionArray = [eventAtString];

  if (invitation.location) {
    descriptionArray.push(
      `${invitation.location.placeName}(${invitation.location.placeDetail})`,
    );
  }

  const description = descriptionArray.join(" ");

  let ogImageUrl = "";

  invitation.widgets.forEach(widget => {
    if (widget.type === "INSTA_COVER") {
      ogImageUrl = widget.url;
    }
  });

  return {
    title,
    description,
    robots: "noindex, nofollow",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${getURL()}/invitations/${invitation.id}`,
      images: {
        url: ogImageUrl,
      },
    },
  };
};
