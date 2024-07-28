import clientPromise from "@/lib/mongodb";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const invitationSchema = z.object({
  id: z.number(),
  weddingId: z.number(),
  invitationTypeId: z.number(),
  wedding: z.object({
    weddingDate: z.string(),
    weddingTime: z.string(),
    couples: z.object({
      firstPersonName: z.string(),
      secondPersonName: z.string(),
    }),
    venues: z.object({
      venueName: z.string(),
      hallName: z.string(),
    }),
  }),
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
      invitationTypeId:invitation_type_id,
      wedding:weddings (
        weddingDate:wedding_date,
        weddingTime:wedding_time,
        couples (
          firstPersonName:first_person_name,
          secondPersonName:second_person_name
        ),
        venues (
          venueName:venue_name,
          hallName:hall_name
        )
      )
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

const getInvitationsByMongoDB = async () => {
  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations.find().toArray();
  return result;
};

const MyPage = async () => {
  const invitations = await getInvitations();
  const invitationsByMongoDB = await getInvitationsByMongoDB();
  console.log("invitationsByMongoDB", invitationsByMongoDB);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invitations.map(invitation => {
            const invitationLabel = `${invitation.wedding.couples.firstPersonName} & ${invitation.wedding.couples.secondPersonName} 결혼식`;
            const locationLabel = `${invitation.wedding.venues.venueName} (${invitation.wedding.venues.hallName})`;
            const weddingDate = `${invitation.wedding.weddingDate} ${invitation.wedding.weddingTime}`;

            return (
              <Link
                key={invitation.id}
                className="flex flex-col gap-1 p-3 border border-slate-200 rounded-lg"
                href={`/mypage/invitations/${invitation.id}/edit`}
              >
                <h3 className="text-lg font-bold">{invitationLabel}</h3>
                <p className="text-sm">{locationLabel}</p>
                <p className="text-sm">{weddingDate}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
