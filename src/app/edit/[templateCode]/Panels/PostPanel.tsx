import { Dispatch, SetStateAction, useCallback } from "react";
import { uid } from "radash";
import { InstaImage, InstaPost } from "@/schemas/instaTemplate";
import PostForm from "./PostForm";

type Props = {
  templateId: string;
  posts: InstaPost[];
  setPosts: Dispatch<SetStateAction<InstaPost[]>>;
};

const PostPanel = ({ templateId, posts, setPosts }: Props) => {
  const addPost = useCallback(() => {
    setPosts(prev => [
      ...prev,
      {
        id: uid(10, "post-id"),
        title: "",
        content: "",
        images: [],
        comments: [],
        likes: 0,
        templateId,
        displayOrder: Math.max(...prev.map(post => post.displayOrder), 0) + 1,
      },
    ]);
  }, [templateId, setPosts]);

  const onRemovePost = useCallback(
    (postId: string) => {
      setPosts(prev => prev.filter(post => post.id !== postId));
    },
    [setPosts],
  );

  const onChangePostTitle = useCallback(
    (id: string, title: string) => {
      setPosts(prev =>
        prev.map(post =>
          post.id === id
            ? {
                ...post,
                title,
              }
            : post,
        ),
      );
    },
    [setPosts],
  );

  const onChangePostContent = useCallback(
    (id: string, content: string) => {
      setPosts(prev =>
        prev.map(post =>
          post.id === id
            ? {
                ...post,
                content,
              }
            : post,
        ),
      );
    },
    [setPosts],
  );

  const onChangePostImage = useCallback(
    (id: string, images: InstaImage[]) => {
      setPosts(prev =>
        prev.map(post =>
          post.id === id
            ? {
                ...post,
                images,
              }
            : post,
        ),
      );
    },
    [setPosts],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">게시물</h2>

      {posts.length === 0 && (
        <>
          {/* Empty */}
          <div className="flex flex-col items-center py-6 border">
            <span className="text-slate-500">아직 게시물이 없어요.</span>
            <span className="text-slate-500">
              둘만의 이야기가 담긴 게시물을 추가해보세요!
            </span>
          </div>
          {/* Empty */}
        </>
      )}

      {posts.map((post, index) => (
        <PostForm
          key={post.id}
          post={post}
          index={index}
          onRemove={onRemovePost}
          onChangeTitle={onChangePostTitle}
          onChangeContent={onChangePostContent}
          onChangeImages={onChangePostImage}
        />
      ))}

      <button
        type="button"
        className="flex border border-slate-500 py-3 rounded justify-center"
        onClick={addPost}
      >
        게시물 추가하기
      </button>
    </div>
  );
};

export default PostPanel;
