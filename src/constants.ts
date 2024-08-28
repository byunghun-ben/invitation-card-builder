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

export const WIDGET_TYPES = [
  {
    id: 3,
    name: "표지",
    description: "청첩장의 표지로 사용할 수 있는 위젯이에요.",
    type: "INSTA_COVER",
  },
  {
    id: 1,
    name: "게시물",
    description: "사진과 본문으로 구성된 게시물이에요.",
    type: "INSTA_POST",
  },
  {
    id: 2,
    name: "지도",
    description: "위치를 표시하는 지도 위젯이에요.",
    type: "INSTA_MAP",
  },
  {
    id: 4,
    name: "인사말",
    description: "청첩장의 인사말로 사용할 수 있는 위젯이에요.",
    type: "INSTA_GREETING",
  },
  {
    id: 5,
    name: "일정",
    description: "청첩장의 일정으로 사용할 수 있는 위젯이에요.",
    type: "INSTA_SCHEDULE",
  },
  {
    id: 6,
    name: "방명록",
    description: "방명록으로 사용할 수 있는 위젯이에요.",
    type: "INSTA_GUESTBOOK",
  },
  {
    id: 7,
    name: "식순",
    description: "식순으로 사용할 수 있는 위젯이에요.",
    type: "INSTA_SEATING",
  },
] as const;
