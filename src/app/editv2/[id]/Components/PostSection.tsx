import PostItem from "@/components/PostItem";
import { InstaPost } from "@/schemas/instaTemplate";

type Props = {
  posts: InstaPost[];
};

const PostSection = ({ posts }: Props) => {
  return (
    <section className="grid grid-cols-3 gap-4">
      {posts.map(post => (
        <PostItem
          key={post.id}
          templateCode={post.templateId}
          postId={post.id}
        />
      ))}
    </section>
  );
};

export default PostSection;
