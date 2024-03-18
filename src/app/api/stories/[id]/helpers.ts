import { InstaStory } from "@/schemas/instaTemplate";
import { GetStoryResponse } from "./schema";

export const transformInstaStory = (
  getStoryResponse: GetStoryResponse,
): InstaStory => {
  const images = getStoryResponse.images.map(image => ({
    id: image.id,
    url: image.url,
    displayOrder: image.display_order,
  }));

  return {
    id: getStoryResponse.id,
    templateId: getStoryResponse.template_id,
    title: getStoryResponse.title,
    displayOrder: getStoryResponse.display_order,
    images,
  };
};
