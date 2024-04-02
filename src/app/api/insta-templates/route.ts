import { NextResponse } from "next/server";
import { z } from "zod";
import { getInstaTemplates } from "./action";

const templateResponseSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  code: z.string(),
});

type TemplateResponse = z.infer<typeof templateResponseSchema>;

const templateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  code: z.string(),
});

type Template = z.infer<typeof templateSchema>;

const transformTemplates = (templates: TemplateResponse[]): Template[] => {
  return templates.map(template => ({
    id: template.id,
    userId: template.user_id,
    code: template.code,
  }));
};

export const GET = async () => {
  try {
    const templatesResponse = await getInstaTemplates();

    const transformedTemplates = transformTemplates(templatesResponse);

    return NextResponse.json(transformedTemplates);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
