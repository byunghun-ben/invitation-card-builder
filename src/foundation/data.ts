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
    {
      id: "story-2",
      title: "봄, 여름, 가을, 겨울",
      images: [
        {
          url: "https://picsum.photos/id/400/600",
          id: "image-1",
        },
        {
          url: "https://picsum.photos/id/401/600",
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
      likes: 12,
      replies: [
        { name: "김병훈", content: "결혼 축하해요!!" },
        { name: "손정현", content: "행복하세요!!" },
        { name: "엄퐁재", content: "축하드려요!!" },
      ],
    },
    {
      id: "post-2",
      title: "우리 결혼식",
      content: `⠀
  세상에서 단 하나뿐인 예쁜 청첩장을
  오늘카드에서 담아드립니다.🪽
  ⠀
  합리적인 비용으로 소량 제작 가능합니다.🩷
  ⠀
  포토엽서형 청첩장 50매 70,000원
  + 50매 추가시 17,000원
  ⠀
  오시는길 50매 19,000원
  + 50매 추가시 9,000원
  ⠀
  자세한 상담은 1:1 카카오톡 채널로 문의주세요.🤍
  
  #청첩장 #청첩장제작 #청첩장주문제작 #청첩장디자인 #청첩장사진 #포토청첩장 #맞춤청첩장 #청첩장샘플 #청첩장만들기 #결혼식청첩장 #웨딩청첩장 #청첩장추천 #사진청첩장 #청첩장후기 #청첩장준비`,
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
      likes: 12,
      replies: [
        { name: "김병훈", content: "결혼 축하해요!!" },
        { name: "손정현", content: "행복하세요!!" },
        { name: "엄퐁재", content: "축하드려요!!" },
      ],
    },
    {
      id: "post-3",
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
      likes: 12,
      replies: [
        { name: "김병훈", content: "결혼 축하해요!!" },
        { name: "손정현", content: "행복하세요!!" },
        { name: "엄퐁재", content: "축하드려요!!" },
      ],
    },
  ],
  weddingHall: {
    name: "보타닉파크웨딩",
    address: "서울 강서구 마곡중앙5로 6 보타닉푸르지오시티 L층(로비층)",
    content: `마곡나루역 1번 2번 사이 내부연결통로로 연결되어 있어, 대중교통 이용 시 편하게 방문 가능합니다. 주차는 보타닉 푸르지오 시티에 주차 가능합니다.`,
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
  },
};
