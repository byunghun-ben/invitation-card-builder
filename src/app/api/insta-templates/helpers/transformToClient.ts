/* eslint-disable @typescript-eslint/naming-convention */
import {
  InstaComment,
  InstaImage,
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaTemplate,
  InstaWeddingHall,
} from "@/schemas/instaTemplate";
import {
  InstaCommentResponse,
  InstaImageResponse,
  InstaMetadataResponse,
  InstaPostResponse,
  InstaStoryResponse,
  InstaTemplateResponse,
  InstaWeddingHallResponse,
} from "../schema";

export const transformMetadata = (
  responseData: InstaMetadataResponse,
): InstaMetadata => {
  const {
    template_id: templateId,
    title,
    description,
    groom_name: groomName,
    bride_name: brideName,
    created_at: createdAt,
  } = responseData;

  return {
    templateId,
    title,
    description,
    groomName,
    brideName,
    createdAt,
  };
};

const transformImage = (responseData: InstaImageResponse): InstaImage => {
  const { id, url, display_order } = responseData;

  return {
    id,
    url,
    displayOrder: display_order,
  };
};

const transformComment = (responseData: InstaCommentResponse): InstaComment => {
  const { id, name, content, created_at } = responseData;

  return {
    id,
    name,
    content,
    createdAt: created_at,
  };
};

const transformPost = (responseData: InstaPostResponse): InstaPost => {
  const {
    id,
    template_id,
    title,
    content,
    images,
    likes,
    comments,
    display_order,
  } = responseData;

  images.sort((a, b) => a.display_order - b.display_order);
  comments.sort((a, b) => a.created_at.localeCompare(b.created_at));

  return {
    id,
    templateId: template_id,
    title,
    content,
    images: images.map(transformImage),
    likes,
    comments: comments.map(transformComment),
    displayOrder: display_order,
  };
};

const transformStory = (responseData: InstaStoryResponse): InstaStory => {
  const { id, template_id, title, images, display_order } = responseData;

  images.sort((a, b) => a.display_order - b.display_order);

  return {
    id,
    templateId: template_id,
    title,
    images: images.map(transformImage),
    displayOrder: display_order,
  };
};

const transformWeddingHall = (
  responseData: InstaWeddingHallResponse,
): InstaWeddingHall => {
  const { template_id, name, address, content, images } = responseData;

  images.sort((a, b) => a.display_order - b.display_order);

  return {
    templateId: template_id,
    name,
    address,
    content,
    images: images.map(transformImage),
  };
};

// instaTemplateResponse to instaTemplate
export const transformTemplate = (
  responseData: InstaTemplateResponse,
): InstaTemplate => {
  const { metadata, posts, stories, wedding_hall, ...rest } = responseData;

  posts.sort((a, b) => a.display_order - b.display_order);
  stories.sort((a, b) => a.display_order - b.display_order);

  const instaTemplate: InstaTemplate = {
    id: rest.id,
    userId: rest.user_id,
    code: rest.code,
    metadata: transformMetadata(metadata),
    posts: posts.map(transformPost),
    stories: stories.map(transformStory),
    weddingHall: transformWeddingHall(wedding_hall),
  };

  return instaTemplate;
};
