"use client";

import { useCallback, useState } from "react";
import { reorderWidgets } from "../_actions/reorderWidgets";
import { useInvitationContext } from "../../../../../_contexts/InvitationContext";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type Props = {
  widgetIndex: number;
};

const WidgetReorderer = ({ widgetIndex }: Props) => {
  const { invitation } = useInvitationContext();

  const [isReordering, setIsReordering] = useState(false);
  const handleClickUpButton = useCallback(async () => {
    setIsReordering(true);

    await reorderWidgets({
      widgetIndex,
      invitationId: invitation.id,
      direction: "up",
    });

    setIsReordering(false);
  }, [widgetIndex, invitation]);

  const handleClickDownButton = useCallback(async () => {
    setIsReordering(true);

    await reorderWidgets({
      widgetIndex,
      invitationId: invitation.id,
      direction: "down",
    });

    setIsReordering(false);
  }, [widgetIndex, invitation]);

  const canMoveUp = widgetIndex > 0;
  const canMoveDown = widgetIndex < invitation.widgets.length - 1;

  return (
    <div className="flex items-center gap-1">
      {canMoveUp && (
        <button
          onClick={handleClickUpButton}
          disabled={isReordering}
          className="flex-center h-8 w-8 border border-slate-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUpIcon className="w-4 h-4" />
        </button>
      )}
      {canMoveDown && (
        <button
          onClick={handleClickDownButton}
          disabled={isReordering}
          className="flex-center h-8 w-8 border border-slate-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowDownIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default WidgetReorderer;
