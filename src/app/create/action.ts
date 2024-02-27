"use server";

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
    imageIds.map((imageId, index) => {
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
