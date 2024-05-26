import { ROLE, ROLES } from "@/constants";

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
