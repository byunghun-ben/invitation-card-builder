import { getInvitations } from "@/actions/invitations";
import { format } from "date-fns";
import Link from "next/link";

const MyPage = async () => {
  const invitations = await getInvitations();

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
            const invitationId = invitation.id;
            const invitationLabel = `${invitation.owners[0].name} & ${invitation.owners[1].name} 결혼식`;
            const locationLabel = invitation.location
              ? `${invitation.location.placeName} (${invitation.location.placeDetail})`
              : "아직 예식장 정보는 입력되지 않았어요.";
            const date = new Date(
              `${invitation.eventAt.date} ${invitation.eventAt.time}`,
            );
            const weddingDate = format(date, "yyyy년 MM월 dd일 HH시 mm분");

            return (
              <div
                key={invitationId}
                className="flex flex-col gap-4 p-3 border border-slate-200 rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">{invitationLabel}</h3>
                  <p className="text-sm text-slate-700">{locationLabel}</p>
                  <p className="text-sm text-slate-500">{weddingDate}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href={`/mypage/invitations/${invitationId}/edit`}
                    className="border border-slate-200 rounded p-2 text-sm font-bold text-center hover:bg-slate-50"
                  >
                    수정하기
                  </Link>
                  <Link
                    href={`/invitations/${invitationId}`}
                    className="border border-slate-200 rounded p-2 text-sm font-bold text-center hover:bg-slate-50"
                  >
                    보기
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
