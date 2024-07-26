import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const invitationSchema = z.object({
  id: z.number(),
  weddingId: z.number(),
  invitationTypeId: z.number(),
});

const getInvitations = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("사용자 정보를 가져올 수 없습니다.");
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("invitations")
    .select(
      `
      id,
      weddingId:wedding_id,
      invitationTypeId:invitation_type_id
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    return [];
  }

  const safeParseReturn = invitationSchema.array().safeParse(data);

  if (!safeParseReturn.success) {
    return [];
  }

  return safeParseReturn.data;
};

const MyPage = async () => {
  const invitations = await getInvitations();

  console.log(invitations);
  return (
    <div className="flex flex-col">
      <section className="flex flex-col py-10 px-6">
        <div className="flex items-center mb-10">
          <h2 className="flex-1 text-2xl font-black">청첩장 목록</h2>
          <Link
            href={`/mypage/invitations/create`}
            className="flex-center h-8 px-2 bg-slate-50 border border-slate-200 rounded select-none text-sm font-bold tracking-tight hover:bg-slate-100"
          >
            새 청첩장 만들기
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {invitations.map(invitation => (
            <Link
              key={invitation.id}
              className="flex flex-col p-3 bg-red-100"
              href={`/mypage/invitations/${invitation.id}/edit`}
            >
              <h3 className="text-lg font-bold">청첩장 제목</h3>
              <p className="text-sm">청첩장 내용</p>
              <p className="text-sm">최근 수정일: 2021-08-01</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
