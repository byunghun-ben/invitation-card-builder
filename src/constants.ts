export const ROLE = {
  GROOM: "groom",
  BRIDE: "bride",
} as const;

export const ROLES = {
  groomBride: "groom-bride",
  brideBride: "bride-bride",
  groomGroom: "groom-groom",
} as const;

export const ROLE_LABELS = {
  [ROLE.GROOM]: "신랑",
  [ROLE.BRIDE]: "신부",
} as const;
