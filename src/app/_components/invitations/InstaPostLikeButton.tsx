"use client";

import { postWidgetLike } from "@/actions/invitations/likes";
import { useClientIdContext } from "@/app/_contexts/ClientIdContext";
import { useInvitationContext } from "@/app/_contexts/InvitationContext";
import { LikeType } from "@/types/invitation";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

type Props = {
  widgetId: string;
  widgetLike: LikeType | null;
};

const InstaPostLikeButton = ({ widgetId, widgetLike }: Props) => {
  const { clientId } = useClientIdContext();
  const { invitation } = useInvitationContext();
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = useCallback(async () => {
    await postWidgetLike(invitation.id, widgetId, clientId);
    setIsLiked(true);
  }, [invitation.id, widgetId, clientId]);

  useEffect(() => {
    if (!widgetLike) {
      return;
    }

    const isLiked = widgetLike.likes.some(like => like.userId === clientId);

    setIsLiked(isLiked);

    return () => {
      setIsLiked(false);
    };
  }, [clientId, widgetLike]);

  return (
    <button
      type="button"
      className="p-2 group"
      onClick={handleClickLike}
      aria-label="좋아요 버튼"
    >
      <HeartIcon
        className={`${
          isLiked ? "fill-red-400 stroke-red-400" : ""
        } w-6 h-6 transition group-active:scale-90 group-active:rotate-12`}
      />
    </button>
  );
};

export default InstaPostLikeButton;
