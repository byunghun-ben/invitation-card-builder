import { InstaTemplate } from "@/schemas/instagram";

export const DummyInstaTemplate: InstaTemplate = {
  _id: "dummy-id",
  id: "dummy-id",
  password: "dummy-password",
  hasPaid: false,
  metadata: {
    brideName: "김민효",
    groomName: "김병훈",
    title: "우리 결혼식",
  },
  stories: [
    {
      id: "story-1",
      title: "우리 결혼식",
      images: [
        {
          url: "https://picsum.photos/id/300/600",
          id: "image-1",
        },
        {
          url: "https://picsum.photos/id/301/600",
          id: "image-2",
        },
      ],
    },
  ],
  posts: [
    {
      id: "post-1",
      title: "우리 결혼식",
      content: "우리 결혼식에 오세요",
      images: [
        {
          url: "https://picsum.photos/id/200/600",
          id: "image-1",
        },
        {
          url: "https://picsum.photos/id/201/600",
          id: "image-2",
        },
      ],
      likes: 0,
      replies: [],
    },
  ],
  weddingHall: {
    name: "행복한 결혼식",
    address: "서울시 강남구",
    images: [
      {
        url: "https://picsum.photos/id/100/600",
        id: "image-1",
      },
      {
        url: "https://picsum.photos/id/101/600",
        id: "image-2",
      },
    ],
    content: "행복한 결혼식을 위한 공간입니다.",
  },
};
