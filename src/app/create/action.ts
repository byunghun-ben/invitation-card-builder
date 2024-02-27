"use server";

import { instaImageSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
};

const updateStoryDto = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    images: z.array(instaImageSchema),
  }),
);
type UpdateStoryDto = z.infer<typeof updateStoryDto>;
export const updateStory = async ({
  templateId,
  dto,
}: {
  templateId: string;
  dto: UpdateStoryDto;
}) => {
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
  const storiesToInsert = dto.filter(
    story => !existingStoryIds.includes(story.id),
  );

  if (storiesToInsert.length > 0) {
    await Promise.all(
      storiesToInsert.map(async story => {
        const newStory = await supabase
          .schema("insta_template")
          .from("stories")
          .insert({
            title: story.title,
            template_id: templateId,
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

        await Promise.all(
          story.images.map(async (image, index) => {
            return supabase
              .schema("insta_template")
              .from("images")
              .update({ display_order: index })
              .eq("id", image.id)
              .then(({ data, error }) => {
                if (error) {
                  throw new Error(error.message);
                }

                return data;
              });
          }),
        );
      }),
    );
  }

  // Update existing stories
  const storiesToUpdate = dto.filter(story =>
    existingStoryIds.includes(story.id),
  );

  if (storiesToUpdate.length > 0) {
    await Promise.all(
      storiesToUpdate.map(async story => {
        await supabase
          .schema("insta_template")
          .from("stories")
          .update({ title: story.title })
          .eq("id", story.id)
          .then(({ error }) => {
            if (error) {
              throw new Error(error.message);
            }
          });

        const existingImageIds = await supabase
          .schema("insta_template")
          .from("story_image_link")
          .select("image_id")
          .eq("story_id", story.id)
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

        const imagesToInsert = story.images.filter(image => {
          return !existingImageIds.includes(image.id);
        });

        if (imagesToInsert.length > 0) {
          await supabase
            .schema("insta_template")
            .from("story_image_link")
            .insert(
              imagesToInsert.map(image => ({
                story_id: story.id,
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
          return !story.images.some(image => image.id === id);
        });

        if (imageIdsToRemove.length > 0) {
          await supabase
            .schema("insta_template")
            .from("story_image_link")
            .delete()
            .eq("story_id", story.id)
            .in("image_id", imageIdsToRemove)
            .then(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
            });
        }

        await Promise.all(
          story.images.map(async (image, index) => {
            return supabase
              .schema("insta_template")
              .from("images")
              .update({ display_order: index })
              .eq("id", image.id)
              .select(`*`)
              .then(({ data, error }) => {
                if (error) {
                  throw new Error(error.message);
                }

                return data;
              });
          }),
        );
      }),
    );
  }

  // Remove stories
  const storyIdsToRemove = existingStoryIds.filter(id => {
    return !dto.some(story => story.id === id);
  });

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

const updateMetadataDto = z.object({
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
});
type UpdateMetadataDto = z.infer<typeof updateMetadataDto>;

export const updateMetadata = async ({
  templateId,
  dto,
}: {
  templateId: string;
  dto: UpdateMetadataDto;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .update(dto)
    .eq("template_id", templateId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTag("metadata");
};

const updateWeddingHallDto = z.object({
  name: z.string(),
  address: z.string(),
  content: z.string(),
});

type UpdateWeddingHallDto = z.infer<typeof updateWeddingHallDto>;

export const updateWeddingHall = async ({
  templateId,
  dto,
}: {
  templateId: string;
  dto: UpdateWeddingHallDto;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .schema("insta_template")
    .from("wedding_hall")
    .update(dto)
    .eq("template_id", templateId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTag("wedding_hall");
};

export const updateWeddingHallImages = async (
  weddingHallId: string,
  imageIds: string[],
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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

  const imagesToAdd = imageIds.filter(id => !existingImageIds.includes(id));
  const imagesToRemove = existingImageIds.filter(id => !imageIds.includes(id));

  if (imagesToRemove.length > 0) {
    await supabase
      .schema("insta_template")
      .from("wedding_hall_image_link")
      .delete()
      .eq("wedding_hall_id", weddingHallId)
      .in("image_id", imagesToRemove)
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
          console.error(error);
        }
      });
  }

  await Promise.all(
    imageIds.map(async (imageId, index) => {
      return supabase
        .schema("insta_template")
        .from("images")
        .update({ display_order: index })
        .eq("id", imageId)
        .then(({ error }) => {
          if (error) {
            console.error(error);
          }
        });
    }),
  );

  revalidateTag("wedding_hall");
};
