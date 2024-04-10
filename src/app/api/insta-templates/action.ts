"use server";

import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { dbInstaPostSchema } from "../schema";
import {
  InstaTemplateResponse,
  baseInstaTemplateResponseSchema,
  instaTemplateResponseSchema,
} from "./schema";
import {
  UpdateMetadataDto,
  UpdatePostsDto,
  UpdateStoriesDto,
  UpdateWeddingHallDto,
} from "./schemas/update";

const updateDisplayOrder = <T extends { displayOrder: number }[]>(
  data: T,
): T => {
  return data.map((item, index) => ({
    ...item,
    displayOrder: index,
  })) as T;
};

export const updateStories = async (
  templateId: string,
  updateData: UpdateStoriesDto,
) => {
  const reorderedUpdateData = updateDisplayOrder(updateData);

  const supabase = createClient();

  const existingStoryIds = await supabase
    .schema("insta_template")
    .from("stories")
    .select("id")
    .eq("template_id", templateId)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }

      const parsedData = z.array(z.object({ id: z.string() })).safeParse(data);
      return parsedData.success ? parsedData.data.map(({ id }) => id) : [];
    });

  // Insert new stories
  const storiesToInsert = reorderedUpdateData.filter(
    story => !existingStoryIds.includes(story.id),
  );

  // Update existing stories
  const storiesToUpdate = reorderedUpdateData.filter(story =>
    existingStoryIds.includes(story.id),
  );

  // Remove stories
  const storyIdsToRemove = existingStoryIds.filter(id => {
    return !reorderedUpdateData.some(story => story.id === id);
  });

  if (storiesToInsert.length > 0) {
    await Promise.all(
      storiesToInsert.map(async story => {
        const newStory = await supabase
          .schema("insta_template")
          .from("stories")
          .insert({
            title: story.title,
            template_id: templateId,
            display_order: story.displayOrder,
          })
          .select(`*`)
          .single()
          .then(({ data, error }) => {
            logger.error(error);
            if (error) {
              throw new Error(error.message);
            }

            // TODO: validate data
            return data;
          });

        await supabase
          .schema("insta_template")
          .from("story_image_link")
          .insert(
            story.images.map(image => ({
              story_id: newStory.id,
              image_id: image.id,
            })),
          )
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });

        await supabase
          .schema("insta_template")
          .from("images")
          .upsert(
            story.images.map(({ id, url }, index) => ({
              id,
              url,
              display_order: index,
            })),
          )
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });
      }),
    );
  }

  if (storiesToUpdate.length > 0) {
    await Promise.all(
      storiesToUpdate.map(async ({ id, title, displayOrder, images }) => {
        await supabase
          .schema("insta_template")
          .from("stories")
          .update({ title, display_order: displayOrder })
          .eq("id", id)
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });

        const existingImageIds = await supabase
          .schema("insta_template")
          .from("story_image_link")
          .select("image_id")
          .eq("story_id", id)
          .then(({ data, error }) => {
            if (error) {
              return [];
            }

            const parsedData = z
              .array(z.object({ image_id: z.string() }))
              .safeParse(data);
            return parsedData.success
              ? parsedData.data.map(({ image_id }) => image_id)
              : [];
          });

        const imagesToInsert = images.filter(
          image => !existingImageIds.includes(image.id),
        );

        if (imagesToInsert.length > 0) {
          await supabase
            .schema("insta_template")
            .from("story_image_link")
            .insert(
              imagesToInsert.map(image => ({
                story_id: id,
                image_id: image.id,
              })),
            )
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });
        }

        const imageIdsToRemove = existingImageIds.filter(_id => {
          return !images.some(image => image.id === _id);
        });

        if (imageIdsToRemove.length > 0) {
          await supabase
            .schema("insta_template")
            .from("story_image_link")
            .delete()
            .eq("story_id", id)
            .in("image_id", imageIdsToRemove)
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });
        }

        await supabase
          .schema("insta_template")
          .from("images")
          .upsert(
            images.map((image, index) => ({
              id: image.id,
              url: image.url,
              display_order: index,
            })),
          )
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });
      }),
    );
  }

  if (storyIdsToRemove.length > 0) {
    await supabase
      .schema("insta_template")
      .from("stories")
      .delete()
      .eq("template_id", templateId)
      .in("id", storyIdsToRemove)
      .then(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
      });
  }
};

