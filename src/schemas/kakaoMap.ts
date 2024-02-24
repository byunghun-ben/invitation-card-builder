import { z } from "zod";

const LocalSearchKeywordDocument = z.object({
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

const LocalSearchKeywordMeta = z.object({
  is_end: z.boolean(),
  pageable_count: z.number(),
  same_name: z.object({
    keyword: z.string(),
    region: z.array(z.string()),
    selected_region: z.string(),
  }),
  total_count: z.number(),
});

const KakaoMapSchema = {
  LocalSearchKeywordDocument,
  LocalSearchKeywordMeta,
};

export type LocalSearchKeywordDocumentType = z.infer<
  typeof LocalSearchKeywordDocument
>;
export type LocalSearchKeywordMetaType = z.infer<typeof LocalSearchKeywordMeta>;

export default KakaoMapSchema;
