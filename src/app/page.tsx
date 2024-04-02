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
      <NavSection user={user} />
    </div>
  );
};

export default Page;