export const updatePosts = async (
  templateId: string,
  updateData: UpdatePostsDto,
) => {
  const reorderedUpdateData = updateDisplayOrder(updateData);

  const supabase = createClient();

  // 1. 기존에 있는 posts를 가져온다.
  const existingPostIds = await supabase
    .schema("insta_template")
    .from("posts")
    .select("*")
    .eq("template_id", templateId)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }

      const parsedData = z.array(z.object({ id: z.string() })).safeParse(data);
      return parsedData.success ? parsedData.data.map(({ id }) => id) : [];
    });

  // 2. 새로운 posts / 수정할 posts / 삭제할 posts를 구분한다.
  const postsToInsert = reorderedUpdateData.filter(
    post => !existingPostIds.includes(post.id),
  );
  const postsToUpdate = reorderedUpdateData.filter(post =>
    existingPostIds.includes(post.id),
  );
  const postIdsToRemove = existingPostIds.filter(
    id => !reorderedUpdateData.some(post => post.id === id),
  );

  // 3. 새로운 posts를 추가한다.
  if (postsToInsert.length > 0) {
    await Promise.all(
      postsToInsert.map(async ({ title, content, displayOrder, images }) => {
        const newPost = await supabase
          .schema("insta_template")
          .from("posts")
          .insert({
            template_id: templateId,
            title,
            content,
            display_order: displayOrder,
          })
          .select(`*`)
          .single()
          .then(({ data, error }) => {
            if (error) {
              throw new Error(error.message);
            }

            return dbInstaPostSchema.parse(data);
          });

        await supabase
          .schema("insta_template")
          .from("post_image_link")
          .insert(
            images.map(image => ({
              post_id: newPost.id,
              image_id: image.id,
            })),
          )
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });

        await supabase
          .schema("insta_template")
          .from("images")
          .upsert(
            images.map(({ id, url }, index) => ({
              id,
              url,
              display_order: index,
            })),
          )
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });
      }),
    );
  }

  // 4. 수정할 posts를 수정한다.
  if (postsToUpdate.length > 0) {
    await Promise.all(
      postsToUpdate.map(
        async ({ id, content, displayOrder, title, images }) => {
          await supabase
            .schema("insta_template")
            .from("posts")
            .update({
              title,
              content,
              display_order: displayOrder,
            })
            .eq("id", id)
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });

          const existingImageIds = await supabase
            .schema("insta_template")
            .from("post_image_link")
            .select("*")
            .eq("post_id", id)
            .then(({ data, error }) => {
              if (error) {
                return [];
              }

              const parsedData = z
                .array(z.object({ image_id: z.string() }))
                .safeParse(data);
              return parsedData.success
                ? parsedData.data.map(({ image_id }) => image_id)
                : [];
            });

          const imagesToInsert = images.filter(image => {
            return !existingImageIds.includes(image.id);
          });
          const imageIdsToRemove = existingImageIds.filter(_id => {
            return !images.some(image => image.id === _id);
          });

          await supabase
            .schema("insta_template")
            .from("post_image_link")
            .insert(
              imagesToInsert.map(image => ({
                post_id: id,
                image_id: image.id,
              })),
            )
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });

          await supabase
            .schema("insta_template")
            .from("post_image_link")
            .delete()
            .eq("post_id", id)
            .in("image_id", imageIdsToRemove)
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });

          await supabase
            .schema("insta_template")
            .from("images")
            .upsert(
              images.map((image, index) => ({
                id: image.id,
                url: image.url,
                display_order: index,
              })),
            )
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });
        },
      ),
    );
  }

  // 5. 삭제할 posts를 삭제한다.
  if (postIdsToRemove.length > 0) {
    await supabase
      .schema("insta_template")
      .from("posts")
      .delete()
      .eq("template_id", templateId)
      .in("id", postIdsToRemove)
      .then(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
      });
  }
};

