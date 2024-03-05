"use server";

import { instaPostSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  UpdateMetadata,
  UpdatePosts,
  UpdateStories,
  UpdateWeddingHall,
  instaTemplateResponseSchema,
} from "./schema";

const updateDisplayOrder = <T extends { display_order: number }[]>(
  data: T,
): T => {
  return data.map((item, index) => ({
    ...item,
    display_order: index,
  })) as T;
};

export const updateStories = async (
  templateId: string,
  updateData: UpdateStories,
) => {
  const reorderedUpdateData = updateDisplayOrder(updateData);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
            display_order: story.display_order,
          })
          .select(`*`)
          .single()
          .then(({ data, error }) => {
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
      storiesToUpdate.map(async ({ id, title, display_order, images }) => {
        await supabase
          .schema("insta_template")
          .from("stories")
          .update({ title, display_order })
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

        const imageIdsToRemove = existingImageIds.filter(id => {
          return !images.some(image => image.id === id);
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
  updateData: UpdatePosts,
) => {
  const reorderedUpdateData = updateDisplayOrder(updateData);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
      postsToInsert.map(async ({ title, content, display_order, images }) => {
        const newPost = await supabase
          .schema("insta_template")
          .from("posts")
          .insert({
            template_id: templateId,
            title,
            content,
            display_order,
          })
          .select(`*`)
          .single()
          .then(({ data, error }) => {
            if (error) {
              throw new Error(error.message);
            }
            return instaPostSchema
              .omit({ images: true, comments: true })
              .parse(data);
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
        async ({ id, content, display_order, title, images }) => {
          await supabase
            .schema("insta_template")
            .from("posts")
            .update({
              title,
              content,
              display_order,
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
          const imageIdsToRemove = existingImageIds.filter(id => {
            return !images.some(image => image.id === id);
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
  updateData: UpdateMetadata,
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .update(updateData)
    .eq("template_id", templateId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTag("metadata");
};

export const updateWeddingHall = async (
  templateId: string,
  updateData: UpdateWeddingHall,
) => {
  const weddingHallId = templateId;
  const { images, name, address, content } = updateData;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase
    .schema("insta_template")
    .from("wedding_hall")
    .update({ name, address, content })
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
          console.error(error);
        }
      });
  }

  if (imagesToAdd.length > 0) {
    const newImages = imagesToAdd.map(imageId => ({
      wedding_hall_id: weddingHallId,
      image_id: imageId,
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
        console.error(error);
      }
    });

  revalidateTag("wedding_hall");
};

export const getInstaTemplate = async (templateCode: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const validationResult = instaTemplateResponseSchema.safeParse(responseData);

  if (!validationResult.success) {
    throw new Error(JSON.stringify(validationResult.error));
  }

  validationResult.data.posts.sort((a, b) => a.display_order - b.display_order);
  validationResult.data.posts.forEach(post => {
    post.images.sort((a, b) => a.display_order - b.display_order);
  });

  validationResult.data.stories.sort(
    (a, b) => a.display_order - b.display_order,
  );
  validationResult.data.stories.forEach(story => {
    story.images.sort((a, b) => a.display_order - b.display_order);
  });

  validationResult.data.wedding_hall.images.sort(
    (a, b) => a.display_order - b.display_order,
  );

  return validationResult.data;
};
