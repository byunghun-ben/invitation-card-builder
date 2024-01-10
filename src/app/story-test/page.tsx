"use client";
import { useState } from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";

const page = () => {
  const [isOpenStories, setIsOpenStories] = useState(false);
  const stories: (Story | string)[] = [
    {
      url: "http://test.g-it.kr/data/file/test_video/237872521_Y3pdvykb_500.mp4",
      type: "video",
    },
    {
      url: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/123/935adaaf4e926848105d15be6e97985c_res.jpeg",
    },
    {
      url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcsFQjn%2FbtqJWrt4dsW%2FaUszoE6rBAnM1eb7IP96lK%2Fimg.jpg",
    },
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJASiX%2FbtqJ1McF7cJ%2FkxUYPxDGpayAmb4OLeRxI1%2Fimg.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEtvoP%2FbtqJXVnS6vK%2Fp5u6YZWbkGWWWkCkJI0hE1%2Fimg.jpg",
  ];
  return (
    <>
      <button
        className="bg-red-300 m-10"
        onClick={() => {
          setIsOpenStories(!isOpenStories);
        }}
      >
        test story
      </button>
      {isOpenStories && (
        <Stories
          stories={stories as Story[]}
          defaultInterval={2000}
          width={432}
          height={768}
          onAllStoriesEnd={() => {
            setIsOpenStories(false);
          }}
        />
      )}
    </>
  );
};

export default page;
