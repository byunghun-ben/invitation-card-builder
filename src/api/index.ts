import { z } from "zod";

const createTemplateDto = z.object({
  id: z.string(),
  password: z.string(),
});

export type CreateTemplateDto = z.infer<typeof createTemplateDto>;

const create = async (props: CreateTemplateDto) => {
  const data = createTemplateDto.parse(props);

  const response = await fetch(`/api/instagram-templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("청첩장을 생성할 수 없습니다.");
  }

  return response.ok;
};

// find one
export const instagramTemplateSchema = z.object({
  _id: z.string(),
  hasPaid: z.boolean(),
  id: z.string(),
  password: z.string(),
});

const getById = async (id: string) => {
  const response = await fetch(`/api/instagram-templates`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("response", response);

  const body = await response.json();

  console.log("body", body);

  const parsedBody = instagramTemplateSchema.parse(body);

  return parsedBody;
};

export const InstagramTemplateAPI = {
  create,
  getById,
};
