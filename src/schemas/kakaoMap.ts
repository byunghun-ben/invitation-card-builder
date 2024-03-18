import { z } from "zod";

const localSearchKeywordDocument = z.object({
  address_name: z.string(),
  category_group_code: z.string(),
  category_group_name: z.string(),
  category_name: z.string(),
  distance: z.string(),
  id: z.string(),
  phone: z.string(),
  place_name: z.string(),
  place_url: z.string(),
  road_address_name: z.string(),
  x: z.string(),
  y: z.string(),
});

const localSearchKeywordMeta = z.object({
  is_end: z.boolean(),
  pageable_count: z.number(),
  same_name: z.object({
    keyword: z.string(),
    region: z.array(z.string()),
    selected_region: z.string(),
  }),
  total_count: z.number(),
});

const searchLocalByKeywordSchema = z.object({
  message: z.string(),
  documents: localSearchKeywordDocument.array(),
  meta: localSearchKeywordMeta,
});

const KakaoMapSchema = {
  localSearchKeywordDocument,
  localSearchKeywordMeta,
  searchLocalByKeywordSchema,
};

export type LocalSearchKeywordDocumentType = z.infer<
  typeof localSearchKeywordDocument
>;
export type LocalSearchKeywordMetaType = z.infer<typeof localSearchKeywordMeta>;

export default KakaoMapSchema;
