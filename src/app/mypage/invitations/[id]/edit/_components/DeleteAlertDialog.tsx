"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { removeWidget } from "../_actions/invitationWidget";
import { useInvitationContext } from "@/app/_contexts/InvitationContext";

type Props = {
  widgetId: string;
};

const DeleteAlertDialog = ({ widgetId }: Props) => {
  const [open, setOpen] = useState(false);
  const { invitation } = useInvitationContext();

  const handleDelete = useCallback(async () => {
    await removeWidget({ invitationId: invitation.id, widgetId });
    setOpen(false);
  }, [invitation.id, widgetId]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex py-2 px-3 text-xs font-bold bg-red-100 rounded-md hover:bg-red-200">
          <TrashIcon className="w-4 h-4 text-red-700" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이 위젯을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 위젯은 다시 복구할 수 없어요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
