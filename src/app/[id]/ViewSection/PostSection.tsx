import PostItem from "@/components/PostItem";
import { InstaPost } from "@/schemas/instagram";
import { uid } from "radash";

const posts: InstaPost[] = [
  {
    id: uid(10, "post-id"),
    title: "포스트 제목",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/111/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/123/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/234/600",
      },
    ],
    content: "포스트 내용",
    likes: 12,
    replies: [],
  },
  {
    id: uid(10, "post-id"),
    title: "포스트 제목",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/222/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/223/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/224/600",
      },
    ],
    content: "포스트 내용",
    likes: 12,
    replies: [],
  },
  {
    id: uid(10, "post-id"),
    title: "포스트 제목",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/337/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/334/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/335/600",
      },
    ],
    content: "포스트 내용",
    likes: 12,
    replies: [],
  },
  {
    id: uid(10, "post-id"),
    title: "포스트 제목",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/444/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/445/600",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/446/600",
      },
    ],
    content: "포스트 내용",
    likes: 12,
    replies: [
      { name: "김병훈", content: "결혼 축하해요!!" },
      { name: "손정현", content: "행복하세요!!" },
      { name: "엄퐁재", content: "축하드려요!!" },
    ],
  },
];

const PostSection = () => {
  return (
    <div className="flex-none flex flex-col">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostSection;
