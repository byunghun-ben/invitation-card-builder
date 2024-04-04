import PostItem from "@/components/PostItem";
import { InstaPost } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";

type Props = {
  posts: InstaPost[];
};

const PostSection = async ({ posts }: Props) => {
  logger.log(
    "PostSection",
    posts.map(post => post.images.map(image => image.displayOrder)),
  );

  return (
    <div className="flex-none flex flex-col">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostSection;
