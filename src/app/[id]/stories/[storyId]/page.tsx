import { GetStorySchema } from "@/app/api/stories/[id]/route";
import { headers } from "next/headers";
import InstaStories from "./InstaStories";

type Props = {
  params: {
    id: string;
    storyId: string;
  };
  searchParams: Record<string, any>;
};

const StoriesPage = async ({ params, searchParams }: Props) => {
  // :id/stories/:storyId
  const invitationId = params.id;
  const storyId = params.storyId;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/stories/${storyId}`;

  const res = await fetch(url);

  if (!res.ok) {
    return <div>Internal server error</div>;
  }

  const body = await res.json();
  const story = GetStorySchema.parse(body);

  return (
    <InstaStories
      images={story.images}
      invitationId={invitationId}
      storyId={storyId}
    />
  );
};

export default StoriesPage;
