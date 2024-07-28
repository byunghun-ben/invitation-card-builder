import {
  InstaCoverWidgetSchema,
  InstaMapWidgetSchema,
  InstaPostWidgetSchema,
  invitationSchema,
  WidgetSchema,
} from "@/schemas/invitation";
import { z } from "zod";

export type InvitationType = z.infer<typeof invitationSchema>;
export type WidgetType = z.infer<typeof WidgetSchema>;
export type InstaPostWidgetType = z.infer<typeof InstaPostWidgetSchema>;
export type InstaMapWidgetType = z.infer<typeof InstaMapWidgetSchema>;
export type InstaCoverWidgetType = z.infer<typeof InstaCoverWidgetSchema>;
