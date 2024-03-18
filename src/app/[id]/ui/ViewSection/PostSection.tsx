import PostItem from "@/components/PostItem";
import { InstaPost } from "@/schemas/instaTemplate";

type Props = {
  posts: InstaPost[];
};

const PostSection = ({ posts }: Props) => {
  return (
    <div className="flex-none flex flex-col">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostSection;
