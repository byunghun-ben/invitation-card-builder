"use client";

import logger from "@/utils/logger";
import {
  TemplateFormValues,
  useTemplateFormContext,
} from "../_hooks/TemplateFormContext";
import { createInvitationByMongoDB, createTemplateMetadata } from "../_actions";
import { redirect, useRouter } from "next/navigation";

const SubmitButton = () => {
  const router = useRouter();

  const {
    form: { handleSubmit },
  } = useTemplateFormContext();

  const onValid = async (props: TemplateFormValues) => {
    logger.log("청첩장 만들기", props);

    // TODO: 에러 핸들링
    // const { invitationId } = await createTemplateMetadata(props);
    try {
      const insertedId = await createInvitationByMongoDB(props);
      router.replace(`/mypage/invitations/${insertedId}/edit`);
    } catch (error) {
      logger.error("청첩장 만들기 실패", error);
    }

    // router.replace(`/mypage/invitations/${invitationId}/edit`);
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-end p-4 lg:p-8">
      <button
        className="flex-center py-2 px-4 rounded-lg bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 text-white text-sm font-bold"
        type="button"
        onClick={handleSubmit(onValid)}
      >
        <span className="flex text-white">청첩장 만들기</span>
      </button>
    </div>
  );
};

export default SubmitButton;
