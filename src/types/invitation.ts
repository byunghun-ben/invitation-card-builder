import {
  CommentSchema,
  InstaCoverWidgetSchema,
  InstaGreetingWidgetSchema,
  InstaMapWidgetSchema,
  InstaPostWidgetSchema,
  InstaScheduleWidgetSchema,
  invitationSchema,
  LikeSchema,
  WidgetSchema,
} from "@/schemas/invitation";
import { z } from "zod";

export type InvitationType = z.infer<typeof invitationSchema>;
export type WidgetType = z.infer<typeof WidgetSchema>;
export type InstaPostWidgetType = z.infer<typeof InstaPostWidgetSchema>;
export type InstaMapWidgetType = z.infer<typeof InstaMapWidgetSchema>;
export type InstaCoverWidgetType = z.infer<typeof InstaCoverWidgetSchema>;
export type InstaGreetingWidgetType = z.infer<typeof InstaGreetingWidgetSchema>;
export type InstaScheduleWidgetType = z.infer<typeof InstaScheduleWidgetSchema>;
export type LikeType = z.infer<typeof LikeSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
