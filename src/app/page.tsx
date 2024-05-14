import Header from "@/components/Header";
import SampleView from "@/components/LandingPage/SampleView";
import ScrollView from "@/components/LandingPage/ScrollView";
import { getSupabaseUser } from "./actions";

// const BANNER_IMAGES = [
//   "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_11.webp",
//   "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_2.webp",
//   "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images/banner_3.webp",
// ];

const Page = async () => {
  const user = await getSupabaseUser();

  return (
    <div className="flex flex-col">
      <Header />

      {/* <HomeBannerList>
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
      </HomeBannerList> */}

      <div className="flex items-stretch min-h-screen">
        <section className="sticky top-0 flex-1 flex flex-col pt-40">
          <ScrollView user={user} />
        </section>
        <section
          aria-label="샘플 청첩장을 띄움"
          className="hidden relative basis-[420px] flex-shrink-0 lg:flex flex-col"
        >
          <SampleView />
        </section>
      </div>
    </div>
  );
};

export default Page;
