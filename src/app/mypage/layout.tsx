import NavigationHeader from "@/components/NavigationHeader";
import { ReactNode } from "react";
import { getSupabaseUser } from "../actions";
import { redirect } from "next/navigation";

const MyPageLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getSupabaseUser();

  if (!user) {
    const REDIRECT_URL = "/auth/login?next=/mypage";
    redirect(REDIRECT_URL);
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <NavigationHeader />

      {children}
    </div>
  );
};

export default MyPageLayout;
