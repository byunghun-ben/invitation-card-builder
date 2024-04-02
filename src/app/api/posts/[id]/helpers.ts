import { InstaPost } from "@/schemas/instaTemplate";
import { GetPostResponse } from "./schema";

export const transformInstaPost = (
  postResponse: GetPostResponse,
): InstaPost => {
  const images = postResponse.images.map(image => ({
    id: image.id,
    url: image.url,
    displayOrder: image.display_order,
  }));

  const comments = postResponse.comments.map(comment => ({
    id: comment.id,
    name: comment.name,
    content: comment.content,
    createdAt: comment.created_at,
  }));

  return {
    id: postResponse.id,
    templateId: postResponse.template_id,
    title: postResponse.title,
    content: postResponse.content,
    likes: postResponse.likes,
    displayOrder: postResponse.display_order,
    images,
    comments,
  };
};
