"use client";

import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignoutButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      className="text-sm font-bold px-2"
      onClick={handleSignout}
    >
      로그아웃
    </Button>
  );
};

export default SignoutButton;