export const updateMetadata = async (
  templateId: string,
  updateData: UpdateMetadataDto,
) => {
  const supabase = createClient();

  const { error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .update({
      title: updateData.title,
      description: updateData.description,
      groom_name: updateData.groomName,
      bride_name: updateData.brideName,
    })
    .eq("template_id", templateId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTag("metadata");
};

export const updateWeddingHall = async (
  templateId: string,
  updateData: UpdateWeddingHallDto,
) => {
  const weddingHallId = templateId;
  const { images, ...weddingHallDataWithoutImages } = updateData;

  const supabase = createClient();

  await supabase
    .schema("insta_template")
    .from("wedding_hall")
    .update({
      name: weddingHallDataWithoutImages.name,
      address: weddingHallDataWithoutImages.address,
      road_address: weddingHallDataWithoutImages.roadAddress,
      url: weddingHallDataWithoutImages.url,
      lat: weddingHallDataWithoutImages.lat,
      lng: weddingHallDataWithoutImages.lng,
      content: weddingHallDataWithoutImages.content,
    })
    .eq("template_id", weddingHallId)
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
    });

  const existingImageIds = await supabase
    .schema("insta_template")
    .from("wedding_hall_image_link")
    .select("image_id")
    .eq("wedding_hall_id", weddingHallId)
    .then(({ data, error }) => {
      if (error) {
        // TODO: Handle error
        return [];
      }

      const parsedData = z
        .array(z.object({ image_id: z.string() }))
        .safeParse(data);

      if (!parsedData.success) {
        // TODO: Handle error
        return [];
      }

      return parsedData.data.map(({ image_id }) => image_id);
    });

  const imagesToAdd = updateData.images.filter(
    ({ id }) => !existingImageIds.includes(id),
  );
  const imageIdsToRemove = existingImageIds.filter(
    id => !updateData.images.some(image => image.id === id),
  );

  if (imageIdsToRemove.length > 0) {
    await supabase
      .schema("insta_template")
      .from("wedding_hall_image_link")
      .delete()
      .eq("wedding_hall_id", weddingHallId)
      .in("image_id", imageIdsToRemove)
      .then(({ error }) => {
        if (error) {
          logger.error(error);
        }
      });
  }

  if (imagesToAdd.length > 0) {
    const newImages = imagesToAdd.map(image => ({
      wedding_hall_id: weddingHallId,
      image_id: image.id,
    }));

    await supabase
      .schema("insta_template")
      .from("wedding_hall_image_link")
      .insert(newImages)
      .then(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
      });
  }

  await supabase
    .schema("insta_template")
    .from("images")
    .upsert(
      images.map(({ id, url }, index) => ({
        id,
        url,
        display_order: index,
      })),
    )
    .then(({ error }) => {
      if (error) {
        logger.error(error);
      }
    });

  revalidateTag("wedding_hall");
};

export const getInstaTemplate = async (
  templateCode: string,
): Promise<InstaTemplateResponse> => {
  const supabase = createClient();

  const { error, data: responseData } = await supabase
    .schema("insta_template")
    .from("template")
    .select(
      `
        *,
        metadata (*),
        posts (
          *,
          images (*),
          comments (*)
        ),
        stories (
          *,
          images (*)
        ),
        wedding_hall (
          *,
          images (*)
        )
      `,
    )
    .eq("code", templateCode)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!responseData) {
    throw new Error("Not found");
  }

  const validationResult = instaTemplateResponseSchema.parse(responseData);

  return validationResult;
};

export const getInstaTemplates = async () => {
  const supabase = createClient();

  const { error: templatesError, data: templatesResponseData } = await supabase
    .schema("insta_template")
    .from("template")
    .select("*");

  const templatesResponse = baseInstaTemplateResponseSchema
    .array()
    .parse(templatesResponseData);

  return templatesResponse;
};
