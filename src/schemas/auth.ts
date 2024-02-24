import { z } from "zod";

export const TokenPayloadSchema = z.object({
  id: z.string(),
  iat: z.number(),
});
