import { ROLE, ROLES } from "@/constants";
import { z } from "zod";

export const weddingHallSchema = z.object({
  address: z.string(),
  coord: z.array(z.number()),
  mapType: z.union([z.literal("KAKAO"), z.literal("NAVER")]),
  placeDetail: z.string(),
  placeId: z.string(),
  placeName: z.string(),
  roadAddress: z.string(),
});

export const ownerSchema = z.object({
  id: z.string(),
  role: z.union([z.literal(ROLE.GROOM), z.literal(ROLE.BRIDE)]),
  name: z.string().min(1, "이름을 입력해주세요."),
});

export type HallLocation = {
  address: string;
  coord: number[];
  mapType: "KAKAO" | "NAVER";
  placeDetail: string;
  placeId: string;
  placeName: string;
  roadAddress: string;
};

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type Roles = (typeof ROLES)[keyof typeof ROLES];

export type Owner = {
  id: string;
  role: Role;
  name: string;
};
