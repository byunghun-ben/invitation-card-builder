import Header from "@/components/Header";
import Image from "next/image";
import { getSupabaseUser } from "./action";
import HomeBannerList from "./ui/HomeBannerList";
import NavSection from "./ui/NavSection";

const BANNER_IMAGES = [
  "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_1.webp",
  "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_2.webp",
  "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_3.webp",
];

const Page = async () => {
  const user = await getSupabaseUser();

  return (
    <div className="flex flex-col">
      <Header />

      <HomeBannerList>
        {BANNER_IMAGES.map((url, index) => (
          <li key={url} className="relative flex-none h-full w-full snap-start">
            <Image
              src={url}
              className="w-full h-full object-cover"
              alt="banner"
              fill
              draggable={false}
              priority={index === 0}
            />
          </li>
        ))}
      </HomeBannerList>

      <section className="flex flex-col items-center gap-40 py-20 px-10">
        <article className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-10">
            우리의 이야기를 담은 청첩장
          </h1>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-xl text-slate-500 text-center">
              그동안의 청첩장은 결혼식 안내를 위한 단순한 정보 뿐이었어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              청첩장은 우리의 이야기를 담은 특별한 청첩장이 되어야 한다고
              생각했어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              우리의 이야기를 알아갈 수록 우리의 결혼식에 참석하는 분들에게
            </p>
            <p className="text-xl text-slate-500 text-center">
              진심어린 축하와 사랑을 받을 수 있을 거라고 생각했어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              어떻게 하면 우리의 이야기를 담은 청첩장을 만들 수 있을까요?
            </p>
          </div>
        </article>

        <article className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-10">
            우리의 이야기를 담은 공간
          </h1>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-xl text-slate-500 text-center">
              많은 사람들이 자신의 이야기를 공유하는 공간이 어디인지
              생각해봤어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              사람들에게 익숙한 공간은 어디인지 생각해봤어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              그동안 자신의 이야기를 공유하고, 익숙하게 여겼던 공간이 우리의
              이야기를 담기에 가장 적합한 공간이 아닐까요?
            </p>
          </div>
        </article>

        <article className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-10">
            우리의 이야기가 담긴 인스타그램
          </h1>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-xl text-slate-500 text-center">
              우리의 이야기를 담은 청첩장은 인스타그램과 같은 공간이
              가장적합하다고 생각했어요.
            </p>
            <p className="text-xl text-slate-500 text-center">
              인스타그램은 사람들이 자신의 이야기를 공유하는 공간이기
              때문이에요.
            </p>

            <p className="text-xl text-slate-500 text-center">
              우리만의 인스타그램 안에서 우리의 이야기를 담은 청첩장을
              만들어보세요.
            </p>
            <NavSection user={user} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default Page;
